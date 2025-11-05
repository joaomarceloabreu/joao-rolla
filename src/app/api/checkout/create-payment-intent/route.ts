import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

// Esta rota cria um Payment Intent do Stripe para o frontend usar
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart } = body;

    if (!cart) {
      return NextResponse.json(
        { error: 'Carrinho não fornecido' },
        { status: 400 }
      );
    }

    // Verificar se Stripe está configurado
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe não está configurado. Configure STRIPE_SECRET_KEY no .env' },
        { status: 500 }
      );
    }

    // Calcular valor em centavos (Stripe usa centavos)
    const amountInCents = Math.round(parseFloat(cart.totalPrice.amount) * 100);
    
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: 'Valor do pedido inválido' },
        { status: 400 }
      );
    }

    // Criar Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'brl',
      metadata: {
        cartId: cart.id,
      },
      description: `Pedido - ${cart.lineItems.map((item: any) => item.title).join(', ')}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error('Erro ao criar Payment Intent:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao criar Payment Intent' },
      { status: 500 }
    );
  }
}

