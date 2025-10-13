import Client from 'shopify-buy';

// Configuração do cliente Shopify Storefront API
const client = Client.buildClient({
  domain: 'yadwwn-2b.myshopify.com',
  storefrontAccessToken: '74832431507eaa81a6349850b4ec6649',
  apiVersion: '2024-10' // Versão específica da API
});

// Wrapper para tratar erros de forma mais robusta
const shopifyClient = {
  product: {
    fetchAll: async (limit: number = 20) => {
      try {
        console.log('Buscando produtos do Shopify...');
        const products = await client.product.fetchAll(limit);
        console.log('Produtos encontrados:', products.length);
        return products;
      } catch (error: any) {
        console.error('Erro detalhado ao buscar produtos:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          response: error.response
        });
        
        // Tratar diferentes tipos de erro
        if (error.message?.includes('UNAUTHORIZED') || 
            error.message?.includes('ACCESS_DENIED') || 
            error.message?.includes('access scope') ||
            error.status === 401) {
          console.warn('Token inválido ou sem permissões adequadas');
          return [];
        }
        
        // Para outros erros, retorna array vazio para não quebrar a UI
        console.warn('Erro inesperado, retornando lista vazia');
        return [];
      }
    },
    
    fetchByHandle: async (handle: string) => {
      try {
        console.log('Buscando produto por handle:', handle);
        const product = await client.product.fetchByHandle(handle);
        console.log('Produto encontrado:', product?.title || 'Nenhum');
        return product;
      } catch (error: any) {
        console.error('Erro ao buscar produto por handle:', {
          handle,
          message: error.message,
          status: error.status
        });
        
        if (error.message?.includes('UNAUTHORIZED') || 
            error.message?.includes('ACCESS_DENIED') || 
            error.message?.includes('access scope') ||
            error.status === 401) {
          console.warn('Token inválido ou sem permissões adequadas');
          return null;
        }
        
        return null;
      }
    }
  },
  collection: {
    fetchAllWithProducts: async () => {
      try {
        console.log('Buscando coleções do Shopify...');
        const collections = await client.collection.fetchAllWithProducts();
        console.log('Coleções encontradas:', collections.length);
        return collections;
      } catch (error: any) {
        console.error('Erro detalhado ao buscar coleções:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText
        });
        
        if (error.message?.includes('UNAUTHORIZED') || 
            error.message?.includes('ACCESS_DENIED') || 
            error.message?.includes('access scope') ||
            error.status === 401) {
          console.warn('Token inválido ou sem permissões adequadas para coleções');
          return [];
        }
        
        return [];
      }
    }
  },
  checkout: {
    create: async () => {
      try {
        console.log('Criando checkout no Shopify...');
        const checkout = await client.checkout.create();
        console.log('Checkout criado:', checkout.id);
        return checkout;
      } catch (error: any) {
        console.error('Erro detalhado ao criar checkout:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText
        });
        
        if (error.message?.includes('UNAUTHORIZED') || 
            error.message?.includes('ACCESS_DENIED') || 
            error.message?.includes('access scope') ||
            error.status === 401) {
          console.warn('Token inválido ou sem permissões para checkout');
          return null;
        }
        
        return null;
      }
    },
    fetch: async (id: string) => {
      try {
        return await client.checkout.fetch(id);
      } catch (error: any) {
        console.error('Erro ao buscar checkout:', error);
        if (error.message?.includes('ACCESS_DENIED') || error.message?.includes('access scope') || error.message?.includes('UNAUTHORIZED')) {
          console.warn('Acesso negado para checkout - token inválido ou sem permissões');
          return null;
        }
        throw error;
      }
    },
    addLineItems: async (checkoutId: string, lineItems: any[]) => {
      try {
        return await client.checkout.addLineItems(checkoutId, lineItems);
      } catch (error: any) {
        console.error('Erro ao adicionar itens ao checkout:', error);
        if (error.message?.includes('ACCESS_DENIED') || error.message?.includes('access scope') || error.message?.includes('UNAUTHORIZED')) {
          console.warn('Acesso negado para adicionar itens - token inválido ou sem permissões');
          return null;
        }
        throw error;
      }
    },
    removeLineItems: async (checkoutId: string, lineItemIds: string[]) => {
      try {
        return await client.checkout.removeLineItems(checkoutId, lineItemIds);
      } catch (error: any) {
        console.error('Erro ao remover itens do checkout:', error);
        if (error.message?.includes('ACCESS_DENIED') || error.message?.includes('access scope') || error.message?.includes('UNAUTHORIZED')) {
          console.warn('Acesso negado para remover itens - token inválido ou sem permissões');
          return null;
        }
        throw error;
      }
    },
    updateLineItems: async (checkoutId: string, lineItems: any[]) => {
      try {
        return await client.checkout.updateLineItems(checkoutId, lineItems);
      } catch (error: any) {
        console.error('Erro ao atualizar itens do checkout:', error);
        if (error.message?.includes('ACCESS_DENIED') || error.message?.includes('access scope') || error.message?.includes('UNAUTHORIZED')) {
          console.warn('Acesso negado para atualizar itens - token inválido ou sem permissões');
          return null;
        }
        throw error;
      }
    }
  }
};

export default shopifyClient;

// Tipos para produtos do Shopify
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    src: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    compareAtPrice?: {
      amount: string;
      currencyCode: string;
    };
    available: boolean;
    image?: {
      src: string;
      altText?: string;
    };
  }>;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  tags: string[];
  productType: string;
  vendor: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    src: string;
    altText?: string;
  };
  products: ShopifyProduct[];
}

export interface ShopifyCart {
  id: string;
  lineItems: Array<{
    id: string;
    title: string;
    variant: any;
    quantity: number;
  }>;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  webUrl: string;
}
