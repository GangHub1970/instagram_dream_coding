"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import ColorButton from "./ui/ColorButton";
import Avatar from "./Avatar";

const menus = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: "Search users",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: "New post",
  },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-300 bg-white z-50">
      <Link href="/" className="text-2xl font-bold" aria-label="home">
        <h1>Instagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          {menus.map(({ href, title, clickedIcon, icon }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathname === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {session && (
            <li>
              <Link href={`/user/${session?.user.username}`}>
                <Avatar imageUrl={session?.user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Log out" onClick={signOut} />
            ) : (
              <ColorButton text="Sign in" onClick={signIn} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
