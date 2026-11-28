'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';

export default function ProductsSection() {
  const { products, loading } = useProducts();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // Calculate discount percentage
  const getDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section id="productpage-related-products-section" className="px-2 md:px-4 py-10 min-h-screen bg-light dark:bg-dark transition-colors duration-500">

      {/* Swiper for both mobile and desktop */}
      <div className="related  relative md:w-4/5 my-0 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6  text-gray-800 dark:text-primary-dark">
          Related Products
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={1.3}
          navigation
          loop
          pagination={{ clickable: true }}
          breakpoints={{
            // Mobile breakpoints
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            // Tablet breakpoint
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Desktop breakpoints
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            }
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative h-full">
                {product.originalPrice && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 z-10">
                    -{getDiscount(product.price, product.originalPrice)}%
                  </div>
                )}

                <ProductCard
                  product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    images: product.media,
                    originalprice: product.originalPrice,
                    // rating: 4.5,
                    // isNew: true,
                    // isBestSeller: true,
                    href: `/products/${product.id}`,
                    description: product.description
                    //  sizes: product.variants?.sizes || [],
                  }}
                />
                {/* Show ADD TO CART only on mobile */}
                {/* <div className="md:hidden mt-2">
                  <button className="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition-colors">
                    ADD TO CART
                  </button>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}