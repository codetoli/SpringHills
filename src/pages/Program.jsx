import React from "react";
import { Assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import Banner from "../components/Banner"; // Reuse your existing Banner component
import { GraduationCap, BookOpen, Briefcase, ChevronRight } from "lucide-react";

const Faculty = () => {
  const cards = [
    {
      img: Assets.Playgroup,
      title: "Pre-School Education",
      highlight: "Foundational",
      icon: <GraduationCap className="text-[#FF6B34]" size={24} />,
      desc: "Fostering early childhood development, foundational learning, and creative exploration in a nurturing environment.",
    },
    {
      img: Assets.LowerSchool,
      title: "School Level Studies",
      highlight: "Academic",
      icon: <BookOpen className="text-[#FF6B34]" size={24} />,
      desc: "Providing comprehensive secondary education, promoting academic excellence, and holistic growth for future leaders.",
    },
    {
      img: Assets.HighSchool,
      title: "+2 Management",
      highlight: "Professional",
      icon: <Briefcase className="text-[#FF6B34]" size={24} />,
      desc: "Preparing students for higher education in management and business administration with real-world practical skills.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Reuse your Banner for consistency */}
      <Banner
        title="Our"
        highlightText="Faculties"
        breadcrumb="Faculty"
        subtitle="Specialized departments dedicated to excellence in every stage of education."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="space-y-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 group ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  {/* Decorative Background Blob */}
                  <div className="absolute -inset-4 bg-[#1C3F82]/5 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />

                  <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3]">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F82]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white shadow-md rounded-2xl">
                    {card.icon}
                  </div>
                  <span className="text-xs font-black text-[#FF6B34] uppercase tracking-[0.2em]">
                    {card.highlight}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-[#1C3F82] leading-tight">
                  {card.title}
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {card.desc}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-8 py-4 bg-[#1C3F82] text-white rounded-2xl font-bold hover:bg-[#FF6B34] transition-all shadow-lg hover:-translate-y-1"
                  >
                    Enroll Now <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faculty;
