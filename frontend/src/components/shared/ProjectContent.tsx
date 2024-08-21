"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useWindowSize from "@/lib/WindowSize";
import { useLenis } from "@studio-freight/react-lenis";
import { AnimatePresence, motion } from "framer-motion";
import { formatDate, getStrapiMedia } from "@/lib/api-helpers";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ProjectContent = ({ data }: any) => {
  const { width } = useWindowSize();
  const lenis = useLenis();

  let component = useRef<HTMLDivElement>(null);
  let container = useRef<HTMLDivElement>(null);
  let textSectionRef = useRef<HTMLDivElement>([]);

  type Container = {
    container: number;
    items: number;
  };
  const [containerHeights, setContainerHeights] = useState<Container>({
    container: 0,
    items: 0,
  });

  useEffect(() => {
    setContainerHeights({
      container: container.current?.clientHeight as number,
      items: textSectionRef.current?.[0]?.clientHeight as number,
    });
  }, [width]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".pin-spacer", {
        scrollTrigger: {
          trigger: ".pin-spacer",
          start: "top 230px",
          pin: true,
          pinSpacing: true,
          markers: false,
          end: `+=${containerHeights.container - containerHeights.items}`,
        },
      });
    }, component); // <- selector scoping
    return () => ctx.revert();
  }, [containerHeights]);

  const [itemIndex, setItemIndex] = useState(0);
  const snapControl = {
    snapTo: 1,
    duration: 0.2,
    delay: 0,
    ease: "easeInOut",
  };

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const textBoxs = self.selector(".text-section");
      textBoxs.forEach((box, index) => {
        const isLastChild = index === textSectionRef.current?.length - 1;
        gsap.to(box, {
          scrollTrigger: {
            trigger: box,
            start: "top 230px",
            end: `+=${containerHeights.items}`,
            scrub: true,
            markers: false,
            onEnter: (self) => {
              if (isLastChild) return;
              setItemIndex((itemIndex) => itemIndex + self.direction);
            },
            onLeaveBack: (self) => {
              if (isLastChild) return;
              setItemIndex((itemIndex) => itemIndex + self.direction);
            },
            snap: isLastChild || width <= 1024 ? 0 : snapControl,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [lenis]);

  const sortedItems: any = data.experienceItem.sort(
    (a: any, b: any) => new Date(b.DateFinished) - new Date(a.DateFinished),
  );

  return (
    <section id="about" className="mt-20 scroll-m-[2rem] lg:scroll-m-[300px]">
      <h2 className="mb-5 text-center text-slate-50">My Projects</h2>
      <div
        className="mx-auto grid max-w-screen-xl grid-cols-1 items-start gap-4 px-4 lg:grid-cols-12 lg:px-12 2xl:gap-6"
        ref={component}
      >
        <div className="relative col-span-6 hidden w-full lg:block">
          <AnimatePresence>
            <div className="pin-spacer">
              {sortedItems.map((exp, index) => {
                const image = getStrapiMedia(exp.CompanyImage.url);
                return (
                  <div
                    className="sticky-media absolute inset-0 py-4"
                    key={index}
                  >
                    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl pb-0">
                      {index === itemIndex && (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.6 }}
                          exit={{ opacity: 0 }}
                        >
                          <Image
                            src={image}
                            className="h-full"
                            alt="test"
                            width={250}
                            height={250}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="hidden w-full pb-[100%] lg:block"></div>
            </div>
          </AnimatePresence>
        </div>

        <div className="col-span-6" ref={container}>
          {sortedItems.map((exp, index) => {
            const image = getStrapiMedia(exp.CompanyImage.url);
            return (
              <div
                className="text-section group relative"
                ref={textSectionRef}
                key={index}
                ref={(element) => {
                  textSectionRef.current[index] = element;
                }}
              >
                <div className="hidden w-full pb-[100%] lg:block"></div>
                <div className="py-0 lg:absolute lg:inset-0 lg:py-4">
                  <div className="relative mt-6 flex h-full flex-col justify-center overflow-hidden rounded-2xl px-4 py-12 font-[12vw] md:px-12 lg:mt-0 lg:py-4">
                    <div className="mb-2 flex justify-between">
                      <div>
                        <p className="items-end text-sm font-semibold text-foreground/50">{`${formatDate(exp.DateStarted)} - ${exp.IsCurrent ? "Present" : formatDate(exp.DateFinished)} `}</p>
                      </div>
                      <p className="text-sm font-bold">{exp.Position}</p>
                    </div>
                    {exp.Description}
                    <div className="absolute inset-0 opacity-10 lg:hidden">
                      <Image
                        src={image}
                        className="h-full object-cover"
                        alt="test"
                        width={250}
                        height={250}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectContent;
