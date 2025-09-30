'use client';

import dynamic from 'next/dynamic';

// Importação dinâmica do componente Shopify para evitar problemas de hidratação
const ShopSectionShopify = dynamic(
  () => import('./ShopSectionShopify'),
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        padding: '100px 0', 
        textAlign: 'center', 
        color: 'white',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Carregando loja...
      </div>
    )
  }
);

export default ShopSectionShopify;
