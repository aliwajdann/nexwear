'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // ✅ STEP 1: Import Autoplay

import 'swiper/css';

type Subcategory = {
  name: string;
  slug: string;
  image?: string;
};

// type CategorySlug = 'skincare' | 'undergarments' | 'jewellery';
type CategorySlug = 'skincare'  | 'jewellery';

const subcategories: Record<CategorySlug, Subcategory[]> = {
  // undergarments: [
  //   { name: 'T-Shirts', slug: 't-shirts', image: '/images/tshirts.jpg' },
  //   { name: 'Hoodies', slug: 'hoodies', image: '/images/hoodies.jpg' },
  //   { name: 'Jeans', slug: 'jeans', image: '/images/jeans.jpg' },
  // ],
  skincare: [
    { name: 'Watches', slug: 'watches', image: '/images/watches.jpg' },
    { name: 'Sunglasses', slug: 'sunglasses', image: '/images/sunglasses.jpg' },
    { name: 'Wallets', slug: 'wallets', image: '/images/wallets.jpg' },
    { name: 'Anything', slug: 'anything', image: '/images/anything.jpg' },
  ],
  jewellery: [
    {
      name: 'Necklaces',
      slug: 'necklaces',
      image:
        'https://img.freepik.com/premium-photo/gold-jewelry-necklace-engagement-stone-word-gold-it_669966-2177.jpg',
    },
    {
      name: 'Earrings',
      slug: 'earrings',
      image:
        'https://img.freepik.com/free-photo/aesthetic-golden-earrings-arrangement_23-2149846597.jpg',
    },
    {
      name: 'Bracelets',
      slug: 'bracelets',
      image:
        'https://img.freepik.com/free-photo/side-view-silver-bracelets-with-diamonds-black-wall_140725-12838.jpg',
    },
    {
      name: 'Key Chains',
      slug: 'key-chains',
      image:
        'https://img.freepik.com/free-vector/silver-keychain-with-ring-mockup-branding_107791-30333.jpg',
    },
  ],
};

interface CategoryRoundSliderProps {
  category: CategorySlug;
  title?: string;
}

export default function CategoryRoundSlider({ category, title }: CategoryRoundSliderProps) {
  const subs = subcategories[category] || [];

  return (
    <section className="w-full  pb-10 pt-6 flex flex-col items-center">
         <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
            <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
          </div>
            <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl font-semibold capitalize text-gray-800">
            {title || category}
          </h2>
        </div>
      <div className="w-full max-w-[90%] mx-auto ">
       
          
        {/* Heading */}
      

        {/* Swiper */}
        <Swiper
          spaceBetween={16}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[Autoplay]} // ✅ STEP 2: Enable Autoplay module
          breakpoints={{
            320: { slidesPerView: 3 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
          }}
          className="pl-1"
        >
          {subs.map((sub) => (
            <SwiperSlide key={sub.slug} className="text-center">
              <Link href={`/category/${category}/${sub.slug}`} className="block group">
                <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-[#681C1C] mx-auto">
                  <img
                    src={sub.image || '/placeholder.jpg'}
                    alt={sub.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="mt-1 text-sm font-medium text-gray-700 truncate">
                  {sub.name}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
