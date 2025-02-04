"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";
import { useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (current + 1 >= count) {
        api?.scrollTo(0);
      } else {
        api?.scrollTo(current + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api, current, count]);

  const handleDotClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <Carousel setApi={setApi} className="w-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="w-auto">
                <CardContent className="flex aspect-video items-center justify-center p-0 relative w-auto">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`image-${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`w-3 h-3 rounded-full p-0 ${
              index === current
                ? "border-orange-700 border-2"
                : "bg-zinc-300 border-zinc-300 hover:bg-zinc-400 hover:border-zinc-400"
            }`}
            onClick={() => handleDotClick(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
