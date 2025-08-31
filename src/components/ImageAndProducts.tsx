"use client"
import React from 'react'
// import ProductsWithoutPrices from './ProductsWithoutPrices'
import ProdsWithImg from './ProdsWithImg'


type Props = {
  title: string,
  tagline: string,
  linktext: string,
  image: string,
  buttonlink: string
  category: string,
  subcategory: string
}


function ImageAndProducts({title, tagline, linktext, image, buttonlink, category, subcategory}:Props) {
  return (
    <>
  <div  className="imageandproducts pt-[32px] md:pt-[40px] w-full md:pl-[32px] pl-[0px] grid  items-center justify-center overflow-hidden">
  
  {/* Mobile header section */}
  <div className="md:hidden flex flex-col items-center justify-center">
    <div
  className={`flex  items-center justify-center flex-col mb-6 ${
    tagline ? "gap-0" : "gap-3"
  }`}
>

      <h2  className="text-center md:text-[38px] text-[30px]  font-medium capitalize text-gray-800">
        {title}
      </h2>
     {tagline &&  <p className='text-center text-[13px] md:text-[16px] mb-4'>{tagline}</p>}
      <a href={buttonlink} className="text-center text-sm text-gray-800 underline font-medium">
        {linktext}
      </a>
    </div>
  </div>

  {/* Image */}
  <div className="w-full px-4 md:px-0">
  <img
    className="w-full object-cover rounded-sm"
        // src="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5932608/portrait_ratio1x1/900/900/80781a6da499a9416ab41ee2613e0bf7/B5DED459A00C335C0E0D65F45CEFCCD9/int-hp-cw2525-homepageupdate-shopthelook-all-01-1-.jpg"
        src={image}

    alt=""
  />
</div>


  {/* Products List */}
  <div className="overflow-x-hidden">
    
    <ProdsWithImg
      category={category}
      subcategory={subcategory}
      title = {title}
      linktext={linktext}
      tagline= {tagline}
      buttonlink={buttonlink}
    />
  </div>
</div>
 <style jsx>{`
        .imageandproducts {
          display: grid;
        }

        /* Desktop (>=768px) */
        @media (min-width: 768px) {
          .imageandproducts {
            grid-template-columns: 40% auto;
          }
        }

        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .imageandproducts {
            grid-template-rows: auto auto auto;
          }
        }
      `}</style>
</>
  )
}

export default ImageAndProducts

