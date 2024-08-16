import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/ui/grid-background";
import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";
import StaggeredFade from "@/components/animations/fade-in";

const homePageQuery = {
  populate: {
    block: {
      populate: true,
    },
  },
};

export default async function Home() {
  const strapiData = await fetchAPI("/home-page", homePageQuery);
  const data = flattenAttributes(strapiData);

  const { Heading, SubHeading, Description } = data;
  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="h-screen w-screen overflow-hidden bg-[#0c0104]">
          <BackgroundGrid />
        </div>
        <div className="absolute flex flex-col items-center justify-center text-green-500">
          <div className="text-[90px] font-bold leading-tight tracking-tighter">
            {data && <StaggeredFade sentence={Heading} />}
          </div>
          <h2 className="text-[40px] font-semibold leading-tight tracking-tight">
            {SubHeading}
          </h2>
          <p className="text-[20px] text-green-500">{Description}</p>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
