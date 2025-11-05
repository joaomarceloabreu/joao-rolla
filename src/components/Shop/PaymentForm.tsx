'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Box, Typography, Alert } from '@mui/material';
import styled from 'styled-components';

// ⚠️ TEMPORÁRIO: Chave hardcoded para desenvolvimento
// TODO: Substituir por variável de ambiente em produção
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SPuE5JrsKPwNJcnSiustDmfavw2zGhGQJ240yayPlmcH1feGmZMxY7b4taahw57wJnlBJFwE0MMlIZZXD7G92Tk004swGbD9n';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeCardElement = styled.div`
  .StripeElement {
    padding: 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background: #1c1b18;
    color: white;
    
    &:focus {
      border-color: #E55722;
      outline: none;
    }
    
    &::placeholder {
      color: #8B9456;
    }
  }
  
  .StripeElement--invalid {
    border-color: #E55722;
  }
  
  .StripeElement--focus {
    border-color: #E55722;
  }
`;

const CardElementContainer = styled(Box)`
  padding: 16px;
  background: #1c1b18;
  border-radius: 8px;
  border: 1px solid #555;
  margin-top: 16px;
`;

interface PaymentFormProps {
  onPaymentMethodCreated: (paymentMethodId: string) => void;
  onError: (error: string) => void;
  amount: number;
  onValidate: () => Promise<boolean>;
}

function PaymentFormInner({ onPaymentMethodCreated, onError, amount, onValidate }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on('change', (event) => {
          if (event.error) {
            setError(event.error.message);
            onError(event.error.message);
          } else {
            setError(null);
          }
        });
      }
    }
  }, [stripe, elements, onError]);

  // Expor função para criar payment method
  React.useEffect(() => {
    // Criar uma referência para a função de validação
    const validatePayment = async () => {
      if (!stripe || !elements) {
        return false;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Elemento de cartão não encontrado');
        return false;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (pmError) {
          setError(pmError.message || 'Erro ao processar cartão');
          onError(pmError.message || 'Erro ao processar cartão');
          setIsProcessing(false);
          return false;
        }

        if (paymentMethod) {
          onPaymentMethodCreated(paymentMethod.id);
          setIsProcessing(false);
          return true;
        }
      } catch (err: any) {
        const errorMessage = err.message || 'Erro inesperado ao processar pagamento';
        setError(errorMessage);
        onError(errorMessage);
        setIsProcessing(false);
        return false;
      }

      setIsProcessing(false);
      return false;
    };

    // Expor função globalmente para o CheckoutModal usar
    (window as any).__validatePayment = validatePayment;
  }, [stripe, elements, onPaymentMethodCreated, onError]);

  const cardElementOptions = {
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
    hidePostalCode: false,
  };

  return (
    <Box>
      <CardElementContainer>
        <Typography variant="subtitle2" sx={{ color: '#8B9456', mb: 2 }}>
          Informações do Cartão
        </Typography>
        <StripeCardElement>
          <CardElement options={cardElementOptions} />
        </StripeCardElement>
      </CardElementContainer>

      {error && (
        <Alert severity="error" sx={{ mt: 2, bgcolor: '#3d1f1f', color: 'white' }}>
          {error}
        </Alert>
      )}

      {isProcessing && (
        <Alert severity="info" sx={{ mt: 2, bgcolor: '#1a3d1a', color: 'white' }}>
          Processando cartão...
        </Alert>
      )}

      <Typography variant="caption" sx={{ color: '#8B9456', mt: 2, display: 'block' }}>
        💳 Use cartão de teste: 4242 4242 4242 4242 | Data: 12/34 | CVC: 123
      </Typography>
    </Box>
  );
}

interface PaymentFormWrapperProps {
  onPaymentMethodCreated: (paymentMethodId: string) => void;
  onError: (error: string) => void;
  amount: number;
  onValidate?: () => Promise<boolean>;
}

export default function PaymentForm({ onPaymentMethodCreated, onError, amount, onValidate }: PaymentFormWrapperProps) {
  const options: StripeElementsOptions = {
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#E55722',
        colorBackground: '#1c1b18',
        colorText: '#ffffff',
        colorDanger: '#E55722',
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormInner 
        onPaymentMethodCreated={onPaymentMethodCreated}
        onError={onError}
        amount={amount}
        onValidate={onValidate || (async () => true)}
      />
    </Elements>
  );
}
