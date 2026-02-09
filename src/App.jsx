import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
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

// ... (all your other imports)

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Enroll" element={<Enroll />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Latest" element={<LatestNews />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Notice" element={<Notice />} />
        <Route path="/Program" element={<Program />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
};

// --- CHECK THIS LINE BELOW ---
export default App;
