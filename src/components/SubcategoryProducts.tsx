'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from './ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: { url: string; type: string }[];
  variants: {
    colors: string[];
    sizes: string[];
  };
  category: { name: string; slug: string };
  subcategory: { name: string; slug: string };
  description: string;
}

interface SubcategorySliderProps {
  category: string;
  subcategory: string;
  title?: string;
}

export default function SubcategorySlider({
  category,
  subcategory,
  title,
}: SubcategorySliderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category.slug', '==', category),
          //   where('subcategory.slug', '==', subcategory)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('❌ Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading || products.length === 0) return null;

  return (
    <section className="w-full  pt-6 pb-10 flex flex-col items-center">
      <div className="inline-flex items-center justify-center mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
        <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
      </div>

      <div className="flex items-center flex-col gap-4 mb-4">
        <h2 className="text-lg font-semibold capitalize text-gray-800">
          {category.replace('-', ' ') + " " + 'Collection'}
        </h2>
        <button className="text-sm text-[#681C1C] hover:underline font-medium">
          View All
        </button>
      </div>
      <div className="md:w-[90%] w-[100%] mx-auto ">




        <Swiper
          loop={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay]}
          spaceBetween={12}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 6 },
            480: { slidesPerView: 2, spaceBetween: 6 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 12 },
          }}
          className="pt-2"
        >


          {products.map((product) => (
            <SwiperSlide
              key={product.id}
            >
              <ProductCard
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  originalprice: product.originalPrice,
                  images: product.media,
                  href: `/products/${product.id}`,
                  description: product.description
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
