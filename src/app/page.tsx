import FeaturesProducts from "./_components/FeaturesProducts/FeaturesProducts";
import Slider from "./_components/Slider/Slider";
import img1 from "../assets/images/home-3.png";
import img2 from "../assets/images/home-2.png";
import img3 from "../assets/images/home-1.png";
import FeatureBar from "./_components/FeatureBar/FeatureBar";
import { lazy, Suspense } from "react";
import PromoSection from "./_components/PromoSection/PromoSection";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
const LazyHomeCategoriesComponent = lazy(
  () => import("./_components/HomeCategories/HomeCategories"),
);


export default function Home() {
  return (
    <>
      <Slider listOfImages={[img1.src, img2.src, img3.src]} />
      <FeatureBar />
      <Suspense fallback={
        <div className="h-75 bg-amber-800 text-white text-4xl font-bold flex justify-center items-center" >Loading.....</div>
      }>
      <LazyHomeCategoriesComponent />
      </Suspense>
      <PromoSection />
      <h1 className="flex items-center px-4 my-8 text-4xl font-bold gap-3">
        <div className="w-2 h-10 rounded-full bg-linear-to-b from-[#0AAD0A] to-[#065f06]" />

        <div className="ps-1">
          Featured
          <span className="ml-2 bg-linear-to-r from-[#0AAD0A] to-[#065f06] bg-clip-text text-transparent">
            Products
          </span>
        </div>
      </h1>
      <FeaturesProducts />
      <NewsletterSection />
    </>
  );
}
