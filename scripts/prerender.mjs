// Runs after `vite build`. For every public page it writes a real HTML file:
// the page's own <title>, description, canonical, social tags and structured
// data in <head>, and the page's rendered content in <body>.
//
// WHY: the site is a single-page React app, so the HTML the server sends is an
// empty <div id="root">. Google can run the JavaScript, but most other search
// engines, social previews (Facebook, WhatsApp) and every AI crawler
// (GPTBot, ClaudeBot, PerplexityBot) cannot, and saw an empty page titled
// "springhill". Now each URL answers with its own content.
//
// Also writes sitemap.xml, and app-shell.html: the plain app shell Vercel
// serves for any other address (admin, login, old capitalised links).

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  PAGES,
  SITE,
  absoluteUrl,
  breadcrumbJsonLd,
  schoolJsonLd,
  websiteJsonLd,
} from "../src/seo/site.js";
import { faqJsonLd } from "../src/seo/faq.js";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) throw new Error("index.html has no <!--seo:start--> block");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// `<` escaped so text can never close the <script> element early.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

function headFor(page, { robots = "index, follow", shell = false } = {}) {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(SITE.image);
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(SITE.name)} campus" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    jsonLd(schoolJsonLd()),
    jsonLd(websiteJsonLd()),
  ];
  if (page.path !== "/") tags.push(jsonLd(breadcrumbJsonLd(page)));
  if (page.path === "/" && !shell) tags.push(jsonLd(faqJsonLd()));
  return `<!--seo:start-->\n    ${tags.join("\n    ")}\n    <!--seo:end-->`;
}

const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

let rendered = 0;
for (const page of PAGES) {
  let body = "";
  try {
    body = render(page.path);
    rendered += 1;
  } catch (error) {
    // A page that cannot render in Node still gets its own head tags; the
    // browser renders the content as before. Never fail the deploy over it.
    console.warn(`prerender: ${page.path} rendered head only — ${error.message}`);
  }

  const html = template
    .replace(SEO_BLOCK, headFor(page))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // `/about` → about.html, served at /about by `cleanUrls` in vercel.json.
  const file = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), html);
}

// The shell for every other address: generic tags, nothing indexable.
const shellPage = { path: "/", title: SITE.name, description: SITE.description };
fs.writeFileSync(
  path.join(dist, "app-shell.html"),
  template.replace(SEO_BLOCK, headFor(shellPage, { robots: "noindex, follow", shell: true })),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerender: ${rendered}/${PAGES.length} pages rendered, sitemap.xml written`);
