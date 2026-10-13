// One source of truth for everything search engines, answer engines and AI
// assistants read about the school: page titles and descriptions, the
// School structured data, the FAQ and the sitemap.
//
// It is plain JavaScript with no JSX and no browser APIs, because the build
// step (scripts/prerender.mjs) imports it in Node as well as the app in the
// browser. Change a fact here and every surface follows.

export const SITE = {
  url: "https://www.springhill.edu.np",
  name: "Spring Hill English Boarding School",
  shortName: "SHEBS",
  alternateNames: ["SHEBS", "Spring Hill School", "Spring Hill E.B.S."],
  foundingYear: "1988",
  foundingYearBs: "2045 B.S.",
  description:
    "Spring Hill English Boarding School (SHEBS) in Nala, Banepa, Kavrepalanchok, Nepal has provided quality education from Pre-School to Class 12 since 1988.",
  logo: "/logo.png",
  image: "/og-image.jpg",
  email: "springhill607@gmail.com",
  // The two numbers the Contact and Enroll pages agree on.
  phones: ["+977-9841103044", "+977-9860865441"],
  whatsapp: "https://wa.me/9779841103044",
  address: {
    streetAddress: "Nala, Banepa-4",
    addressLocality: "Banepa",
    addressRegion: "Kavrepalanchok",
    addressCountry: "NP",
  },
  // From the Google Maps embed on the Contact page.
  geo: { latitude: 27.65430084631961, longitude: 85.50126501574405 },
  mapUrl: "https://maps.google.com/?q=Spring+Hill+English+Boarding+School+Banepa",
  hours: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "16:00" },
  principal: "Sundar Budathoki",
  sameAs: [
    "https://www.facebook.com/SHEBSBanepa",
    "https://www.tiktok.com/@springhillschool3",
    "https://apps.apple.com/np/app/spring-hill-e-b-s/id1565349229",
    "https://play.google.com/store/apps/details?id=com.qubexedu.shebs",
  ],
};

// Every public page, lowercase. Titles stay under ~60 characters and
// descriptions under ~160 so search results do not cut them off.
export const PAGES = [
  {
    path: "/",
    name: "Home",
    title: "Spring Hill English Boarding School, Banepa | Since 1988",
    description:
      "Spring Hill English Boarding School (SHEBS) in Nala, Banepa, Kavre offers Pre-School to Class 12 education. Quality education since 1988.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    name: "About us",
    title: "About Us | Spring Hill English Boarding School",
    description:
      "Established in 2045 B.S. (1988), Spring Hill English Boarding School in Banepa-4, Kavre offers Pre-School to Class 12, with labs, a library and sports.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/program",
    name: "Programs",
    title: "Programs: Pre-School to +2 | Spring Hill School, Banepa",
    description:
      "Pre-School (Montessori), Basic Level (Grades 1–5), Secondary (Grades 6–10) and +2 programmes at Spring Hill English Boarding School, Nala, Banepa.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/enroll",
    name: "Admissions",
    title: "Admissions & Enrolment | Spring Hill School, Banepa",
    description:
      "How to enrol at Spring Hill English Boarding School: visit the Nala campus Sunday–Friday, 9 AM–4 PM, meet a counsellor, take a short assessment and bring your documents.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    name: "Contact",
    title: "Contact Us | Spring Hill English Boarding School, Banepa",
    description:
      "Call 9841103044 or 9860865441, email springhill607@gmail.com, or visit us at Nala, Banepa-4, Kavre. Office open Sunday to Friday, 9 AM to 4 PM.",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/gallery",
    name: "Gallery",
    title: "Photo Gallery | Spring Hill English Boarding School",
    description:
      "Photos of campus life, events, sports and celebrations at Spring Hill English Boarding School in Nala, Banepa, Kavrepalanchok.",
    priority: "0.6",
    changefreq: "weekly",
  },
  {
    path: "/notice",
    name: "Notices",
    title: "Notices & Announcements | Spring Hill School, Banepa",
    description:
      "Official notices, circulars and announcements from Spring Hill English Boarding School, Banepa. View or download the latest updates.",
    priority: "0.7",
    changefreq: "daily",
  },
];

// Reachable, but never in search results.
export const NOINDEX_PREFIXES = ["/admin", "/login", "/latest"];

export function pageFor(pathname) {
  const path = (pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  return PAGES.find((page) => page.path === path) || null;
}

export function isNoindex(pathname) {
  const path = (pathname || "/").toLowerCase();
  return NOINDEX_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`)) || !pageFor(path);
}

export const absoluteUrl = (path) => `${SITE.url}${path === "/" ? "/" : path}`;

// The School entity, sent on every page. Answer engines and AI assistants use
// this to state the school's name, place, phone and hours with confidence.
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${SITE.url}/#school`,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: `${SITE.url}/`,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.image),
    description: SITE.description,
    foundingDate: SITE.foundingYear,
    email: SITE.email,
    telephone: SITE.phones,
    address: { "@type": "PostalAddress", ...SITE.address },
    geo: { "@type": "GeoCoordinates", ...SITE.geo },
    hasMap: SITE.mapUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    employee: { "@type": "Person", name: SITE.principal, jobTitle: "Principal" },
    sameAs: SITE.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: SITE.shortName,
    publisher: { "@id": `${SITE.url}/#school` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(page) {
  const items = [{ name: "Home", path: "/" }];
  if (page.path !== "/") items.push({ name: page.name, path: page.path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
