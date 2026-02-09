import React from "react";
import Assets from "../assets/assets";

const MessageFromPrincipal = () => {
  return (
    <div id="principal-message">
      <section className="py-16 px-6 md:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Message Content - Left side */}
            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1C3F82] relative inline-block uppercase">
                  Message from the Principal
                  {/* Full Underline Span */}
                  <span
                    className="absolute left-0 -bottom-3
                     h-[3px] bg-[#FF6B34]
                     w-full animate-[underline_1.2s_ease-out]"
                  />
                </h2>
              </div>

              <div className="relative mt-12">
                <span className="absolute -top-8 -left-2 md:-left-4 text-7xl text-gray-200 font-serif opacity-50 select-none">
                  “
                </span>

                <p className="text-gray-600 italic text-lg leading-relaxed mb-6 relative z-10">
                  Welcome to Spring Hill English Boarding School. Since 1988,
                  our mission has been to nurture not just academic achievers,
                  but compassionate global citizens. We believe every child has
                  a unique spark, and our role is to provide the environment
                  where that spark can turn into a flame of knowledge and
                  character.
                </p>

                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  Our dedicated faculty and modern facilities at Nala are
                  designed to challenge students intellectually while supporting
                  them emotionally. We invite you to join our legacy of
                  excellence and build a bright future together.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-[#1C3F82]">
                  Sundar Budathoki
                </h4>
                <p className="text-[#FF6B34] font-medium italic">
                  Principal, SHEBS
                </p>
              </div>
            </div>

            {/* Principal's Circular Image Container */}
            <div className="relative flex-shrink-0 flex items-center justify-center">
              {/* Main Image Circle */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={
                    Assets.Principal || "https://via.placeholder.com/400x400"
                  }
                  alt="Principal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute w-[105%] h-[105%] border-2 border-[#FF6B34] rounded-full z-0 opacity-70 sm:opacity-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MessageFromPrincipal;
