import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const EnrollNow = () => {
  const steps = [
    {
      number: "01",
      title: "Visit Our Campus",
      description:
        "Come to our Nala campus between 9:00 AM and 4:00 PM for a personal tour and to collect the admission kit.",
    },
    {
      number: "02",
      title: "Academic Consultation",
      description:
        "Meet with our counselors to discuss the best grade placement and holistic learning path for your child.",
    },
    {
      number: "03",
      title: "Entrance Assessment",
      description:
        "Students participate in a friendly interaction session to help us understand their current academic level.",
    },
    {
      number: "04",
      title: "Secure Admission",
      description:
        "Complete the paperwork at the administration desk and pay the fees to confirm your child's seat.",
    },
  ];

  return (
    <div className="font-['Poppins'] overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1C3F82] pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
          Enroll Your Child <span className="text-[#FF6B34]">Today</span>
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
          Admissions are handled in person at our Nala campus to ensure personal
          attention for every family. Follow the process below to join the SHEBS
          family.
        </p>
      </section>

      {/* --- IN-PERSON ADMISSION PROCESS --- */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C3F82] relative inline-block uppercase">
              In-Person Admission Process
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] bg-[#FF6B34] w-full animate-[underline_1.2s_ease-out]" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="text-6xl font-black text-gray-200 group-hover:text-[#FF6B34]/10 absolute -right-2 -top-2 transition-colors">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-[#1C3F82] mb-4 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT TO BRING WITH YOU --- */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Document Checklist */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-[#1C3F82] mb-6 uppercase">
              What to Bring With You
            </h2>
            <p className="text-gray-600 mb-8 italic">
              Please bring the following original documents (along with one set
              of photocopies) to make your visit efficient:
            </p>

            <ul className="space-y-4">
              {[
                "Original Transfer Certificate (TC)",
                "Last Academic Grade Sheet / Marksheet",
                "Character Certificate from Previous School",
                "Two Recent Passport-Sized Photographs",
                "Photocopy of Birth Certificate",
              ].map((doc, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-[#1C3F82] font-medium bg-white p-4 rounded-xl shadow-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0">
                    ✓
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Help Card */}
          <div className="w-full lg:w-1/2 bg-[#1C3F82] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FF6B34] rounded-full opacity-20"></div>

            <h3 className="text-2xl font-bold mb-4">Plan Your Visit</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              The admission desk is open Sunday to Friday, 9:00 AM to 4:00 PM.
              No appointment is necessary, but you may call ahead to ensure a
              counselor is available.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[#FF6B34]">
                  📍
                </div>
                <Link
                  to="https://maps.app.goo.gl/sRngFPS49wh7Z9fg7 "
                  target="_blank"
                  className="underline"
                >
                  <span>Nala, Kavrepalanchok, Nepal</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-[#FF6B34]">
                  📞
                </div>
                <span>+977-9860865441 / 9841103044</span>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="tel:+977984-1103044"
                className="inline-block bg-[#FF6B34] text-white px-8 py-4 rounded-full font-bold hover:bg-[#e55a28] transition-all shadow-lg transform hover:-translate-y-1"
              >
                Call Admission Office
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-20 text-center bg-white border-t border-gray-100">
        <h2 className="text-2xl font-bold text-[#1C3F82] mb-4">
          Have questions before you visit?
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Our team is happy to answer any queries regarding fees,
          transportation, or the curriculum.
        </p>
        <button className="border-2 border-[#1C3F82] text-[#1C3F82] px-10 py-3 rounded-full font-bold hover:bg-[#1C3F82] hover:text-white transition-all">
          <Link to="/contact">Contact Us</Link>
        </button>
      </section>
    </div>
  );
};

export default EnrollNow;
