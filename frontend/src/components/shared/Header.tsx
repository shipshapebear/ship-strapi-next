import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const homePageQuery = {
  populate: {
    navigation: {
      populate: true,
    },
  },
};

async function Header() {
  const res = await fetchAPI("/home-page", homePageQuery);
  const data = flattenAttributes(res);
  return (
    <nav className="sticky top-0">
      <div className="mx-auto flex h-[40px] gap-x-4">
        {data?.navigation?.map((link: any) => (
          <Link key={link.id} href={link.Url}>
            {link.Text}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Header;
