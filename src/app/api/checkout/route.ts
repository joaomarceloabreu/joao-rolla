import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateStockInShopify } from '@/utils/updateStock';


// Inicializar Stripe
const stripe = new Stripe('', {
  apiVersion: '2025-02-24.acacia',
});

// Esta função processa o checkout e atualiza o estoque no Shopify
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      cart, 
      customerInfo,
      paymentMethodId,  // ID do método de pagamento do Stripe (para cartão)
      paymentMethod  // 'card' ou 'pix'
    } = body;

    if (!cart || !customerInfo) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se Stripe está configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('STRIPE_SECRET_KEY não configurado. Usando modo de simulação.');
      // Modo de simulação para desenvolvimento
      const simulatedPaymentId = `sim_${Date.now()}`;
      
      // Atualizar estoque no Shopify
      const stockUpdateResult = await updateStockInShopify(cart, {
        customerInfo,
        paymentId: simulatedPaymentId,
        orderNumber: `ORD-${Date.now()}`,
      });

      if (!stockUpdateResult.success && !stockUpdateResult.warning) {
        console.error('⚠️ Erro ao atualizar estoque:', stockUpdateResult);
      }

      return NextResponse.json({
        success: true,
        orderNumber: `ORD-${Date.now()}`,
        message: 'Compra realizada com sucesso! (Modo simulação)',
        paymentId: simulatedPaymentId
      });
    }

    // Calcular valor em centavos (Stripe usa centavos)
    const amountInCents = Math.round(parseFloat(cart.totalPrice.amount) * 100);
    
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: 'Valor do pedido inválido' },
        { status: 400 }
      );
    }

    let paymentIntent;
    let paymentId: string;

    // Se for PIX, criar Payment Intent com payment_method_types incluindo 'pix'
    if (paymentMethod === 'pix') {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        payment_method_types: ['pix'],
        metadata: {
          cartId: cart.id,
          customerEmail: customerInfo?.email || '',
          customerName: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
        },
        description: `Pedido - ${cart.lineItems.map((item: any) => item.title).join(', ')}`,
      });

      paymentId = paymentIntent.id;

      // Para PIX, confirmar imediatamente para gerar o QR Code
      try {
        const confirmedIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
        
        // Extrair QR Code se disponível
        const pixQrCode = (confirmedIntent as any).next_action?.pix_display_qr_code?.data || null;

        if (pixQrCode) {
          // Para PIX, NÃO atualizar estoque ainda - só após confirmação do pagamento
          // O estoque será atualizado via webhook quando o pagamento for confirmado
          return NextResponse.json({
            success: true,
            paymentIntentId: confirmedIntent.id,
            qrCode: pixQrCode,
            paymentMethod: 'pix',
            message: 'QR Code PIX gerado com sucesso! Escaneie para pagar.'
          });
        }

        // Se não tiver QR Code ainda, retornar para frontend buscar
        return NextResponse.json({
          success: true,
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          paymentMethod: 'pix',
          requiresConfirmation: true,
          message: 'PIX criado. Aguarde o QR Code ser gerado.'
        });
      } catch (confirmError: any) {
        console.error('Erro ao confirmar PIX:', confirmError);
        // Retornar mesmo assim para o frontend tentar confirmar
        return NextResponse.json({
          success: true,
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          paymentMethod: 'pix',
          requiresConfirmation: true,
          message: 'PIX criado. Confirmando pagamento...'
        });
      }
    }

    // Se for cartão
    if (paymentMethodId) {
      // Criar Payment Intent com o método de pagamento
      paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success`,
        metadata: {
          cartId: cart.id,
          customerEmail: customerInfo?.email || '',
          customerName: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
        },
        description: `Pedido - ${cart.lineItems.map((item: any) => item.title).join(', ')}`,
      });

      paymentId = paymentIntent.id;

      // Verificar se o pagamento foi bem-sucedido
      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { 
            error: `Pagamento não foi autorizado. Status: ${paymentIntent.status}`,
            paymentStatus: paymentIntent.status
          },
          { status: 402 }
        );
      }
    } else {
      // Criar Payment Intent sem confirmar (para usar no frontend)
      paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        metadata: {
          cartId: cart.id,
          customerEmail: customerInfo?.email || '',
          customerName: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
        },
        description: `Pedido - ${cart.lineItems.map((item: any) => item.title).join(', ')}`,
      });

      paymentId = paymentIntent.id;

      // Retornar client_secret para o frontend confirmar o pagamento
      return NextResponse.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        requiresConfirmation: true,
        message: 'Use o client_secret para confirmar o pagamento no frontend'
      });
    }

    // Atualizar estoque no Shopify
    const orderNumber = `ORD-${Date.now()}`;
    console.log(`\n📦 Iniciando atualização de estoque após checkout...`);
    console.log(`   Order Number: ${orderNumber}`);
    console.log(`   Payment ID: ${paymentId}`);
    console.log(`   Itens no carrinho: ${cart.lineItems?.length || 0}`);

    const stockUpdateResult = await updateStockInShopify(cart, {
      customerInfo,
      paymentId: paymentId,
      orderNumber: orderNumber,
    });

    if (!stockUpdateResult.success && !stockUpdateResult.warning) {
      console.error('❌ Erro ao atualizar estoque:', stockUpdateResult);
      // Mesmo com erro no estoque, o pagamento já foi processado
      // Você pode querer tratar isso de forma diferente (rollback, notificação, etc)
      // Por enquanto, retornamos sucesso mas avisamos sobre o estoque
      return NextResponse.json({
        success: true,
        orderNumber: orderNumber,
        paymentId: paymentId,
        message: 'Compra realizada com sucesso!',
        warning: 'Estoque pode não ter sido atualizado. Verifique manualmente.',
        stockUpdate: stockUpdateResult
      });
    }

    if (stockUpdateResult.warning) {
      console.warn('⚠️ Aviso na atualização de estoque:', stockUpdateResult.message);
      return NextResponse.json({
        success: true,
        orderNumber: orderNumber,
        paymentId: paymentId,
        message: 'Compra realizada com sucesso!',
        warning: stockUpdateResult.message,
        stockUpdate: stockUpdateResult
      });
    }

    console.log('✅ Estoque atualizado com sucesso!');
    return NextResponse.json({
      success: true,
      orderNumber: orderNumber,
      paymentId: paymentId,
      message: 'Compra realizada com sucesso!',
      stockUpdate: stockUpdateResult
    });

  } catch (error: any) {
    console.error('Erro ao processar checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar checkout' },
      { status: 500 }
    );
  }
}

