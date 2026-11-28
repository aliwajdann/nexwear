'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/ProductCard';

// Same side padding as the All Products page and the card's mobile info inset
const PAD = 'px-2 md:px-8';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  media: { url: string; type: string }[];
  variants?: { colors: string[]; sizes: string[] };
  category: { name: string; slug: string };
  subcategory: { name: string; slug: string };
  description: string;
  tags?: string[];
}

export default function SubCategoryProductsPage() {
  const params = useParams();
  const category = params.categorySlug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category.slug', '==', category)
        );
        const snapshot = await getDocs(q);
        const productsData: Product[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Product, 'id'>;
          return { id: doc.id, ...data };
        });

        setProducts(productsData);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen pb-12">
      {/* Title */}
      <div className={`${PAD} py-4`}>
        <h1 className="text-[20px] md:text-[28px] font-medium capitalize text-black">
          {category.replace(/-/g, ' ')} Collection
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