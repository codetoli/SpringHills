import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import RouteSeo from "./components/RouteSeo";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Footer from "./pages/Footer";
import LatestNews from "./pages/LatestNews";
import Gallery from "./pages/Gallery";
import Notice from "./pages/Notice";
import Program from "./pages/Program";
import Admin from "./pages/Admin";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import AdmissionPopup from "./components/AdmissionPopup";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.toLowerCase().startsWith("/admin");

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 800); // slight delay

    return () => clearTimeout(timer);
  }, []);

  // Route paths are lowercase, and the router matches them case-insensitively,
  // so the old /About-style links keep working while every link, the sitemap
  // and each canonical tag use one address per page.
  return (
    <>
      <ScrollToTop />
      <RouteSeo />

      {!isAdminPage && <Navbar />}

      {/* Rendered once: it used to be rendered twice, stacking two popups. */}
      {showPopup && !isAdminPage && <AdmissionPopup onClose={() => setShowPopup(false)} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/latest" element={<LatestNews />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/program" element={<Program />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;
