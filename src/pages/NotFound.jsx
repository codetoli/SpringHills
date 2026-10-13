import { Link } from "react-router-dom";

// Any address the site does not have. RouteSeo marks it noindex, so a
// mistyped link never shows up in search results as a page of its own.
const NotFound = () => (
  <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
    <h1 className="text-4xl md:text-5xl font-bold text-[#1C3F82] mb-4">Page not found</h1>
    <p className="text-slate-600 mb-8 max-w-md">
      The page you are looking for does not exist or has moved.
    </p>
    <Link
      to="/"
      className="rounded-full bg-[#FF6B34] px-6 py-3 font-semibold text-white hover:bg-[#e85a25] transition"
    >
      Back to home
    </Link>
  </section>
);

export default NotFound;
