import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "swiper/element/bundle";
import {
  Heart,
  Shield,
  Zap,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Banner from "../components/Banner";

// Register Swiper
register();

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Campus images
import campus1 from "../assets/campus1.jpeg";
import campus2 from "../assets/campus2.jpeg";
import campus3 from "../assets/campus3.jpeg";
import campus4 from "../assets/campus4.jpeg";
import campus5 from "../assets/campus5.jpeg";
import toddler from "../assets/toddler.jpeg";

const About = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperRef.current;

    // Data for rotation variety
    const rotationData = [10, -10, 15, -15, 5];

    if (swiperEl) {
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        autoplay: { delay: 4000 },
        pagination: { clickable: true, dynamicBullets: true },
        navigation: true,
        breakpoints: {
          768: { slidesPerView: 1.2 },
          1024: { slidesPerView: 1.5, centeredSlides: true },
        },
        on: {
          progress: (s) => {
            const multiplier = 2; // Sensitivity of rotation
            s.slides.forEach((slide, index) => {
              const progress = slide.progress;
              // FIX: Applying the rotation math to each slide
              let val =
                rotationData[index % rotationData.length] *
                Math.abs(progress * multiplier);

              // Apply the transformation to the image inside the slide
              const img = slide.querySelector("img");
              if (img) {
                img.style.transform = `rotateY(${val}deg) scale(${1 - Math.abs(progress) * 0.1})`;
                img.style.transition = "transform 0.3s ease-out";
              }
            });
          },
          setTransition: (s, duration) => {
            s.slides.forEach((slide) => {
              const img = slide.querySelector("img");
              if (img) img.style.transition = `${duration}ms`;
            });
          },
        },
      };

      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
  }, []);

  const campusSlides = [
    {
      src: campus1,
      title: "Our Main Campus",
      desc: "A place where learning meets nature.",
    },
    {
      src: campus2,
      title: "Modern Laboratories",
      desc: "Equipped for the scientists of tomorrow.",
    },
    {
      src: campus3,
      title: "Sports Excellence",
      desc: "Fostering teamwork and physical health.",
    },
    {
      src: campus4,
      title: "Academic Hub",
      desc: "Our library and quiet study zones.",
    },
    {
      src: campus5,
      title: "Cultural Vibrancy",
      desc: "Celebrating diversity through annual events.",
    },
  ];

  return (
    <div className="bg-white font-['Poppins'] overflow-x-hidden">
      <Banner
        title="About"
        highlightText="us"
        breadcrumb="About Us"
        subtitle="Legacy. Excellence. Innovation."
      />

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* --- INTRO SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C3F82] leading-tight">
              A Tradition of <br />
              <span className="text-[#FF6B34]">Holistic Excellence</span>
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed text-justify space-y-4">
              <p>
                Established in{" "}
                <span className="font-bold text-[#1C3F82]">2045 B.S.</span>,
                Spring Hill English Boarding School has stood as a beacon of
                quality education for over three decades.
              </p>
              <p>
                Located in{" "}
                <span className="font-semibold italic">Banepa-4, Kavre</span>,
                we provide a structured yet flexible environment where students
                are encouraged to innovate.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#FF6B34]/10 rounded-[3rem] blur-2xl group-hover:bg-[#1C3F82]/10 transition-colors duration-500"></div>
            <img
              src={campus1}
              alt="School Campus"
              className="relative rounded-[2.5rem] shadow-2xl h-[450px] w-full object-cover"
            />
          </div>
        </section>

        <section className="space-y-16 py-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 max-w-6xl mx-auto px-4">
            <div className="space-y-2">
              <span className="text-[#FF6B34] font-bold tracking-[0.3em] uppercase text-xs">
                Visual Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#1C3F82] tracking-tight">
                School <span className="text-gray-300">Glimpses</span>
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-xs text-right hidden md:block border-r-4 border-[#FF6B34] pr-4">
              Capturing the moments that define our student experience.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto px-4">
            {/* Floating Architectural Elements */}
            <div className="absolute -top-10 -right-4 w-64 h-64 bg-[#1C3F82]/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-4 w-64 h-64 bg-[#FF6B34]/5 rounded-full blur-3xl -z-10"></div>

            {/* The Main Container: Asymmetric Shape */}
            <div className="relative bg-white p-2 md:p-4 rounded-[3rem] md:rounded-tr-[10rem] md:rounded-bl-[10rem] shadow-[0_50px_100px_-20px_rgba(28,63,130,0.15)] overflow-hidden">
              <div className="overflow-hidden rounded-[2.5rem] md:rounded-tr-[9rem] md:rounded-bl-[9rem] bg-[#0A1120] perspective-1000">
                <swiper-container
                  ref={swiperRef}
                  init="false"
                  class="w-full"
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#FF6B34",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": "0.3",
                    "--swiper-navigation-size": "20px",
                  }}
                >
                  {campusSlides.map((slide, index) => (
                    <swiper-slide key={index}>
                      <div className="relative h-[450px] md:h-[700px] overflow-hidden group/slide">
                        {/* Image with Tilt/Scale Effect */}
                        <img
                          data-swiper-parallax="30%"
                          src={slide.src}
                          alt={slide.title}
                          className="w-full h-full object-cover transform transition-transform duration-[3000ms] "
                        />

                        {/* Dark Gradient Wash */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1120] via-transparent to-black/10"></div>

                        {/* Floating Content Label */}
                        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full">
                            <span className="text-white font-mono text-sm tracking-tighter">
                              GALLERY / 0{index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Main Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20">
                          <div
                            className="max-w-2xl space-y-4"
                            data-swiper-parallax="-400"
                          >
                            <h4 className="text-white text-4xl md:text-7xl font-bold leading-tight tracking-tighter italic">
                              {slide.title}
                            </h4>
                            <p className="text-white/70 text-base md:text-xl font-light max-w-lg leading-relaxed border-l-2 border-[#FF6B34] pl-6">
                              {slide.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            </div>
          </div>
        </section>

        {/* --- ACADEMIC PROGRAMS (CIRCULAR) --- */}
        <section className="space-y-20 py-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#1C3F82] uppercase tracking-tighter">
              Academic Programs
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Providing a seamless educational journey from Montessori to Career
              foundations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Pre-School",
                img: toddler,
                sub: "Montessori Method",
                color: "border-[#FF6B34]",
              },
              {
                title: "Basic Level",
                img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
                sub: "Grade 1 - 5",
                color: "border-[#1C3F82]",
              },
              {
                title: "Secondary",
                img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
                sub: "Grade 6 - 10",
                color: "border-[#FF6B34]",
              },
              {
                title: "High School",
                img: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
                sub: "Mgmt. & IT",
                color: "border-[#1C3F82]",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`relative w-56 h-56 rounded-full overflow-hidden border-8 ${p.color} shadow-2xl transition-all duration-500 `}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-[#1C3F82] group-hover:text-[#FF6B34] transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                  {p.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
            <a
              href="https://maps.app.goo.gl/16etKwWobai5nFng7"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-12 py-5 bg-[#1C3F82] text-white rounded-full font-bold shadow-xl hover:bg-[#152e5f] transition-all hover:-translate-y-1"
            >
              <MapPin size={20} /> VISIT CAMPUS
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-3 px-12 py-5 bg-[#FF6B34] text-white rounded-full font-bold shadow-xl hover:bg-[#e55a28] transition-all hover:-translate-y-1"
            >
              <CheckCircle2 size={20} /> APPLY FOR ADMISSION
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <p className="text-gray-400 text-sm italic">
            "Spring Hill English Boarding School is committed to excellence,
            providing an inclusive environment for all."
          </p>
          <div className="flex justify-center gap-4 text-[#1C3F82] opacity-30 font-bold text-[10px] uppercase tracking-[0.2em]">
            <span>Est. 2045 B.S.</span>
            <span>•</span>
            <span>Kavre, Nepal</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
