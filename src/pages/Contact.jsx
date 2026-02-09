// src/pages/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_k48ed9k",
        "template_ik4do6t",
        formRef.current,
        "R64jyQhjF8L6EJJSC",
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
        },
        () => setStatus("error"),
      );
  };

  return (
    <div className="bg-slate-50 min-h-screen font-['Poppins']">
      <Banner
        title="Contact"
        highlightText="us"
        breadcrumb="Contact Us"
        subtitle="Let's start a conversation about your child's future."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {/* TOP SECTION: FORM & INFO (Grid 2 on Mobile/Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* ADMISSION ENQUIRY CARD */}
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 lg:p-12 border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-[#1C3F82] mb-2 uppercase tracking-tighter">
                Admission Enquiry
              </h3>
              <p className="text-gray-500 mb-8 text-sm">
                Send us a message and our counselor will reach out.
              </p>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#FF6B34] focus:bg-white outline-none transition-all"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#FF6B34] focus:bg-white outline-none transition-all"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#FF6B34] focus:bg-white outline-none transition-all"
                  />
                </div>
                <select
                  name="program"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#FF6B34] focus:bg-white outline-none transition-all text-gray-500"
                >
                  <option value="" disabled selected>
                    Select Program
                  </option>
                  <option value="Pre-School">Pre-School</option>
                  <option value="Basic">Basic (1-5)</option>
                  <option value="Secondary">Secondary (6-10)</option>
                  <option value="HighSchool">High School (11-12)</option>
                </select>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="Your Message"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#FF6B34] focus:bg-white outline-none transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#1C3F82] text-white rounded-2xl font-bold hover:bg-[#FF6B34] transition-all shadow-lg"
                >
                  {status === "sending" ? "Sending..." : "Submit Enquiry"}{" "}
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* CONTACT INFORMATION CARD */}
          <div className="bg-[#1C3F82] rounded-[2.5rem] shadow-xl p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2 uppercase tracking-tighter">
                Contact Information
              </h3>
              <p className="text-white/70 mb-10 text-sm">
                Direct channels to reach our administration office.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="bg-[#FF6B34] p-4 rounded-2xl shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
                      Our Campus
                    </p>
                    <p className="text-lg font-medium">
                      Banepa-4, Kavre, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="bg-[#FF6B34] p-4 rounded-2xl shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
                      Email Support
                    </p>
                    <p className="text-lg font-medium">
                      springhill607@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="bg-[#FF6B34] p-4 rounded-2xl shadow-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
                      Call Helpline
                    </p>
                    <p className="text-lg font-medium">
                      9841103044 / 9860865441
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/60 text-xs italic">
              <span className="flex items-center gap-2">
                <Clock size={14} /> Sun - Fri: 9:00 AM - 4:00 PM
              </span>
              <Globe size={18} />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: FULL WIDTH MAP */}
        <section className="mt-10">
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white bg-white h-[450px] relative">
            <div className="overflow-hidden rounded-xl shadow-md">
              <iframe
                title="Spring Hill School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6663.672968213963!2d85.50126501574405!3d27.65430084631961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb0f002732c291%3A0xe38c519dc929c2aa!2sSpring%20Hill%20School%2C%20Banepa%2C%20Nala!5e0!3m2!1sen!2snp!5m2!1sen!2snp"
                className="w-full h-175 border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            {/* Floating Map Label */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-[#1C3F82] uppercase tracking-widest">
                Campus Live View
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
