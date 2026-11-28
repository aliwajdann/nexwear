"use client";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  description: string
}

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

export default function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
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
          collection(db, "products"),
          where("category.slug", "==", category)
        );
        const snapshot = await getDocs(q);
        const productsData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((p) => p.id !== currentProductId) as Product[]; // exclude current product

        setProducts(productsData);
      } catch (error) {
        console.error("❌ Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, currentProductId]);

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
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [products]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12;
      container.scrollBy({
        left: -(cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12;
      container.scrollBy({
        left: cardWidth + gap,
        behavior: "smooth",
      });
    }
  };

  //   if (loading || products.length === 0) return null;
  if (products.length === 0) return <p>{category}</p>;

  return (
    <>
      <section className="w-full md:w-[90%] mx-auto flex flex-col items-center pt-[32px] md:pt-[40px] mb-10">
        <div className="flex items-center flex-col md:gap-4 gap-2 md:mb-6 mb-4">
          <h2 className="text-[24px] md:text-[32px] font-medium capitalize text-[#3C3738]">
            You may also like
          </h2>
        </div>

        <div
          className="w-full relative pl-[16px] md:pl-[32px]"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {/* Navigation Arrows */}
          <div
            className={`hidden md:block transition-opacity duration-300 ${showArrows ? "opacity-100" : "opacity-0"
              }`}
          >
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border-gray-200 hover:bg-gray-50 transition-all duration-200 ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                }`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>

            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${!canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                }`}
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-2 md:gap-3 pt-2 pb-4 scroll-smooth custom-scrollbar w-full"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[calc(50%-6px)] sm:w-[calc(50%-6px)] md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)]"
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
              </div>
            ))}
          </div>
        </div>
      </section>

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
     `}</style>

    </>
  );
}
