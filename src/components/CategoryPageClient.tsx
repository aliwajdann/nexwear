'use client';

import ProductCard from '@/components/ProductCard';

// Same side padding as the All Products page and the card's mobile info inset
const PAD = 'px-2 md:px-8';

export default function CategoryPageClient({
  category,
  products,
}: {
  category: string;
  products: any[];
}) {
  return (
    <section className="min-h-screen pb-12">
      {/* Title */}
      <div className={`${PAD} py-4`}>
        <h1 className="text-[20px] md:text-[28px] font-medium capitalize text-black">
          {category.replace(/-/g, ' ')}
        </h1>
      </div>

      {/* Grid: no side padding on mobile so images touch the edges */}
      <div className="relative z-0 md:px-8">
        {products.length === 0 ? (
          <p className={`${PAD} py-10 text-gray-500`}>
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8 md:gap-x-3 md:gap-y-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                edgeToEdge
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  originalprice: product.originalPrice,
                  images: product.media || [],
                  href: `/products/${product.id}`,
                  description: product.description,
                  category: product.category,
                  subcategory: product.subcategory,
                  tags: product.tags,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}