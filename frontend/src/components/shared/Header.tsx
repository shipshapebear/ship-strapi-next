"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Header({ data }: any) {
  const [hash, setHash] = useState("/");
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    // Get the initial hash on component mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [router]);

  return (
    <nav className="sticky top-0 z-10 flex h-[var(--header-height)] items-center justify-center">
      <ul className="flex gap-x-4 rounded-md border border-card bg-card bg-opacity-50 p-1.5 shadow-md">
        {data?.navigationItem?.map((link: any) => (
          <li
            className={
              "text-foregroun relative flex items-center justify-center px-2 py-1"
            }
            key={link.id}
          >
            <a href={link.Url} className="z-10">
              {link.Text}
            </a>
            {hash == link.Url && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 top-0 z-[0] h-full w-full rounded-sm bg-muted"
                layoutId="underline"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Header;
