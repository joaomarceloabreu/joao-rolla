import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentIntentId, clientSecret } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment Intent ID não fornecido' },
        { status: 400 }
      );
    }

    // Buscar o Payment Intent
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Se não estiver confirmado, confirmar
    if (paymentIntent.status === 'requires_payment_method' || paymentIntent.status === 'requires_confirmation') {
      paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    }

    // Extrair o QR Code do PIX
    // O QR Code do PIX está em next_action.pix_display_qr_code.data
    const pixQrCode = (paymentIntent as any).next_action?.pix_display_qr_code?.data || null;
    
    // Se não tiver QR Code, tentar buscar de outras formas
    if (!pixQrCode) {
      // Tentar buscar o código PIX
      const pixCode = (paymentIntent as any).next_action?.pix_display_qr_code?.qr_code ||
                      (paymentIntent as any).next_action?.pix_display_qr_code?.hosted_voucher_url ||
                      null;

      if (pixCode) {
        return NextResponse.json({
          success: true,
          paymentIntentId: paymentIntent.id,
          qrCode: pixCode,
          pixCode: pixCode,
          status: paymentIntent.status,
          message: 'Código PIX gerado com sucesso'
        });
      }

      // Se ainda não tiver, retornar o client_secret como fallback
      return NextResponse.json({
        success: true,
        paymentIntentId: paymentIntent.id,
        qrCode: clientSecret,
        pixCode: clientSecret,
        status: paymentIntent.status,
        message: 'Use o client_secret para confirmar o pagamento'
      });
    }

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      qrCode: pixQrCode,
      status: paymentIntent.status,
      message: 'QR Code gerado com sucesso'
    });

  } catch (error: any) {
    console.error('Erro ao confirmar PIX:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao confirmar pagamento PIX' },
      { status: 500 }
    );
  }
}

