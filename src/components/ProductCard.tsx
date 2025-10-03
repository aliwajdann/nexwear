'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import AtcBtn from './AtcBtn';

interface Product {
  id: string;
  name: string;
  price: number;
  originalprice?: number;
  images: { url: string, type : string}[];
  colors?: string[];
  href: string;
  description: string
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

const atcbutton = useRef(null);

  const handleCardClick = () => {
    router.push(product.href);
  };

  const discount =
    product.originalprice && product.originalprice > product.price
      ? Math.round(((product.originalprice - product.price) / product.originalprice) * 100)
      : 0;

  const hasSecondImage = product.images?.[1];

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer   transition group ${hasSecondImage ? '' : ''}`}
    >
      <div className="relative p-0 overflow-hidden">
        <AtcBtn 
          product={{
             id : product.id,
              name: product.name,
  price:product.price,
  media:product.images,
  description: product.description,
quantity: 1
           } } 
 
        />
        {/* Main Image */}
        <img
          src={product.images?.[0]?.url || 'https://cdn.velanoshop.store/Products/product-placeholder.jpg'}
          alt={product.name}
          className={`w-full h-full object-contain transition-opacity duration-500 ${hasSecondImage ? 'group-hover:opacity-0' : ''}`}
        />

        {/* Second Image + White Overlay */}
        {hasSecondImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img
              src={product.images[1].url}
              alt={`${product.name} alternate`}
              className="w-full h-full object-fill opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
            />
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1">
        <p className="text-[13px] text-black line-clamp-2">{product.name}</p>

        <div className="flex items-center justify-between">
          <span className="custom-gray text-xs">
            Rs.{product.price.toFixed(0)}
          </span>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {/* First color */}
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: product.colors[0] }}
              />
              {/* Extra count */}
              {product.colors.length > 1 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
