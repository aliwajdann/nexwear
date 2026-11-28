'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AtcBtn from './AtcBtn';

interface Product {
  id: string;
  title: string;
  price: number;
  originalprice?: number;
  images: { url: string; type: string }[];
  href: string;
  description: string;
  category?: { name: string; slug: string };
  subcategory?: { name: string; slug: string };
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  edgeToEdge?: boolean; // images touch screen edges on mobile, text keeps side space
}

const PLACEHOLDER =
  'https://cdn.velanoshop.store/Products/product-placeholder.jpg';

const TAG_STYLES: Record<string, { label: string; className: string }> = {
  onsale: { label: 'On Sale', className: 'text-red-600' },
  bestseller: { label: 'Best Seller', className: 'text-[#d33a1f]' },
  new: { label: 'New', className: 'text-emerald-700' },
};

const getTag = (tags?: string[]) => {
  if (!tags || tags.length === 0) return null;
  const key = tags[0];
  return (
    TAG_STYLES[key] ?? {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      className: 'text-[#d33a1f]',
    }
  );
};

const ProductCard = ({ product, edgeToEdge = false }: ProductCardProps) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const images = product.images?.length
    ? product.images
    : [{ url: PLACEHOLDER, type: 'image' }];

  const tag = getTag(product.tags);

  const discount =
    product.originalprice && product.originalprice > product.price
      ? Math.round(
        ((product.originalprice - product.price) / product.originalprice) * 100
      )
      : 0;

  // side space for text/thumbnails only (mobile), when images go edge to edge
  const inset = edgeToEdge ? 'px-2 md:px-0' : '';

  return (
    <div onClick={() => router.push(product.href)} className="cursor-pointer group">
      {/* ========== MEDIA ========== */}
      <div>
        <div className="relative overflow-hidden bg-[#f6f6f6] rounded-[0.5px]">
          <AtcBtn
            product={{
              id: product.id,
              name: product.title,
              price: product.price,
              media: product.images,
              description: product.description,
              quantity: 1,
            }}
          />
          <img
            src={images[activeIndex]?.url}
            alt={product.title}
            className="w-full aspect-[4/5] object-cover transition-opacity duration-300"
          />
        </div>

        {images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`mt-1.5 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${inset}`}
          >
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`shrink-0 w-10 h-12 overflow-hidden bg-[#f6f6f6] border-b-2 transition ${activeIndex === i ? 'border-black' : 'border-transparent'
                  }`}
              >
                <img
                  src={img.url}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========== INFO ========== */}
      <div className={`mt-2 space-y-0.5 ${inset}`}>
        {tag && (
          <p className={`text-[13px] font-medium ${tag.className}`}>{tag.label}</p>
        )}

        {product.subcategory?.name && (
          <p className="text-[14px] font-medium text-black">
            {product.subcategory.name}
          </p>
        )}

        <p className="text-[14px] text-gray-500 line-clamp-2">{product.title}</p>

        <div className="flex items-center gap-2 pt-1 text-[14px]">
          <span className="font-medium text-black">
            Rs.{product.price.toFixed(0)}
          </span>

          {discount > 0 && (
            <>
              <span className="text-gray-400 line-through">
                Rs.{product.originalprice!.toFixed(0)}
              </span>
              <span className="font-medium text-green-700">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;