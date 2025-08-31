'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/ProductCard';

interface VariantsType {
  colors: string[];
  sizes: string[];
}

interface CategoryType {
  name: string;
  slug: string;
}

interface SubCategoryType {
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: [];
  variants: VariantsType;
  category: CategoryType;
  subcategory: SubCategoryType;
  categorySlug: string;
  subcategorySlug: string;
  description: string
}

export default function SubCategoryProductsPage() {
  const params = useParams();
  const category = params.categorySlug as string;
  const subcategory = params.subcategorySlug as string;
  console.log(subcategory)
  console.log(category)

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !subcategory) return;

    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category.slug', '==', category),
          where('subcategory.slug', '==', subcategory)
        );
        const snapshot = await getDocs(q);
        const productsData: Product[] = snapshot.docs.map((doc) => {
  const data = doc.data() as Omit<Product, 'id'>;
  return {
    id: doc.id,
    ...data,
  };
});

        setProducts(productsData);
        console.log(productsData);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
     <section className="w-full px-4 py-10">
    <div className=" flex flex-col items-center justify-center mb-5">
      
      <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent w-20"></div>
            <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent w-20"></div>
            
          </div>
      <h1 className="text-3xl font-bold capitalize mb-1">
        {subcategory.replace('-', 'het') + ""}
        
      </h1>
      </div>
    <div className="w-[90%]  mx-auto">


      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
                originalprice: product.originalPrice,
                images: product.media,
                // rating: 4.5,
                // isNew: true,
                // isBestSeller: true,
                href: `/products/${product.id}`,
                colors: product.variants?.colors || [],
                description: product.description
                // sizes: product.variants?.sizes || [],
              }}
            />
          ))}
        </div>
      )}
    </div>
    </section>
  );
}
