// 'use client';

// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { useState, useRef, useEffect } from 'react';

// type Subcategory = {
//   name: string;
//   slug: string;
//   image?: string; // Add image field optionally
// };

// type CategorySlug = 'skincare' | 'undergarments' | 'jewellery';

// const subcategories: Record<CategorySlug, Subcategory[]> = {
//   undergarments: [
//     { name: "T-Shirts", slug: "t-shirts", image: "/images/tshirts.jpg" },
//     { name: "Hoodies", slug: "hoodies", image: "/images/hoodies.jpg" },
//     { name: "Jeans", slug: "jeans", image: "/images/jeans.jpg" },
//     // { name: "Jeans", slug: "jeans", image: "/images/jeans.jpg" },
//   ],
//   skincare: [
//     { name: "Watches", slug: "watches", image: "/images/watches.jpg" },
//     { name: "Sunglasses", slug: "sunglasses", image: "/images/sunglasses.jpg" },
//     { name: "Wallets", slug: "wallets", image: "/images/wallets.jpg" },
//     { name: "anything", slug: "anything", image: "/images/anything.jpg" },
//   ],
//   jewellery: [
//     { name: "Necklaces", slug: "necklaces", image: "/images/necklaces.jpg" },
//     { name: "Earrings", slug: "earrings", image: "/images/earrings.jpg" },
//     { name: "Bracelets", slug: "bracelets", image: "/images/bracelets.jpg" },
//     { name: "Key Chains", slug: "key-chains", image: "/images/keychains.jpg" },
//   ],
// };

// export default function SubCategoryPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const sectionRef = useRef<HTMLElement>(null);

//   const params = useParams();
//   const category = params.categorySlug as CategorySlug;
//   const subs = subcategories[category] || [];

//   // Auto-play slider
//   useEffect(() => {
//     if (!isAutoPlaying || subs.length <= 1) return;

//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % subs.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, subs.length]);

//   // Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const goToSlide = (index: number) => {
//     setActiveSlide(index);
//     setIsAutoPlaying(false);
//     setTimeout(() => setIsAutoPlaying(true), 5000);
//   };

//   return (
//     <section ref={sectionRef} className="w-full px-4 py-10 pt-20 custom-background">
//       <div className="max-w-7xl pt-20 mx-auto">
//         {/* Heading */}
//         <div className="flex items-center gap-4 mb-10">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black uppercase whitespace-nowrap">
//             {category}
//           </h1>
//         </div>

//         {/* Subcategory Grid */}
//         <div
//           className={`grid grid-cols-2 md:grid-cols-4 gap-4 transform transition-all duration-1000 delay-500 md:px-0 px-3 ${
//             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}
//         >
//           {subs.map((sub, index) => (
//             <Link
//               key={sub.slug}
//               href={`/category/${category}/${sub.slug}`}
//               onClick={() => goToSlide(index)}
//               className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
//                 index === activeSlide
//                   ? 'scale-105 ring-2 ring-white/50'
//                   : 'hover:scale-105 opacity-70 hover:opacity-100'
//               }`}
//             >
//               <div className="aspect-square relative">
//                 <img
//                   src={sub.image || '/placeholder.jpg'}
//                   alt={sub.name}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-2 left-2 right-2">
//                   <div className="text-white text-sm font-semibold truncate">
//                     {sub.name}
//                   </div>
//                 </div>
//                 {index === activeSlide && (
//                   <div className="absolute inset-0 bg-white/20 animate-pulse" />
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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


  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <section className="w-full h-full py-10">
      <div className="w-[95%] md:w-[90%]  mx-auto flex items-center flex-col">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent w-20"></div>
          <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent w-20"></div>
        </div>

        <div className="flex items-center flex-col gap-4 mb-4">
          <h2 className="text-lg font-semibold capitalize text-gray-800">
            {category.replace('-', ' ') + " " + 'Collection'}
          </h2>
          {/* <button className="text-sm text-[#681C1C] hover:underline font-medium">
            View All
          </button> */}
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found in this subcategory.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 gap-x-2 md:gap-y-6 gap-y-3">
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
