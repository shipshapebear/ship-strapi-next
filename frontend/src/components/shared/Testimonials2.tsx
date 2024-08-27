import { cn, getStrapiMedia } from "@/lib/utils";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DangerousHtmlComponent from "@/components/ui/dangerous";
import Image from "next/image";

function Testimonials({ data }: any) {
  const imageStyle = "w-[54px] h-[54px] aspect-square rounded-full";

  return (
    <>
      {data?.map((val: any) => {
        const image = getStrapiMedia(val.Image.url);
        return (
          <Card className="overflow-hidden" key={val.id}>
            <CardContent className="flex h-full flex-col gap-y-4 p-4">
              <DangerousHtmlComponent
                isIsoMorphic
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
                    alt="profile fallback"
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
        );
      })}
    </>
  );
}

export default Testimonials;
