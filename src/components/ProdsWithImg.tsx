'use client';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomProductCard from './CustomProductCard';
import AtcBtn from './AtcBtn';

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
  linktext?: string
  buttonlink?: string
  tagline?: string
}

export default function ProdsWithImg({
  category,
  subcategory,
  title,
  linktext,
  buttonlink,
  tagline,
}: SubcategorySliderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [products]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12; // gap between cards
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12; // gap between cards
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="w-full pt-6 pb-10 flex flex-col items-start pl-[16px] md:pl-[32px]">
      <div className="md:block hidden">
        {/* <div className="inline-flex items-center justify-center mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
        <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
      </div> */}

        <div
          className={`flex items-start justify-center flex-col mb-6 ${tagline ? "gap-0" : "gap-3"
            }`}
        >
          <h2 className="text-center text-[28px] md:text-[38px] capitalize text-gray-800">
            {title}
          </h2>
          {tagline && <p className='text-center text-[13px] md:text-[16px] mb-6'>{tagline}</p>}
          <a href={buttonlink} className="text-sm text-[black] underline font-medium">
            {linktext}
          </a>
        </div>

      </div>

      <div
        className="w-full relative "
        // className="w-full relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Navigation Arrows */}
        <div className={`hidden md:block transition-opacity duration-300 ${showArrows ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border-gray-200 hover:bg-gray-50 transition-all duration-200 ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Products Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-2 md:gap-3 pt-2 pb-4 scroll-smooth custom-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="md:block hidden relative flex-none w-1/2 md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
            >

              <CustomProductCard
                product={{
                  id: product.id,
                  name: "",
                  price: 0,
                  images: product.media,
                  href: `/products/${product.id}`,
                  description: product.description
                }}
              />
            </div>
          ))}



          {products.map((product) => (
            <div
              key={product.id}
              className="md:hidden block relative flex-none w-1/2 md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
            >

              <ProductCard
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  images: product.media,
                  href: `/products/${product.id}`,
                  description: product.description
                }}
              />
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`

.custom-scrollbar::-webkit-scrollbar {
  width: 2px !important;
  height: 0.1rem !important;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #BFBFBF;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #000;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

        // 
      `}</style>
    </section>
  );
}




//      'use client';
// import { useEffect, useState, useRef } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import ProductCard from './ProductCard';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   originalPrice?: number;
//   media: { url: string; type: string }[];
//   description: string;
//   category?: { name: string; slug: string };
//   subcategory?: { name: string; slug: string };
//   tags?: string[];
// }

// interface SubcategorySliderProps {
//   category: string;
//   subcategory: string;
//   title?: string;
//   linktext?: string;
//   buttonlink?: string;
//   tagline?: string;
// }

// export default function ProdsWithImg({
//   category,
//   subcategory,
//   title,
//   linktext,
//   buttonlink,
//   tagline,
// }: SubcategorySliderProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showArrows, setShowArrows] = useState(false);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const q = query(
//           collection(db, 'products'),
//           where('category.slug', '==', category)
//           // where('subcategory.slug', '==', subcategory)
//         );
//         const snapshot = await getDocs(q);
//         const productsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Product[];
//         setProducts(productsData);
//       } catch (error) {
//         console.error('❌ Failed to fetch products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [category, subcategory]);

//   const checkScrollButtons = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => checkScrollButtons();
//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, [products]);

//   const scrollByCard = (direction: 1 | -1) => {
//     const container = scrollContainerRef.current;
//     if (!container) return;
//     const cardWidth = container.children[0]?.clientWidth || 0;
//     const gap = 12;
//     container.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
//   };

//   if (loading || products.length === 0) return null;

//   return (
//     <section className="w-full pt-6 pb-10 flex flex-col items-start pl-[16px] md:pl-[32px]">
//       <div className="md:block hidden">
//         <div
//           className={`flex items-start justify-center flex-col mb-6 ${
//             tagline ? 'gap-0' : 'gap-3'
//           }`}
//         >
//           <h2 className="text-center text-[28px] md:text-[38px] capitalize text-gray-800">
//             {title}
//           </h2>
//           {tagline && (
//             <p className="text-center text-[13px] md:text-[16px] mb-6">{tagline}</p>
//           )}
//           <a href={buttonlink} className="text-sm text-[black] underline font-medium">
//             {linktext}
//           </a>
//         </div>
//       </div>

//       <div
//         className="w-full relative"
//         onMouseEnter={() => setShowArrows(true)}
//         onMouseLeave={() => setShowArrows(false)}
//       >
//         {/* Navigation Arrows */}
//         <div
//           className={`hidden md:block transition-opacity duration-300 ${
//             showArrows ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <button
//             onClick={() => scrollByCard(-1)}
//             disabled={!canScrollLeft}
//             className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
//               !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-300" />
//           </button>

//           <button
//             onClick={() => scrollByCard(1)}
//             disabled={!canScrollRight}
//             className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
//               !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
//             }`}
//           >
//             <ChevronRight className="w-5 h-5 text-gray-300" />
//           </button>
//         </div>

//         {/* Products Container */}
//         <div
//           ref={scrollContainerRef}
//           className="flex overflow-x-auto gap-2 md:gap-3 pt-2 pb-4 scroll-smooth custom-scrollbar"
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="relative flex-none w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
//             >
//               <ProductCard
//                 product={{
//                   id: product.id,
//                   title: product.title,
//                   price: product.price,
//                   originalprice: product.originalPrice,
//                   images: product.media,
//                   href: `/products/${product.id}`,
//                   description: product.description,
//                   category: product.category,
//                   subcategory: product.subcategory,
//                   tags: product.tags,
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 2px !important;
//           height: 0.1rem !important;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #bfbfbf;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #000;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #555;
//         }
//       `}</style>
//     </section>
//   );
// }