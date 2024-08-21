import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/ui/grid-background";
import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";
import StaggeredFade from "@/components/animations/fade-in";
import Spotlight, { SpotlightCard } from "@/components/ui/spotlight-card";
import { getStrapiMedia } from "@/lib/api-helpers";
import ProjectContent from "@/components/shared/ProjectContent";
import { ContactForm } from "@/components/shared/ContactForm";
import Footer from "@/components/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Image1 from "../../public/Image1.png";

const homePageQuery = {
  populate: {
    block: {
      populate: true,
    },
    navigationItem: {
      populate: true,
    },
    Contact: {
      populate: true,
    },
    Experience: {
      populate: true,
    },
    experienceItem: {
      populate: {
        CompanyImage: {
          populate: true,
        },
        TechStacks: {
          populate: true,
        },
      },
    },
  },
};

export default async function Home() {
  const strapiData = await fetchAPI("/home-page", homePageQuery);
  const data = flattenAttributes(strapiData);
  const { Heading, SubHeading, Description } = data;

  return (
    <>
      <section
        id="home"
        className="relative -mt-[var(--header-height)] flex items-center justify-center"
      >
        <div className="h-screen w-screen overflow-hidden bg-background">
          <BackgroundGrid />
        </div>

        <div className="absolute flex flex-col items-center justify-center text-foreground">
          <div className="text-[90px] font-bold leading-tight tracking-tighter">
            {data && <StaggeredFade sentence={Heading} />}
          </div>
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight">
            {SubHeading}
          </h2>
          <p className="text-[20px] text-foreground">{Description}</p>
        </div>
      </section>
      {/* <section id="about" className="h-screen">
        <Spotlight className="mx-auto mt-2 grid max-w-7xl grid-cols-3 gap-4">
          {data.block.map((item: any) => (
            <SpotlightCard
              key={item.id}
              className="h-[500px] rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              {item.Heading}
            </SpotlightCard>
          ))}
        </Spotlight>
      </section> */}
      <div className="min-h-screen">
        <ProjectContent data={data} />
        <section
          id="contact"
          className="mx-auto flex max-w-3xl flex-1 flex-col gap-x-4 px-10"
        >
          <div className="mb-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-foreground">
              {data.Contact.Title}
            </h1>
            <p>{data.Contact.Description}</p>
          </div>
          <ContactForm data={data} />
        </section>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre>{" "} */}

        <div className="mx-auto flex w-full max-w-7xl gap-6">
          <div className="flex w-full flex-col gap-2">
            <Card className="h-[400px]">
              <CardContent className="relative h-full overflow-hidden p-4">
                <div className="">
                  <h1 className="text-xl font-bold">Item 1</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium, adipisci. Explicabo, error maxime! Maiores esse
                    sapiente fugit natus atque consectetur, et, dolore omnis
                    suscipit tenetur rerum, numquam aspernatur possimus soluta!
                  </p>
                  <Image
                    src={Image1}
                    alt="test"
                    width={1920}
                    height={1080}
                    className="absolute bottom-0 left-0 w-full scale-95 object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="h-[200px]">
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="flex w-full flex-col-reverse gap-2">
            <Card className="h-[400px]">
              <CardContent></CardContent>
            </Card>
            <Card className="h-[200px]">
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
        <footer className="footer mt-40 flex h-[400px] items-center justify-center border-t-2 border-t-card bg-background">
          Copyright 2024 Aaron Jay
        </footer>
      </div>
    </>
  );
}
