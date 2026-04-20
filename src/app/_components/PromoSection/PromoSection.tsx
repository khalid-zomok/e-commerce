import PromoBanner from './../PromoBanner/PromoBanner';

export default function PromoSection(){
  return (
    <div className="flex justify-between w-full gap-3 p-6 mx-auto">
      {/* Green Banner */}
      <PromoBanner
        tag="Deal of the Day"
        tagIcon={"🔥"}
        title="Fresh Organic Fruits"
        description="Get up to 40% off on selected organic fruits"
        discount="40% OFF"
        code="ORGANIC40"
        buttonText="Shop Now"
        gradientClass="bg-gradient-to-br from-emerald-500 to-green-700"
      />

      {/* Orange Banner */}
      <PromoBanner 
        tag="New Arrivals"
        tagIcon={"✨"}
        title="Exotic Vegetables"
        description="Discover our latest collection of premium vegetables"
        discount="25% OFF"
        code="FRESH25"
        buttonText="Explore Now"
        gradientClass="bg-gradient-to-br from-orange-400 to-red-500"
      />
    </div>
  );
};