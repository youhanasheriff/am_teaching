import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // string or function can be provided for brevity
    "/": "/",
    "/about": {
      en: "/about",
      ar: "/about",
    },
    "/services": {
      en: "/services",
      ar: "/services",
    },
    "/blog": {
      en: "/blog",
      ar: "/blog",
    },
    "/contact": {
      en: "/contact",
      ar: "/contact",
    },
    "/booking": {
      en: "/booking",
      ar: "/booking",
    },
    "/privacy": {
      en: "/privacy",
      ar: "/privacy",
    },
    "/terms": {
      en: "/terms",
      ar: "/terms",
    },
    "/testimonials": {
      en: "/testimonials",
      ar: "/testimonials",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
