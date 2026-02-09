import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import campus1 from "../assets/campus1.jpeg";
import campus2 from "../assets/campus2.jpeg";
import campus3 from "../assets/campus3.jpeg";
import campus4 from "../assets/campus4.jpeg";
import Assets from "../assets/assets";
import Notice from "./LatestNews";
import messagefromprincipals from "../components/messagefromprincipals";

function HomePage() {
  // Why Choose SHEBS carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const whyChooseData = [
    {
      title: "Academic Excellence",
      description:
        "Comprehensive curriculum from pre-K through 12th grade with experienced faculty dedicated to student success and holistic development.",
      image: campus1,
    },
    {
      title: "Modern Facilities",
      description:
        "State-of-the-art infrastructure with fully equipped classrooms, science labs, computer centers, and modern recreational spaces.",
      image: campus2,
    },
    {
      title: "Holistic Development",
      description:
        "Focus on intellectual, ethical, and interpersonal growth to shape well-rounded individuals ready for global challenges.",
      image: campus3,
    },
    {
      title: "35+ Years Legacy",
      description:
        "Proven track record since 1988 of producing successful alumni who contribute positively to society and excel globally.",
      image: campus4,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % whyChooseData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + whyChooseData.length) % whyChooseData.length,
    );
  };

  return (
    <div className="font-['Poppins'] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-24 pt-32 pb-16 overflow-hidden">
        {/* Background Image */}
        <img
          src={Assets.homebg}
          alt="School campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/20 via-[#1E3A8A]/40 to-[#0F172A]/90" />
        {/* Content */}
        <div className="relative z-10 max-w-2xl text-left text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-[#FDB913]">Quality Education</span> Since 1988
          </h1>

          <p className="text-white/95 text-base md:text-lg leading-relaxed mb-10 drop-shadow-md">
            Located at Nala, we have been providing quality education and
            skillful knowledge to develop the best manpower. Our mission is to
            develop the intellectual, ethical, and interpersonal foundations
            students need to be constructive contributors to the world.
          </p>

          <div className="inline-block bg-[#FF6B34] px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base shadow-lg hover:bg-[#e55a28] transition-colors cursor-pointer mb-10">
            <Link to="/Program">EXPLORE Programs</Link>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-10 mb-10">
            <div>
              <span className="block text-3xl md:text-4xl font-extrabold text-[#FF6B34]">
                1500+
              </span>
              <span className="text-white/90 text-sm md:text-base">
                Students
              </span>
            </div>

            <div>
              <span className="block text-3xl md:text-4xl font-extrabold text-[#FF6B34]">
                PG – 12
              </span>
              <span className="text-white/90 text-sm md:text-base">
                Classes
              </span>
            </div>

            <div>
              <span className="block text-3xl md:text-4xl font-extrabold text-[#FF6B34]">
                35+
              </span>
              <span className="text-white/90 text-sm md:text-base">Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SHEBS Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C3F82] relative inline-block">
              Why Choose SHEBS
              <span
                className="absolute left-1/2 -translate-x-1/2 -bottom-3
                 h-[3px] bg-[#FF6B34]
                 w-full animate-[underline_1.2s_ease-out]"
              />
            </h2>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-center">
            {/* Content - Left (Bottom on mobile) */}
            <div className="flex-1 text-center md:text-left">
              <div
                key={currentSlide}
                className="transition-all duration-500 min-h-[160px]"
              >
                <h3 className="text-2xl md:text-3xl text-[#1C3F82] mb-4 font-bold">
                  {whyChooseData[currentSlide].title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                  {whyChooseData[currentSlide].description}
                </p>
              </div>

              {/* Arrow buttons */}
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-[#FF6B34] text-white flex items-center justify-center text-2xl hover:bg-[#e55a28] hover:scale-110 transition-all shadow-md"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-[#FF6B34] text-white flex items-center justify-center text-2xl hover:bg-[#e55a28] hover:scale-110 transition-all shadow-md"
                >
                  →
                </button>
              </div>
            </div>

            {/* Circular Image - Right (Top on mobile) */}
            <div className="flex-1 flex justify-center items-center">
              <div className="relative">
                {/* Offset circle border */}
                <div className="absolute -inset-2.5 rounded-full border-4 border-[#FF6B34]"></div>
                {/* Main circular image */}
                <img
                  key={currentSlide}
                  src={whyChooseData[currentSlide].image}
                  alt={whyChooseData[currentSlide].title}
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>{messagefromprincipals()}</section>
      {/* Get to Know SHEBS Section */}
      <section className="py-16 px-6 md:px-24 bg-white">
        <div className="flex justify-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C3F82] text-center relative inline-block uppercase">
            Get to Know SHEBS
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-3
           h-[3px] bg-[#FF6B34]
           w-full animate-[underline_1.2s_ease-out]"
            />
          </h2>
        </div>

        {/* Wrapper */}
        <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row items-center justify-center">
          {/* Image Container: 16:9 Aspect Ratio */}
          <div className="relative w-full md:w-[85%] aspect-video border-2 border-[#1C3F82] rounded-lg overflow-hidden shadow-lg z-10">
            <img
              src={Assets.gettoknowus}
              alt="Campus Life"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Orange Info Card: Proportional to 16:9 widescreen height */}
          <div
            className="
          /* Shared Styles */
          z-20 bg-[#FF6B34] text-white shadow-2xl flex items-center p-6 lg:p-8 transition-all duration-300 
          rounded-tl-[70px] rounded-br-[70px] 

          /* --- MOBILE VIEW --- */
          relative 
          w-[90%] 
          -mt-10       /* Overlap pull for mobile */
          mx-auto      
          min-h-[140px] 

          /* --- TABLET VIEW (md) --- */
          md:absolute
          md:mt-0      
          md:top-1/2 
          md:-translate-y-1/2
          md:w-[240px]    
          md:min-h-[280px] /* Shorter to match 16:9 height */
          md:left-[-30px]  
          md:mx-0      

          /* --- DESKTOP VIEW (lg+) --- */
          lg:w-[300px]    
          lg:min-h-[340px] /* Balanced for widescreen look */
          lg:left-[-50px]  /* Pushed further left to reveal more of the 16:9 image */
        "
          >
            <p className="text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              Spring Hill English Boarding School located at Nala has been
              providing quality education since 1988. We promise skillful
              knowledge to provide the best manpower.
            </p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 px-6 md:px-24 bg-white">
        <Notice />
      </section>
    </div>
  );
}

export default HomePage;
