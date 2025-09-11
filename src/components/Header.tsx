"use client";

import CardNav from './CardNav';

// Updated data structure for CardNav
const navItems = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "The Fest", ariaLabel: "About The Fest", href: "/about" },
      { label: "Our Team", ariaLabel: "About Our Team", href: "/team" }
    ]
  },
  {
    label: "Events",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Competitions", ariaLabel: "View Competitions", href: "/events/competitions" },
      { label: "Workshops", ariaLabel: "View Workshops", href: "/events/workshops" },
      { label: "Shows", ariaLabel: "View Shows", href: "/events/shows" }
    ]
  },
  {
    label: "Connect",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Instagram", ariaLabel: "Instagram", href: "https://instagram.com" },
      { label: "YouTube", ariaLabel: "YouTube", href: "https://youtube.com" },
      { label: "Contact Us", ariaLabel: "Contact Us", href: "/contact" }
    ]
  }
];

export default function Header() {
  return (
    // The header is a container for the nav
    // It doesn't need any extra styling
    <header>
      <CardNav
        logo="/next.svg" // Using an existing public asset
        logoAlt="Dimensions Fest Logo"
        items={navItems}
        baseColor="#0a0a0a" // Matches your site's background
        menuColor="#fff"   // Color of the hamburger icon lines
        buttonBgColor="#494949ff"
        buttonTextColor="#000000ff"
        ease="power3.out"
      />
    </header>
  );
}