import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, absoluteUrl, isNoindex, pageFor } from "../seo/site";

// Keeps <head> right as the visitor moves between pages in the browser.
//
// The first page load already has the right tags: the build pre-renders them
// into each page's HTML (scripts/prerender.mjs). This updates those same tags
// in place on client-side navigation, rather than adding new ones, so a page
// never carries two titles or two canonicals.
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Pages that exist but are not for search: they keep a real name in the tab.
const PRIVATE_TITLES = { "/login": "Staff Login", "/admin": "Admin", "/latest": "Latest News" };

const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    const privateTitle = PRIVATE_TITLES[pathname.toLowerCase().replace(/\/+$/, "")];
    const title = page
      ? page.title
      : `${privateTitle || "Page not found"} | ${SITE.name}`;
    const description = page ? page.description : SITE.description;
    const url = absoluteUrl(page ? page.path : "/");

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", isNoindex(pathname) ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setCanonical(url);
  }, [pathname]);

  return null;
};

export default RouteSeo;
