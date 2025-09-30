'use client';

import { useState, useEffect, useCallback } from 'react';
import client, { ShopifyProduct, ShopifyCollection, ShopifyCart } from '@/utils/shopifyClient';

// Hook para buscar produtos
export function useShopifyProducts(limit: number = 20) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(limit > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (limit === 0) {
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        const shopifyProducts = await client.product.fetchAll(limit);
        
        // Converter para o formato esperado
        const formattedProducts: ShopifyProduct[] = shopifyProducts.map((product: any) => {
          console.log('Produto do Shopify:', product); // Debug
          
          // Extrair imagens do formato GraphQL
          const images = product.images?.map((img: any) => ({
            src: img.src,
            altText: img.altText || '',
          })) || [];

          // Extrair variantes do formato GraphQL
          const variants = product.variants?.map((variant: any) => ({
            id: variant.id,
            title: variant.title,
            price: {
              amount: variant.price?.amount || variant.price || '0',
              currencyCode: variant.price?.currencyCode || 'BRL',
            },
            compareAtPrice: variant.compareAtPrice ? {
              amount: variant.compareAtPrice.amount || variant.compareAtPrice,
              currencyCode: variant.compareAtPrice.currencyCode || 'BRL',
            } : undefined,
            available: variant.available || false,
            image: variant.image ? {
              src: variant.image.src,
              altText: variant.image.altText || '',
            } : undefined,
          })) || [];

          // Extrair opções
          const options = product.options?.map((option: any) => ({
            id: option.id,
            name: option.name,
            values: option.values || [],
          })) || [];

          // Obter o primeiro preço para o priceRange
          const firstVariantPrice = variants[0]?.price?.amount || '0';

          return {
            id: product.id,
            title: product.title,
            description: product.description || '',
            handle: product.handle,
            images,
            variants,
            options,
            tags: product.tags || [],
            productType: product.productType || '',
            vendor: product.vendor || '',
            availableForSale: product.availableForSale || false,
            priceRange: {
              minVariantPrice: {
                amount: firstVariantPrice,
                currencyCode: 'BRL',
              },
              maxVariantPrice: {
                amount: firstVariantPrice,
                currencyCode: 'BRL',
              },
            },
          };
        });

        setProducts(formattedProducts);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        console.error('Detalhes do erro:', JSON.stringify(err, null, 2));
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}

// Hook para buscar produto por handle
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) return;

      try {
        setLoading(true);
        setError(null);
        
        const shopifyProduct = await client.product.fetchByHandle(handle);
        
        if (shopifyProduct) {
          const formattedProduct: ShopifyProduct = {
            id: shopifyProduct.id,
            title: shopifyProduct.title,
            description: shopifyProduct.description,
            handle: shopifyProduct.handle,
            images: shopifyProduct.images.map((img: any) => ({
              src: img.src,
              altText: img.altText || '',
            })),
            variants: shopifyProduct.variants.map((variant: any) => ({
              id: variant.id,
              title: variant.title,
              price: {
                amount: variant.price.amount,
                currencyCode: variant.price.currencyCode,
              },
              compareAtPrice: variant.compareAtPrice ? {
                amount: variant.compareAtPrice.amount,
                currencyCode: variant.compareAtPrice.currencyCode,
              } : undefined,
              available: variant.available,
              image: variant.image ? {
                src: variant.image.src,
                altText: variant.image.altText || '',
              } : undefined,
            })),
            options: shopifyProduct.options.map((option: any) => ({
              id: option.id,
              name: option.name,
              values: option.values.map((value: any) => value.value),
            })),
            tags: shopifyProduct.tags,
            productType: shopifyProduct.productType,
            vendor: shopifyProduct.vendor,
            availableForSale: shopifyProduct.availableForSale,
            priceRange: {
              minVariantPrice: {
                amount: shopifyProduct.priceRange.minVariantPrice.amount,
                currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
              },
              maxVariantPrice: {
                amount: shopifyProduct.priceRange.maxVariantPrice.amount,
                currencyCode: shopifyProduct.priceRange.maxVariantPrice.currencyCode,
              },
            },
          };

          setProduct(formattedProduct);
        }
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

// Hook para gerenciar carrinho
export function useShopifyCart() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar carrinho
  const createCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const shopifyCart = await client.checkout.create();
      
      const formattedCart: ShopifyCart = {
        id: shopifyCart.id,
        lineItems: shopifyCart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: item.variant,
          quantity: item.quantity,
        })),
        subtotalPrice: {
          amount: shopifyCart.subtotalPrice.amount,
          currencyCode: shopifyCart.subtotalPrice.currencyCode,
        },
        totalPrice: {
          amount: shopifyCart.totalPrice.amount,
          currencyCode: shopifyCart.totalPrice.currencyCode,
        },
        webUrl: shopifyCart.webUrl,
      };

      setCart(formattedCart);
      return formattedCart;
    } catch (err) {
      console.error('Erro ao criar carrinho:', err);
      setError('Erro ao criar carrinho');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar item ao carrinho
  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      let currentCart = cart;
      
      // Se não há carrinho, criar um
      if (!currentCart) {
        currentCart = await createCart();
        if (!currentCart) return;
      }

      const lineItemsToAdd = [
        {
          variantId,
          quantity,
        }
      ];

      const updatedCart = await client.checkout.addLineItems(currentCart.id, lineItemsToAdd);
      
      const formattedCart: ShopifyCart = {
        id: updatedCart.id,
        lineItems: updatedCart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: item.variant,
          quantity: item.quantity,
        })),
        subtotalPrice: {
          amount: updatedCart.subtotalPrice.amount,
          currencyCode: updatedCart.subtotalPrice.currencyCode,
        },
        totalPrice: {
          amount: updatedCart.totalPrice.amount,
          currencyCode: updatedCart.totalPrice.currencyCode,
        },
        webUrl: updatedCart.webUrl,
      };

      setCart(formattedCart);
      return formattedCart;
    } catch (err) {
      console.error('Erro ao adicionar ao carrinho:', err);
      setError('Erro ao adicionar ao carrinho');
    } finally {
      setLoading(false);
    }
  }, [cart, createCart]);

  // Remover item do carrinho
  const removeFromCart = useCallback(async (lineItemId: string) => {
    if (!cart) return;

    try {
      setLoading(true);
      setError(null);

      const updatedCart = await client.checkout.removeLineItems(cart.id, [lineItemId]);
      
      const formattedCart: ShopifyCart = {
        id: updatedCart.id,
        lineItems: updatedCart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: item.variant,
          quantity: item.quantity,
        })),
        subtotalPrice: {
          amount: updatedCart.subtotalPrice.amount,
          currencyCode: updatedCart.subtotalPrice.currencyCode,
        },
        totalPrice: {
          amount: updatedCart.totalPrice.amount,
          currencyCode: updatedCart.totalPrice.currencyCode,
        },
        webUrl: updatedCart.webUrl,
      };

      setCart(formattedCart);
    } catch (err) {
      console.error('Erro ao remover do carrinho:', err);
      setError('Erro ao remover do carrinho');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Atualizar quantidade do item
  const updateCartItem = useCallback(async (lineItemId: string, quantity: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      setError(null);

      const lineItemsToUpdate = [
        {
          id: lineItemId,
          quantity,
        }
      ];

      const updatedCart = await client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
      
      const formattedCart: ShopifyCart = {
        id: updatedCart.id,
        lineItems: updatedCart.lineItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          variant: item.variant,
          quantity: item.quantity,
        })),
        subtotalPrice: {
          amount: updatedCart.subtotalPrice.amount,
          currencyCode: updatedCart.subtotalPrice.currencyCode,
        },
        totalPrice: {
          amount: updatedCart.totalPrice.amount,
          currencyCode: updatedCart.totalPrice.currencyCode,
        },
        webUrl: updatedCart.webUrl,
      };

      setCart(formattedCart);
    } catch (err) {
      console.error('Erro ao atualizar carrinho:', err);
      setError('Erro ao atualizar carrinho');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Ir para checkout
  const checkout = useCallback(() => {
    if (cart?.webUrl) {
      window.open(cart.webUrl, '_blank');
    }
  }, [cart]);

  useEffect(() => {
    // Tentar recuperar carrinho do localStorage se existir (apenas no cliente)
    if (typeof window !== 'undefined') {
      const savedCartId = localStorage.getItem('shopify-cart-id');
      if (savedCartId) {
        client.checkout.fetch(savedCartId).then((shopifyCart: any) => {
          if (shopifyCart) {
            const formattedCart: ShopifyCart = {
              id: shopifyCart.id,
              lineItems: shopifyCart.lineItems.map((item: any) => ({
                id: item.id,
                title: item.title,
                variant: item.variant,
                quantity: item.quantity,
              })),
              subtotalPrice: {
                amount: shopifyCart.subtotalPrice.amount,
                currencyCode: shopifyCart.subtotalPrice.currencyCode,
              },
              totalPrice: {
                amount: shopifyCart.totalPrice.amount,
                currencyCode: shopifyCart.totalPrice.currencyCode,
              },
              webUrl: shopifyCart.webUrl,
            };
            setCart(formattedCart);
          }
        }).catch(console.error);
      }
    }
  }, []);

  // Salvar ID do carrinho no localStorage (apenas no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined' && cart?.id) {
      localStorage.setItem('shopify-cart-id', cart.id);
    }
  }, [cart?.id]);

  return {
    cart,
    loading,
    error,
    createCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    checkout,
  };
}

