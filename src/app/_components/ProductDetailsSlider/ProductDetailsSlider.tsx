"use client"
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function ProductDetailsSlider({
  images,
}: {
  images: string[] | undefined;
}) {
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = React.useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);


  React.useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
  }, [mainApi, onSelect]);


 return (
    <div className="w-full space-y-4">
      {/* Main Large Image Carousel */}
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {images?.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square overflow-hidden rounded-xl border bg-slate-50">
                <Image
                height={200}
                width={200}
                  src={src}
                  alt={`Product view ${index + 1}`}
                  className="object-contain p-4"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails Carousel */}
      <Carousel setApi={setThumbApi} className="w-full">
        <CarouselContent className="flex gap-2 ml-0">
          {images?.map((src, index) => (
            <div
              key={index}
              onClick={() => onThumbClick(index)}
              className={cn(
                "relative flex-none w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-all",
                selectedIndex === index
                  ? "border-green-600 ring-2 ring-green-100"
                  : "border-transparent hover:border-slate-300",
              )}
            >
              <Image
              height={200}
              width={200}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
