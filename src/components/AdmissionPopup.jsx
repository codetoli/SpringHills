import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import admissionBanner from "../assets/Gallery/Admission.jpg";

const AdmissionPopup = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable page scroll
    document.body.style.overflow = "hidden";

    // Auto close after 5 sec
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Blur background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Popup */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden animate-[popup_.35s_ease]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20
          w-9 h-9 rounded-full bg-white shadow-md
          hover:scale-110 transition"
        >
          ✕
        </button>

        <div className="w-[320px] sm:w-[360px] max-h-[70vh] aspect-[3/5]">
          <img
            src={admissionBanner}
            alt="Admission Open"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CTA */}
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-[#1C3F82] mb-2">
            Admissions Open
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Apply now for new admissions.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => handleNavigate("/Enroll")}
              className="bg-[#FF6B34] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#e55a28]"
            >
              Enroll Now
            </button>

            <button
              onClick={() => handleNavigate("/Contact")}
              className="border-2 border-[#1C3F82] text-[#1C3F82]
              px-5 py-2 rounded-full font-semibold
              hover:bg-[#1C3F82] hover:text-white"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPopup;
