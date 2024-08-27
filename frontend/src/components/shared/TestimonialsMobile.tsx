"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { CardContent, Card } from "@/components/ui/card";
import DangerousHtmlComponent from "../ui/dangerous";
import Image from "next/image";
import { cn, getStrapiMedia } from "@/lib/utils";

function TestimonialsMobile({ data }: any) {
  const imageStyle = "w-[54px] h-[54px] aspect-square rounded-full";

  return (
    <Carousel
      className="relative w-full"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {data.map((val: any, index: number) => {
          const image = getStrapiMedia(val.Image.url);
          return (
            <CarouselItem
              className="min-h-[200px] md:basis-1/2 lg:basis-1/3"
              key={val.id}
            >
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-y-4 p-4">
                  <DangerousHtmlComponent
                    className="line-clamp-4"
                    htmlContent={val.Testimony}
                  />
                  <div className="mt-auto flex items-center gap-x-4">
                    {!!image ? (
                      <Image
                        className={cn(imageStyle)}
                        alt="profile"
                        src={val.Image}
                        width={500}
                        height={500}
                      />
                    ) : (
                      <Image
                        className={cn(imageStyle)}
                        alt="profile"
                        src={require("@/assets/OIP.jpg")}
                        width={500}
                        height={500}
                      />
                    )}
                    <div className="flex flex-col">
                      <b>{val.Name}</b>
                      <span className="font-semibold text-foreground/50">
                        {val.Position}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselDots className="mt-5" />
    </Carousel>
  );
}

export default TestimonialsMobile;
