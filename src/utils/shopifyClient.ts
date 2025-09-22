import Client from 'shopify-buy';

// Configuração do cliente Shopify
const client = Client.buildClient({
  domain: 'yadwwn-2b.myshopify.com',
  storefrontAccessToken: '74832431507eaa81a6349850b4ec6649',
});

export default client;

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
