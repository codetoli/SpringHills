import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link
import Assets from "../assets/assets.js";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isSticky ? "glass compact" : ""}`}>
        <style>{`
          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1rem;
            background: white;
            border-bottom: 1px solid #e5e5e5;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s ease;
          }

          .navbar.glass {
            background: transparent;
            backdrop-filter: none;
            box-shadow: none;
            border-bottom: none;
          }

          .navbar.compact {
            justify-content: center;
            padding: 0.8rem 1rem;
          }

          .logo-section {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .logo-box {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .logo-img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
          }

          .logo-text h1 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #000;
            margin: 0;
            line-height: 1.3;
          }

          .logo-text p {
            font-size: 0.85rem;
            color: #666;
            margin: 0;
            line-height: 1.2;
          }

          .navbar.compact .logo-section {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            left: -9999px;
          }

          .nav-links-container {
            transition: all 0.3s ease;
          }

          .nav-links-container.sticky {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
            padding: 0.8rem 2.5rem;
            border-radius: 50px;
          }

          .nav-links {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-links a {
            color: #333;
            text-decoration: none;
            font-weight: 500;
            position: relative;
            transition: color 0.3s ease;
          }

          .nav-links a:hover {
            color: #1C3F82;
          }

          .enroll-btn-wrapper {
            transition: all 0.3s ease;
          }

          .navbar.compact .enroll-btn-wrapper {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            right: -9999px;
          }

          .enroll-btn {
            background: #f54900;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            font-size: 1.3rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .enroll-arrow {
            display: inline-block;
            transition: transform 0.3s ease;
          }

          .enroll-btn:hover .enroll-arrow {
            transform: rotate(-45deg);
          }

          .hamburger {
            display: none;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 24px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
            overflow: hidden;
          }

          .hamburger span {
            position: absolute;
            left: 0;
            width: 100%;
            height: 3px;
            background: #333;
            border-radius: 10px;
            transition: all 0.3s ease;
            transform-origin: center;
          }

          /* default state */
          .hamburger span:nth-child(1) {
            top: 4px;
          }

          .hamburger span:nth-child(2) {
            top: 14px;
          }

          /* OPEN STATE — force both to center and rotate into X */
          .hamburger.open span:nth-child(1) {
            top: 10.5px;
            transform: translateY(-50%) rotate(45deg);
          }

          .hamburger.open span:nth-child(2) {
            top: 10.5px;
            transform: translateY(-50%) rotate(-45deg);
          }

          /* Mobile Menu */
          .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            z-index: 999;
            padding: 5rem 2rem 2rem;
            overflow-y: auto;
          }

          .mobile-menu.open {
            right: 0;
          }

          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
          }

          .mobile-menu-overlay.open {
            opacity: 1;
            visibility: visible;
          }

          .mobile-nav-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .mobile-nav-links li {
            margin-bottom: 1.5rem;
          }

          .mobile-nav-links a {
            color: #333;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 500;
            display: block;
            padding: 0.5rem 0;
            transition: color 0.3s ease;
          }

          .mobile-nav-links a:hover {
            color: #1C3F82;
          }

          .mobile-enroll-btn {
            background: #f54900;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            border: none;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
            width: 100%;
            transition: all 0.3s ease;
          }

          .mobile-enroll-btn:hover {
            background: #e55a28;
          }

          .mobile-enroll-arrow {
            display: inline-block;
            transition: transform 0.3s ease;
          }

          .mobile-enroll-btn:hover .mobile-enroll-arrow {
            transform: rotate(-45deg);
          }

          /* Hide hamburger in compact mode when transparent */
          .navbar.compact .hamburger {
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
          }

          /* Responsive Design */
          @media (max-width: 1023px) {
            .nav-links-container,
            .enroll-btn-wrapper {
              display: none !important;
            }

            .hamburger {
              display: flex !important;
              flex-direction: column;
              justify-content: center;
            }

            .navbar.compact .logo-section {
              opacity: 1 !important;
              pointer-events: auto !important;
              position: static !important;
              left: auto !important;
            }

            .navbar.compact {
              justify-content: space-between !important;
            }

            /* Show hamburger on mobile even in compact mode */
            .navbar.compact .hamburger {
              display: flex !important;
              position: absolute !important;
              right: 1rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              opacity: 1 !important;
              pointer-events: auto !important;
              visibility: visible !important;
            }
          }

          @media (min-width: 1024px) {
            .hamburger,
            .mobile-menu,
            .mobile-menu-overlay {
              display: none !important;
            }
          }
        `}</style>

        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-box">
            <img
              src={Assets.logo}
              alt="Spring Hill Logo"
              className="logo-img"
            />
          </div>

          <div className="logo-text">
            <h1>Spring Hill</h1>
            <p>English Boarding School</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`nav-links-container ${isSticky ? "sticky" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/Gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/notice">Notice</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Enroll Button */}
        <div className="enroll-btn-wrapper">
          <Link to="/Enroll">
            <button className="enroll-btn">
              <span className="enroll-arrow">→</span>
            </button>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/Gallery" onClick={closeMobileMenu}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/notice" onClick={closeMobileMenu}>
              Notice
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
        </ul>

        <button className="mobile-enroll-btn" onClick={closeMobileMenu}>
          <Link to="/Enroll" className="mobile-enroll-link">
            <span>Enroll Now</span>
            <span className="mobile-enroll-arrow">→</span>
          </Link>
        </button>
      </div>
    </>
  );
}

export default Navbar;
