// Função utilitária para atualizar estoque no Shopify
export async function updateStockInShopify(cart: any, orderInfo: any) {
  try {
    // Verificar se temos o token do Admin API
    const shopifyAdminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'yadwwn-2b.myshopify.com';

    if (!shopifyAdminToken) {
      console.warn('⚠️ SHOPIFY_ADMIN_API_TOKEN não configurado. Pulando atualização de estoque.');
      return {
        success: false,
        message: 'Estoque não atualizado (token não configurado)',
        warning: true
      };
    }

    if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
      console.warn('⚠️ Carrinho vazio ou sem itens. Pulando atualização de estoque.');
      return {
        success: false,
        message: 'Carrinho vazio',
        warning: true
      };
    }

    console.log(`📦 Iniciando atualização de estoque para ${cart.lineItems.length} item(ns)...`);

    // Para cada item no carrinho, atualizar o estoque no Shopify
    const updates = cart.lineItems.map(async (item: any) => {
      try {
        console.log(`\n🔄 Processando item: ${item.title}`);
        console.log(`   Variant recebido:`, JSON.stringify(item.variant, null, 2));

        // Extrair o variant ID do Shopify
        // O formato do ID pode ser "gid://shopify/ProductVariant/123456789" ou apenas o número
        let variantId = item.variant?.id || item.variant?.admin_graphql_api_id;
        
        if (!variantId) {
          console.error(`❌ Variant ID não encontrado para item: ${item.title}`);
          console.error(`   Item completo:`, JSON.stringify(item, null, 2));
          return { success: false, item: item.title, error: 'Variant ID não encontrado' };
        }

        console.log(`   Variant ID original: ${variantId}`);

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
          console.error(`❌ Não foi possível extrair o ID numérico do variant: ${variantId}`);
          return { success: false, item: item.title, error: 'ID numérico não encontrado' };
        }

        console.log(`   Variant ID numérico: ${numericId}`);
        console.log(`   Quantidade a deduzir: ${item.quantity}`);

        // Buscar o inventário atual do variant
        const inventoryUrl = `https://${shopifyDomain}/admin/api/2024-10/variants/${numericId}.json`;
        console.log(`   Buscando inventário: ${inventoryUrl}`);

        const inventoryResponse = await fetch(inventoryUrl, {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': shopifyAdminToken,
            'Content-Type': 'application/json',
          },
        });

        if (!inventoryResponse.ok) {
          const errorText = await inventoryResponse.text();
          console.error(`❌ Erro ao buscar variant: ${inventoryResponse.status} ${inventoryResponse.statusText}`);
          console.error(`   Resposta: ${errorText}`);
          throw new Error(`Erro ao buscar variant: ${inventoryResponse.statusText}`);
        }

        const variantData = await inventoryResponse.json();
        const currentInventory = variantData.variant?.inventory_quantity || 0;
        const newInventory = Math.max(0, currentInventory - item.quantity);

        console.log(`   Estoque atual: ${currentInventory}`);
        console.log(`   Novo estoque: ${newInventory}`);

        // Atualizar o estoque
        const updateUrl = `https://${shopifyDomain}/admin/api/2024-10/variants/${numericId}.json`;
        console.log(`   Atualizando estoque: ${updateUrl}`);

        const updateResponse = await fetch(updateUrl, {
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
        });

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error(`❌ Erro ao atualizar estoque: ${updateResponse.status} ${updateResponse.statusText}`);
          console.error(`   Resposta: ${errorText}`);
          throw new Error(`Erro ao atualizar estoque: ${errorText}`);
        }

        const updatedData = await updateResponse.json();
        console.log(`✅ Estoque atualizado com sucesso para ${item.title}: ${currentInventory} -> ${newInventory}`);
        return { success: true, item: item.title, oldInventory: currentInventory, newInventory };

      } catch (error: any) {
        console.error(`❌ Erro ao atualizar estoque para ${item.title}:`, error);
        return { success: false, item: item.title, error: error.message };
      }
    });

    const results = await Promise.all(updates);

    // Verificar se houve algum erro
    const failures = results.filter(r => r && !r.success);
    const successes = results.filter(r => r && r.success);

    if (failures.length > 0) {
      console.warn(`⚠️ Alguns itens não tiveram o estoque atualizado: ${failures.length} de ${results.length}`);
      failures.forEach(f => console.warn(`   - ${f.item}: ${f.error}`));
    }

    if (successes.length > 0) {
      console.log(`✅ ${successes.length} item(ns) atualizado(s) com sucesso`);
    }

    return {
      success: failures.length === 0,
      message: failures.length === 0 ? 'Estoque atualizado com sucesso' : 'Alguns itens não foram atualizados',
      results: results.filter(r => r !== null),
      failures: failures.length,
      successes: successes.length
    };

  } catch (error: any) {
    console.error('❌ Erro ao atualizar estoque no Shopify:', error);
    return {
      success: false,
      error: error.message || 'Erro ao atualizar estoque no Shopify'
    };
  }
}

