import { Button } from "@/components/ui/button";
import Image from "next/image";
import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    block: {
      populate: true
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.dir(strapiData, { depth: null });
  const { Heading, SubHeading, Description } = strapiData.data.attributes;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{Heading}</h1>
      <p className="text-xl mt-4">{SubHeading}</p>
      <p className="text-sm">{Description}</p>
    </main>
  );
}