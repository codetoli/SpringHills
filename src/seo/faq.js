// Questions parents actually ask, answered in one or two plain sentences each.
//
// Shown on the home page (components/Faq.jsx) and sent as FAQPage structured
// data on the same page (scripts/prerender.mjs), so what a search engine or AI
// assistant quotes is exactly what a parent can read. Every answer restates a
// fact the site already publishes elsewhere; nothing here is new.

import { SITE } from "./site.js";

export const FAQ = [
  {
    q: "Where is Spring Hill English Boarding School located?",
    a: "Spring Hill English Boarding School is at Nala, Banepa-4, in Kavrepalanchok (Kavre) district, Nepal.",
  },
  {
    q: "When was Spring Hill English Boarding School established?",
    a: "The school was established in 2045 B.S. (1988 AD) and has provided education for more than 35 years.",
  },
  {
    q: "Which classes does Spring Hill English Boarding School offer?",
    a: "Classes run from Play Group and Pre-School (Montessori method) to Class 12: Pre-School, Basic Level (Grades 1–5), Secondary (Grades 6–10) and +2 (Grades 11–12).",
  },
  {
    q: "How do I apply for admission at Spring Hill School?",
    a: "Admissions are handled in person at the Nala campus. Visit Sunday to Friday between 9 AM and 4 PM to collect the admission kit, meet a counsellor, take a short friendly entrance assessment, then complete the paperwork and pay the fees. No appointment is needed.",
  },
  {
    q: "What documents are required for admission?",
    a: "Bring the originals and one set of photocopies of: the Transfer Certificate (TC), the last grade sheet or marksheet, a character certificate from the previous school, two recent passport-sized photographs and a photocopy of the birth certificate.",
  },
  {
    q: "What are the school office hours?",
    a: "The office and admission desk are open Sunday to Friday, 9:00 AM to 4:00 PM.",
  },
  {
    q: "How can I contact Spring Hill English Boarding School?",
    a: `Call ${SITE.phones.join(" or ")}, message on WhatsApp at +977-9841103044, or email ${SITE.email}.`,
  },
  {
    q: "What facilities does the school have?",
    a: "The campus has classrooms, science laboratories, computer centres, a library with quiet study zones, and sports and recreational spaces.",
  },
  {
    q: "Who is the principal of Spring Hill English Boarding School?",
    a: `The principal is ${SITE.principal}.`,
  },
  {
    q: "Does Spring Hill School have a mobile app?",
    a: "Yes. The Spring Hill E.B.S. app is available on the App Store and Google Play.",
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