// Hook para buscar coleções
export function useShopifyCollections() {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        setError(null);
        
        const shopifyCollections = await client.collection.fetchAllWithProducts();
        
        const formattedCollections: ShopifyCollection[] = shopifyCollections.map((collection: any) => ({
          id: collection.id,
          title: collection.title,
          description: collection.description,
          handle: collection.handle,
          image: collection.image ? {
            src: collection.image.src,
            altText: collection.image.altText || '',
          } : undefined,
          products: collection.products.map((product: any) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            handle: product.handle,
            images: product.images.map((img: any) => ({
              src: img.src,
              altText: img.altText || '',
            })),
            variants: product.variants.map((variant: any) => ({
              id: variant.id,
              title: variant.title,
              price: {
                amount: variant.price.amount,
                currencyCode: variant.price.currencyCode,
              },
              compareAtPrice: variant.compareAtPrice ? {
                amount: variant.compareAtPrice.amount,
                currencyCode: variant.compareAtPrice.currencyCode,
              } : undefined,
              available: variant.available,
              image: variant.image ? {
                src: variant.image.src,
                altText: variant.image.altText || '',
              } : undefined,
            })),
            options: product.options.map((option: any) => ({
              id: option.id,
              name: option.name,
              values: option.values.map((value: any) => value.value),
            })),
            tags: product.tags,
            productType: product.productType,
            vendor: product.vendor,
            availableForSale: product.availableForSale,
            priceRange: {
              minVariantPrice: {
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
              },
              maxVariantPrice: {
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              },
            },
          })),
        }));

        setCollections(formattedCollections);
      } catch (err) {
        console.error('Erro ao buscar coleções:', err);
        setError('Erro ao carregar coleções');
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { collections, loading, error };
}
