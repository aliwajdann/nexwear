'use client';
import ProductsSection from "@/components/products";
// import CategorySection from "@/components/CategorySection";
import SubcategorySlider from "@/components/SubcategoryProducts";
import CategoryRoundSlider from "@/components/CategorySlider";
// import Sectionn from "@/components/sectionn";
// import Sectionnn from "@/components/sectionn";

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import { ClassNames } from "@emotion/react";

const categories = [
  {
    name: 'Jewellery',
    slug: 'jewellery',
    image:
      'https://img.freepik.com/premium-photo/best-amazing-wonderful-this-photo-take-this-picture-your-work-ai-generated-top-lovely-photo_1078211-47480.jpg?ga=GA1.1.462192201.1753866574&semt=ais_hybrid&w=740&q=80',
    description: 'Elegant pieces for every occasion',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    icon: '💎',
  },
  {
    name: 'Skin Care',
    slug: 'skincare',
    image:
      'https://img.freepik.com/premium-photo/beauty-woman-face-portrait-beautiful-female-model-with-perfect-clean-skin-isolated_489646-298.jpg?semt=ais_hybrid&w=740&q=80',
    description: 'Nourish your natural beauty',
    gradient: 'from-pink-400 via-rose-500 to-red-500',
    icon: '✨',
  },
  {
    name: 'Under Garments',
    slug: 'undergarments',
    image:
      'https://images.unsplash.com/photo-1679826010913-09dab83d852c?w=600&auto=format&fit=crop&q=60',
    description: 'Comfort meets confidence',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    icon: '🌸',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image:
      'https://plus.unsplash.com/premium_photo-1669106605262-f4c11d489403?w=600&auto=format&fit=crop&q=60',
    description: 'Complete your perfect look',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    icon: '👜',
  },
];

export default function HeroCategorySwiper() {
  return (
    <>
    <section className="bg-white relative pt-24 md:pt-28">
      <div className={`w-full flex justify-center`}>
              <div className="relative inline-block mb-8">
                <h2 className="text-4xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F5D5D6] via-[#D4A5A6] to-[#F5D5D6] relative">
                  VELANO
                </h2>
                
                {/* Animated Underline */}
                {/* <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#681C1C] to-transparent">
                  <div className="h-full bg-gradient-to-r from-[#F5D5D6] to-[#681C1C] animate-pulse"></div>
                </div> */}

                {/* Floating Letters Effect */}
                <div className="absolute inset-0 text-4xl md:text-8xl font-black tracking-wider text-[#681C1C]/10 animate-bounce" style={{ animationDelay: '1s' }}>
                  VELANO
                </div>
              </div>
            </div>
      {/* <div className="max-w-6xl mx-auto text-center mb-10">
        <div style={{lineHeight: 1.2}} className="text-5xl md:text-6xl font-extrabold text-white">
          {/* bg-clip-text   text-transparent*/}
          {/* Shop by Category */}
        {/* </div> */}
        {/* <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto"> */}
          {/* Discover premium collections crafted for the modern woman ✨ */}
        {/* </p> */}
      {/* </div> */}
      <Swiper
        // modules={[Autoplay, Pagination]}
        modules={[Autoplay]}
        autoplay={{ delay: 3500 }}
        loop= {true}
        spaceBetween={10}
        slidesPerView={1.2}
        centeredSlides= {true}
        // pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 ,  },
        }}
        className=""
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.slug} className="">
            <Link href={`/category/${cat.slug}`} className="block group mb-12">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-transparent backdrop-blur-3xl">
                <div className="h-56 md:h-64 w-full relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  {/* <div
                    className={`text-4xl mb-2 transition-transform`}
                  >
                    {cat.icon}
                  </div> */}
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-black mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <button
                    className={`px-5 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r ${cat.gradient} transition-all hover:scale-105`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`text-center mt-8`}>
       
         <div className="inline-flex items-center justify-center md:space-x-2 space-x-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full md:px-8 px-6 py-4 shadow-lg">
           <div className="flex -space-x-2  ">
             {[1,2,3].map((i) => (
                <div key={i} className={`w-8 h-8 bg-gradient-to-r ${categories[i-1]?.gradient} rounded-full border-2 border-white animate-pulse`} style={{animationDelay: `${i * 200}ms`}}></div>
              ))}
            </div>
            <span className="text-gray-700 font-medium md:text-[16px] text-[12px]">Join thousands of happy customers</span>
          </div>
          </div>
    </section> 
{/* <Sectionn /> */}
{/* <Sectionnn /> */}
    <SubcategorySlider
  category="jewellery"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
 
    {/* <SubcategorySlider
  category="undergarments"
  subcategory="necklaces"
  title="Necklaces Collection"
/> */}
    <SubcategorySlider
  category="skincare"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
<CategoryRoundSlider category="jewellery" title="Shop by Type" />

<ProductsSection></ProductsSection>
{/* <CategorySection></CategorySection> */}
</>
  );
}