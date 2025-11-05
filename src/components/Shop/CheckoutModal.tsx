'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { Close, ArrowBack } from '@mui/icons-material';
import styled from 'styled-components';
import { ShopifyCart } from '@/utils/shopifyClient';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// ⚠️ TEMPORÁRIO: Chave hardcoded para desenvolvimento
// TODO: Substituir por variável de ambiente em produção
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SPuE5JrsKPwNJcnSiustDmfavw2zGhGQJ240yayPlmcH1feGmZMxY7b4taahw57wJnlBJFwE0MMlIZZXD7G92Tk004swGbD9n';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: #1c1b18 !important;
    color: white !important;
    border: 1px solid #5a6b3a !important;
  }
`;

const CheckoutButton = styled(Button)`
  background: linear-gradient(135deg, #E55722 0%, #E55A2B 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  margin-top: 20px !important;
  
  &:hover {
    background: linear-gradient(135deg, #B91C3C 0%, #8B9456 100%) !important;
  }
  
  &:disabled {
    background: #333 !important;
    color: #666 !important;
  }
`;

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  cart: ShopifyCart | null;
  onCheckoutComplete: (customerInfo: CheckoutData) => Promise<void>;
}

export interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const steps = ['Pagamento', 'Revisão'];

function CheckoutModalInner({ open, onClose, cart, onCheckoutComplete }: CheckoutModalProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixPaymentIntentId, setPixPaymentIntentId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CheckoutData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'BR'
  });

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | null>(null);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!paymentMethod) {
          setError('Por favor, escolha um método de pagamento');
          return false;
        }
        if (paymentMethod === 'card' && !paymentMethodId) {
          setError('Por favor, preencha os dados do cartão corretamente');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Na etapa de pagamento, criar o payment method antes de avançar
      if (paymentMethod === 'card') {
        if (!stripe || !elements) {
          setError('Stripe não está carregado. Aguarde um momento.');
          return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          setError('Elemento de cartão não encontrado');
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const { error: pmError, paymentMethod: pm } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });

          if (pmError) {
            setError(pmError.message || 'Erro ao processar cartão');
            setLoading(false);
            return;
          }

          if (pm) {
            setPaymentMethodId(pm.id);
            setError(null);
            setActiveStep(prev => prev + 1);
          }
        } catch (err: any) {
          setError(err.message || 'Erro ao processar pagamento');
        } finally {
          setLoading(false);
        }
      } else if (paymentMethod === 'pix') {
        // Para PIX, criar o Payment Intent no backend
        setLoading(true);
        setError(null);

        try {
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cart,
              customerInfo: formData,
              paymentMethod: 'pix',
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao criar pagamento PIX');
          }

          const result = await response.json();
          
          // Se já retornou o QR Code diretamente
          if (result.qrCode) {
            setPixQrCode(result.qrCode);
            setPixPaymentIntentId(result.paymentIntentId);
            setError(null);
            setActiveStep(prev => prev + 1);
          } else if (result.requiresConfirmation && result.clientSecret) {
            // Se precisar confirmar, buscar o QR Code
            const confirmResponse = await fetch('/api/checkout/confirm-pix', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentIntentId: result.paymentIntentId,
                clientSecret: result.clientSecret,
              }),
            });

            if (confirmResponse.ok) {
              const pixData = await confirmResponse.json();
              setPixQrCode(pixData.qrCode || pixData.pixCode);
              setPixPaymentIntentId(result.paymentIntentId);
              setError(null);
              setActiveStep(prev => prev + 1);
            } else {
              throw new Error('Erro ao obter QR Code do PIX');
            }
          } else {
            throw new Error('Não foi possível gerar o QR Code do PIX');
          }
        } catch (err: any) {
          setError(err.message || 'Erro ao processar PIX');
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (validateStep(activeStep)) {
        setError(null);
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    setActiveStep(prev => prev - 1);
  };


  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;
    
    // Se for PIX, não precisa processar checkout aqui - o QR Code já foi gerado
    if (paymentMethod === 'pix' && pixQrCode) {
      // Para PIX, apenas mostrar mensagem de sucesso
      alert('QR Code PIX gerado! Escaneie ou copie o código para pagar. O pedido será confirmado automaticamente após o pagamento.');
      onClose();
      // Reset form
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'BR'
      });
      setPaymentMethodId(null);
      setPixQrCode(null);
      setPixPaymentIntentId(null);
      setPaymentMethod(null);
      setActiveStep(0);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Passar paymentMethodId e método de pagamento (apenas para cartão)
      await onCheckoutComplete({
        ...formData,
        paymentMethodId: paymentMethodId || undefined,
        paymentMethod: paymentMethod || undefined
      } as any);
      // Se chegou aqui, o checkout foi bem-sucedido
      onClose();
      // Reset form
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'BR'
      });
      setPaymentMethodId(null);
      setPixQrCode(null);
      setPixPaymentIntentId(null);
      setPaymentMethod(null);
      setActiveStep(0);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar checkout. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: '#E55722', mb: 3 }}>
              Método de Pagamento
            </Typography>
            {cart && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#8B9456', mb: 3, fontSize: '1.1rem' }}>
                  Valor total: {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: cart.totalPrice.currencyCode === 'USD' ? 'BRL' : cart.totalPrice.currencyCode
                  }).format(parseFloat(cart.totalPrice.amount))}
                </Typography>

                {/* Seleção de método de pagamento */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                    onClick={() => {
                      setPaymentMethod('card');
                      setError(null);
                    }}
                    sx={{
                      py: 2,
                      border: paymentMethod === 'card' ? '2px solid #E55722' : '1px solid #555',
                      bgcolor: paymentMethod === 'card' ? '#E55722' : 'transparent',
                      color: 'white',
                      '&:hover': {
                        bgcolor: paymentMethod === 'card' ? '#d14a1a' : '#333',
                        borderColor: '#E55722'
                      }
                    }}
                  >
                    💳 Cartão de Crédito
                  </Button>
                  <Button
                    fullWidth
                    variant={paymentMethod === 'pix' ? 'contained' : 'outlined'}
                    onClick={() => {
                      setPaymentMethod('pix');
                      setError(null);
                    }}
                    sx={{
                      py: 2,
                      border: paymentMethod === 'pix' ? '2px solid #E55722' : '1px solid #555',
                      bgcolor: paymentMethod === 'pix' ? '#E55722' : 'transparent',
                      color: 'white',
                      '&:hover': {
                        bgcolor: paymentMethod === 'pix' ? '#d14a1a' : '#333',
                        borderColor: '#E55722'
                      }
                    }}
                  >
                    🏦 PIX
                  </Button>
                </Box>

                {/* Formulário de cartão */}
                {paymentMethod === 'card' && (
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#1c1b18', 
                    borderRadius: '8px', 
                    border: '1px solid #555',
                    mb: 2
                  }}>
                    <Typography variant="subtitle2" sx={{ color: '#8B9456', mb: 2 }}>
                      Informações do Cartão
                    </Typography>
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            color: '#ffffff',
                            fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                            fontSmoothing: 'antialiased',
                            fontSize: '16px',
                            '::placeholder': {
                              color: '#8B9456',
                            },
                          },
                          invalid: {
                            color: '#E55722',
                            iconColor: '#E55722',
                          },
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#8B9456', mt: 2, display: 'block' }}>
                      💳 Use cartão de teste: 4242 4242 4242 4242 | Data: 12/34 | CVC: 123
                    </Typography>
                  </Box>
                )}

                {/* Informações sobre PIX */}
                {paymentMethod === 'pix' && (
                  <Alert severity="info" sx={{ bgcolor: '#1a3d1a', color: 'white', mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Pagamento via PIX</strong>
                    </Typography>
                    <Typography variant="caption">
                      Você receberá um QR Code para pagamento. O pagamento é confirmado instantaneamente.
                    </Typography>
                  </Alert>
                )}

                {paymentMethodId && paymentMethod === 'card' && (
                  <Alert severity="success" sx={{ mt: 2, bgcolor: '#1a3d1a', color: 'white' }}>
                    Cartão processado com sucesso! Clique em "Próximo" para continuar.
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ color: '#E55722', mb: 3 }}>
              {paymentMethod === 'pix' && pixQrCode ? 'Pagamento PIX' : 'Revisão do Pedido'}
            </Typography>

            {/* Mostrar QR Code do PIX se disponível */}
            {paymentMethod === 'pix' && pixQrCode && (
              <Box sx={{ mb: 3, p: 3, bgcolor: '#1c1b18', borderRadius: '8px', border: '1px solid #555', textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ color: '#E55722', mb: 2 }}>
                  Escaneie o QR Code com seu app de pagamento
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 2,
                  p: 2,
                  bgcolor: 'white',
                  borderRadius: '8px',
                  maxWidth: '300px',
                  margin: '0 auto'
                }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixQrCode)}`}
                    alt="QR Code PIX"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: '#8B9456', display: 'block', mb: 2 }}>
                  Ou copie o código PIX:
                </Typography>
                <TextField
                  fullWidth
                  value={pixQrCode}
                  InputProps={{ readOnly: true }}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      bgcolor: '#111',
                      '& fieldset': { borderColor: '#555' },
                    },
                  }}
                />
                <Button
                  fullWidth
                  onClick={() => {
                    navigator.clipboard.writeText(pixQrCode);
                    alert('Código PIX copiado!');
                  }}
                  sx={{
                    bgcolor: '#E55722',
                    color: 'white',
                    '&:hover': { bgcolor: '#d14a1a' }
                  }}
                >
                  Copiar Código PIX
                </Button>
                <Alert severity="info" sx={{ mt: 2, bgcolor: '#1a3d1a', color: 'white' }}>
                  Após o pagamento, o pedido será confirmado automaticamente.
                </Alert>
              </Box>
            )}
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#8B9456', mb: 1 }}>
                Método de Pagamento
              </Typography>
              <Typography sx={{ color: 'white', mb: 1 }}>
                {paymentMethod === 'card' ? '💳 Cartão de Crédito' : '🏦 PIX'}
              </Typography>
            </Box>

            {cart && (
              <Box sx={{ mb: 3, pt: 2, borderTop: '1px solid #555' }}>
                <Typography variant="subtitle2" sx={{ color: '#8B9456', mb: 1 }}>
                  Resumo do Pedido
                </Typography>
                {cart.lineItems.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: 'white' }}>
                      {item.title} x{item.quantity}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #555' }}>
                  <Typography variant="h6" sx={{ color: '#E55722', textAlign: 'right' }}>
                    Total: {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: cart.totalPrice.currencyCode === 'USD' ? 'BRL' : cart.totalPrice.currencyCode
                    }).format(parseFloat(cart.totalPrice.amount))}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        background: '#111', 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #555'
      }}>
        <Typography variant="h6">Finalizar Compra</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ background: '#111', color: 'white', pt: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4, '& .MuiStepLabel-root .Mui-completed': { color: '#8B9456' }, '& .MuiStepLabel-root .Mui-active': { color: '#E55722' } }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ '& .MuiStepLabel-label': { color: 'white' } }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2, bgcolor: '#3d1f1f', color: 'white' }}>
            {error}
          </Alert>
        )}

        {renderStepContent()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{ color: '#8B9456' }}
          >
            Voltar
          </Button>
          {activeStep === steps.length - 1 ? (
            <CheckoutButton
              onClick={handleSubmit}
              disabled={loading || (paymentMethod === 'pix' && !pixQrCode)}
              fullWidth={false}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Processando...
                </>
              ) : paymentMethod === 'pix' ? (
                'Fechar'
              ) : (
                'Finalizar Compra'
              )}
            </CheckoutButton>
          ) : (
            <CheckoutButton onClick={handleNext} disabled={loading}>
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Processando...
                </>
              ) : (
                'Próximo'
              )}
            </CheckoutButton>
          )}
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}

export default function CheckoutModal(props: CheckoutModalProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutModalInner {...props} />
    </Elements>
  );
}
