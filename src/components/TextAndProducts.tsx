"use client"
import React from 'react'
import ProductsWithoutPrices from './ProductsWithoutPrices'
import Link from 'next/link'

interface Props {
  category: string,
  subcategory: string,
  title: string,
  linktext: string,
  buttonlink: string
}

function TextAndProducts({ category, subcategory, title, linktext, buttonlink }: Props) {
  return (
    <>
      <div className="textandproducts pt-[32px] md:pt-[40px] w-full md:pl-[32px] pl-[0px] grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">

        {/* Image */}
        <div className='pl-[16px] md:pl-[32px] flex flex-col items-center justify-center'>
          <h4 className='text-[24px]  md:text-[32px] font-medium capitalize text-[#3C3738]'>{title}</h4>
          <p className='text-center text-[13px] md:text-[16px]  mb-4'>So many fabrics, patterns and colours to collect</p>
          <Link href={buttonlink} className='text-sm custom-gray underline  text-[#3c3738]'>{linktext}</Link>
        </div>

        {/* Products List */}
        <div className="overflow-x-hidden">
          <ProductsWithoutPrices
            category={category}
            subcategory={subcategory}
            title=""
            linktext=""
            buttonlink=""
          />
        </div>
      </div>
      <style jsx>{`
        .textandproducts {
          display: grid;
        }

        /* Desktop (>=768px) */
        @media (min-width: 768px) {
          .textandproducts {
            grid-template-columns: 20% auto;
          }
        }

        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .textandproducts {
            grid-template-rows: auto auto;
          }
        }
      `}</style>
    </>
  )
}

export default TextAndProducts

