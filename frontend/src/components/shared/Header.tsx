import { fetchAPI } from "@/lib/fetch-api";
import { flattenAttributes } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const homePageQuery = {
  populate: {
    navigationItem: {
      populate: true,
    },
  },
};

async function Header() {
  const res = await fetchAPI("/home-page", homePageQuery);
  const data = flattenAttributes(res);
  return (
    <nav className="sticky top-0 z-10 flex h-[var(--header-height)] items-center justify-center">
      <div className="flex gap-x-4 rounded-md border border-card bg-card bg-opacity-50 p-4 shadow-md">
        {data?.navigationItem?.map((link: any) => (
          <a key={link.id} href={link.Url}>
            {link.Text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Header;
