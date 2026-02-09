import React from "react";
import Assets from "../assets/assets";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-[#1C3F82] text-white rounded-t-xl px-6 pt-20 pb-6">
      {/* Circle Logo */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white border-[5px] border-[#FF6B34] shadow-xl flex items-center justify-center z-10">
        <img
          src={Assets.logo}
          alt="Spring Hill School"
          className="w-full h-full rounded-full object-cover p-1"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
        {/* Find Us */}
        <div>
          <h3 className="text-xl text-[#FF6B34] mb-4 font-bold uppercase tracking-tight">
            Find Us
          </h3>
          <div className="text-sm space-y-2 text-white/90">
            <p className="font-semibold text-white">
              Spring Hill English Boarding School
            </p>

            {/* Clickable Address (Opens Google Maps) */}
            <a
              href="https://maps.google.com/?q=Spring+Hill+English+Boarding+School+Banepa"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#FF6B34] transition-colors"
            >
              📍 Banepa-4, Kavre, Nepal
            </a>

            {/* Clickable Phone */}
            <a
              href="tel:+9779851123372"
              className="block hover:text-[#FF6B34] transition-colors"
            >
              📞 +977 985-1123372
            </a>

            {/* Clickable Email */}
            <a
              href="mailto:springhill607@gmail.com"
              className="block hover:text-[#FF6B34] transition-colors"
            >
              ✉️ springhill607@gmail.com
            </a>
          </div>
        </div>

        {/* Updated Quick Links */}
        <div>
          <h3 className="text-xl text-[#FF6B34] mb-4 font-bold uppercase tracking-tight">
            Quick Links
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/90">
            <li>
              <Link to="/" className="hover:text-[#FF6B34] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="hover:text-[#FF6B34] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/Program"
                className="hover:text-[#FF6B34] transition-colors"
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                to="/Gallery"
                className="hover:text-[#FF6B34] transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/Notice"
                className="hover:text-[#FF6B34] transition-colors"
              >
                Notice
              </Link>
            </li>
            <li>
              <Link
                to="/Enroll"
                className="hover:text-[#FF6B34] transition-colors"
              >
                Enroll Now
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="hover:text-[#FF6B34] transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App (Kept exactly as requested) */}
        <div>
          <h3 className="text-xl text-[#FF6B34] mb-4 font-bold uppercase tracking-tight">
            Download App
          </h3>
          <p className="mb-3 text-sm">Get our mobile application</p>

          <div className="flex flex-col gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.qubexedu.shebs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Assets.PlayStore}
                alt="App Store"
                className="max-w-[160px] hover:opacity-80 transition-opacity"
              />
            </a>

            <a
              href="https://apps.apple.com/np/app/spring-hill-e-b-s/id1565349229"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Assets.AppStore}
                alt="Google Play"
                className="max-w-[160px] hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl text-[#FF6B34] mb-4 font-bold uppercase tracking-tight">
            Follow Us
          </h3>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://www.facebook.com/SHEBSBanepa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877f2] transition-transform hover:scale-110"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.tiktok.com/@springhillschool3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-transform hover:scale-110"
            >
              <FaTiktok />
            </a>

            <a
              href="https://wa.me/9779841103044"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25d366] transition-transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-white/40 border-t border-white/10 pt-6 mt-10 uppercase tracking-widest">
        © 2026 Spring Hill English Boarding School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
