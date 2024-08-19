import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/ui/grid-background";
import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";
import StaggeredFade from "@/components/animations/fade-in";
import Spotlight, { SpotlightCard } from "@/components/ui/spotlight-card";
import { getStrapiMedia } from "@/lib/api-helpers";
import ProjectContent from "@/components/shared/ProjectContent";

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
      <div className="h-screen">
        <ProjectContent data={data} />
        <pre>{JSON.stringify(strapiData, null, 2)}</pre>{" "}
      </div>
    </>
  );
}
