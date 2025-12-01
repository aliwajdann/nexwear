import HeroSection from "@/components/HeroSection";
import OnSaleSection from "@/components/OnSaleSection";
import ImageAndProducts from "@/components/ImageAndProducts";
import TextAndProducts from "@/components/TextAndProducts";
import PromoGrid from "@/components/PromoGrid";
import TextWithCategories from "@/components/TextWithCategories";
import ServicesSection from "@/components/ServicesSection";
import CollectionSectionTexts from "@/components/CollectionSectionTexts"


export default function Home() {

  return (
    <>
      <HeroSection />
    <OnSaleSection
  category="jewellery"
  subcategory="necklaces"
  title="BestSellers on sale"
/>
<ImageAndProducts  
image="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5932608/portrait_ratio1x1/900/900/80781a6da499a9416ab41ee2613e0bf7/B5DED459A00C335C0E0D65F45CEFCCD9/int-hp-cw2525-homepageupdate-shopthelook-all-01-1-.jpg"
title="Fresh pyjamas for summer" tagline="" linktext="View All" buttonlink="category/jewellery"
category="jewellery"
subcategory="necklaces"
/>
<TextAndProducts
      // category="intimates"
      // subcategory="bras"
       category="jewellery"
  subcategory="necklaces"
      title="Jewellery"
      // title="Intimates"
      linktext="View All"
      buttonlink="/category/jewellery/necklaces"
      // buttonlink="/category/intimates/bras"
 />
<ImageAndProducts 
title="The perfect combo"
// tagline="Light tank tops and briefs to match in many colours"
tagline=""
linktext="View All" 
// buttonlink="category/intimates/bras"
 buttonlink="/category/jewellery/necklaces"
// category="intimates"
 category="jewellery"
subcategory="necklaces"
// subcategory="bras"
image="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5934182/portrait_ratio1x1/900/900/e5e057f83d0ccbe58a8db6afe0107cfc/8DCAE655F003897EDFBA7528A57535AE/int-hp-cw2525-homepageupdate-shopthelook-all-02.jpg"/>
<TextWithCategories />
<PromoGrid />
<ServicesSection />
<CollectionSectionTexts />
    </>
  );
}
