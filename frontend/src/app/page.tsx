import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";

const homePageQuery = {
  populate: {
    block: {
      populate: true,
    },
  },
};

export default async function Home() {
  const strapiData = await fetchAPI("/home-page", homePageQuery);
  return (
    <pre className="container mx-auto py-6">
      {JSON.stringify(strapiData, null, 2)}
    </pre>
  );
}
