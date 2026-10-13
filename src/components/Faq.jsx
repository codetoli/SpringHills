import { FAQ } from "../seo/faq";

// The home page's FAQ. <details>/<summary> rather than a JavaScript accordion:
// it works before the app loads, keyboard and screen readers handle it
// natively, and every answer is in the HTML that crawlers and AI assistants
// read, open or closed.
const Faq = () => (
  <section aria-labelledby="faq-heading" className="py-16 px-6 md:px-24 bg-slate-50">
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h2
          id="faq-heading"
          className="text-3xl md:text-4xl font-bold text-[#1C3F82] relative inline-block"
        >
          Frequently Asked Questions
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] bg-[#FF6B34] w-full" />
        </h2>
      </div>
      <p className="text-center text-slate-600 mt-6 mb-10">
        Quick answers about admissions, classes and visiting Spring Hill.
      </p>

      <div className="space-y-3">
        {FAQ.map(({ q, a }) => (
          <details
            key={q}
            className="group bg-white rounded-xl border border-slate-200 open:border-[#1C3F82]/30 open:shadow-sm transition"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-[#1C3F82] [&::-webkit-details-marker]:hidden">
              <h3 className="text-base md:text-lg">{q}</h3>
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none text-[#FF6B34] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-slate-700 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
