"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { usePathname } from "next/navigation";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Project
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              key={link.id}
              href={link.url}
              className={isActive ? styles.active : styles.link}
            >
              {link.title}
            </Link>
          );
        })}
        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
