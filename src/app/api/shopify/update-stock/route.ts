import { NextRequest, NextResponse } from 'next/server';

// Esta função atualiza o estoque no Shopify após uma compra confirmada
// IMPORTANTE: Você precisará de um Access Token do Shopify Admin API
// para poder atualizar o estoque. O Storefront API não tem permissão para isso.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cart, orderInfo } = body;

    if (!cart || !orderInfo) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se temos o token do Admin API
    const shopifyAdminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'yadwwn-2b.myshopify.com';

    if (!shopifyAdminToken) {
      console.warn('SHOPIFY_ADMIN_API_TOKEN não configurado. Pulando atualização de estoque.');
      // Retornar sucesso mesmo sem atualizar, pois o pagamento já foi processado
      return NextResponse.json({
        success: true,
        message: 'Estoque não atualizado (token não configurado)',
        warning: true
      });
    }

    // Para cada item no carrinho, atualizar o estoque no Shopify
    const updates = cart.lineItems.map(async (item: any) => {
      try {
        // Extrair o variant ID do Shopify
        // O formato do ID pode ser "gid://shopify/ProductVariant/123456789" ou apenas o número
        let variantId = item.variant?.id || item.variant?.admin_graphql_api_id;
        
        if (!variantId) {
          console.warn('Variant ID não encontrado para item:', item.title);
          return null;
        }

        // Extrair o ID numérico do GID se necessário
        // O formato pode ser "gid://shopify/ProductVariant/123456789" ou apenas "123456789"
        let numericId: string;
        if (variantId.includes('gid://')) {
          numericId = variantId.split('/').pop() || variantId;
        } else {
          // Se já é um número, usar diretamente
          numericId = variantId.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        }

        if (!numericId) {
          console.warn('Não foi possível extrair o ID numérico do variant:', variantId);
          return null;
        }

        // Buscar o inventário atual do variant
        const inventoryResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2024-10/variants/${numericId}.json`,
          {
            method: 'GET',
            headers: {
              'X-Shopify-Access-Token': shopifyAdminToken,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!inventoryResponse.ok) {
          throw new Error(`Erro ao buscar variant: ${inventoryResponse.statusText}`);
        }

        const variantData = await inventoryResponse.json();
        const currentInventory = variantData.variant?.inventory_quantity || 0;
        const newInventory = Math.max(0, currentInventory - item.quantity);

        // Atualizar o estoque
        const updateResponse = await fetch(
          `https://${shopifyDomain}/admin/api/2024-10/variants/${numericId}.json`,
          {
            method: 'PUT',
            headers: {
              'X-Shopify-Access-Token': shopifyAdminToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              variant: {
                id: numericId,
                inventory_quantity: newInventory,
              },
            }),
          }
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          throw new Error(`Erro ao atualizar estoque: ${errorText}`);
        }

        console.log(`Estoque atualizado para ${item.title}: ${currentInventory} -> ${newInventory}`);
        return { success: true, item: item.title, newInventory };

      } catch (error: any) {
        console.error(`Erro ao atualizar estoque para ${item.title}:`, error);
        return { success: false, item: item.title, error: error.message };
      }
    });

    const results = await Promise.all(updates);

    // Verificar se houve algum erro
    const failures = results.filter(r => r && !r.success);
    if (failures.length > 0) {
      console.warn('Alguns itens não tiveram o estoque atualizado:', failures);
    }

    return NextResponse.json({
      success: true,
      message: 'Estoque atualizado com sucesso',
      results: results.filter(r => r !== null)
    });

  } catch (error: any) {
    console.error('Erro ao atualizar estoque no Shopify:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao atualizar estoque no Shopify',
        // Retornar 200 para não quebrar o fluxo mesmo se houver erro
        // O pagamento já foi processado, então registramos o erro mas não falhamos
      },
      { status: 200 }
    );
  }
}

