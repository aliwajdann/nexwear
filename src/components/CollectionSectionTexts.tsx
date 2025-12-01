import React from 'react'

function CollectionSectionTexts() {
  return (
   <section className="px-4 md:px-12 py-10">
  {/* Title + Intro */}
  <div className="mb-8 max-w-3xl">
    <p  className="text-md  font-[500] mb-2">
      WOMEN'S COLLECTION
    </p>
    <p className="text-sm text-gray-700 leading-relaxed">
      Intimissimi women’s collection is a one-stop-shop for all your needs.
      From underwear to outerwear, we carry the latest trends and styles in
      women’s fashion. Made with fine fabrics and attention to detail, our
      products are hard to beat.
    </p>
  </div>

  {/* Content Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* <div>
      <p className="text-md font-semibold mb-2">
        WOMEN’S BRAS
      </p>
      <p className="text-xs text-gray-700 leading-relaxed">
        Our collection of bras caters to all women and their lifestyles. For
        the sporty girl on the go, our In Action collection consists of sports
        bras that provide both style and support. If you’re more of a girly
        girl, our push-up bras and lace bralettes provide that feminine
        feeling. Coordinate your bra and knickers or have fun mixing and
        matching!
      </p>
    </div> */}

    <div>
      <p className="text-md font-semibold mb-2">
        KNICKERS FOR YOU
      </p>
      <p className="text-xs text-gray-700 leading-relaxed">
        For comfort and care, try out our knickers for women. Offered in a
        variety of styles, we provide knickers that fit and flatter every
        woman’s body type. For figure-hugging clothing, thongs and G-strings
        are the perfect way to avoid any visible panty lines...
      </p>
    </div>

    {/* <div>
      <p className="text-md font-semibold mb-2">
        ALL TYPES OF LINGERIE
      </p>
      <p className="text-xs text-gray-700 leading-relaxed">
        We carry both traditional and trendy lingerie for modern women. For
        our babydolls, suspenders, and slips we use the finest materials
        including silk, satin, and lace. Carefully designed, our lingerie hugs
        and highlights your best assets...
      </p>
    </div> */}

    {/* <div>
      <p className="text-md font-semibold mb-2">
        DAY-TO-NIGHT APPAREL
      </p>
      <p className="text-xs text-gray-700 leading-relaxed">
        When out and about, layer our outerwear over your intimates for a
        head-to-toe classic Intimissimi look. From tops to trousers, we focus
        on perfecting the best basics for every woman’s wardrobe...
      </p>
    </div> */}
  </div>
</section>

  )
}

export default CollectionSectionTexts
