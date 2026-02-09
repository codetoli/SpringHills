import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { X, Maximize2, Loader2, Download } from "lucide-react";
import Banner from "../components/Banner";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * THE LOGIC FIX:
   * 1. Checks all possible field names (imageUrl, pdfUrl, file).
   * 2. If it's a PDF, it tells Cloudinary to show a JPG preview instead.
   * 3. Adds 'f_auto,q_auto' to ensure the image loads fast and high quality.
   */
  const getPreviewUrl = (img) => {
    let url = img.imageUrl || img.pdfUrl || img.file || "";

    if (url.includes("cloudinary")) {
      // Force preview even if it's a PDF by changing extension to .jpg
      // Also optimizes quality (q_auto) and format (f_auto)
      return url
        .replace("/upload/", "/upload/f_auto,q_auto/")
        .replace(".pdf", ".jpg");
    }
    return url;
  };

  return (
    <div className="bg-white min-h-screen">
      <Banner
        title="School"
        highlightText="Gallery"
        breadcrumb="Gallery"
        subtitle="Capturing moments, creating memories. A glimpse into our school life."
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex flex-col items-center py-32 text-gray-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold text-xs uppercase tracking-widest">
              Loading Media...
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImg(img)}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-50"
              >
                {/* IMAGE PREVIEW - FIXED LOGIC */}
                <img
                  src={getPreviewUrl(img)}
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                  alt={img.title}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=Preview+Error";
                  }}
                />

                {/* SAME UI: Sliding Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F82]/90 via-[#1C3F82]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <h4 className="text-white font-black text-2xl mb-1 translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    {img.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[#FF6B34] font-bold text-xs uppercase tracking-widest translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out">
                    <Maximize2 size={16} /> View Fullscreen
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FULLSCREEN PREVIEW MODAL */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors">
            <X size={40} />
          </button>

          <div
            className="relative w-full max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getPreviewUrl(selectedImg)}
              className="max-w-full max-h-[75vh] rounded-3xl shadow-2xl object-contain border-4 border-white/5"
              alt={selectedImg.title}
            />

            <div className="mt-8 text-center">
              <h3 className="text-white font-black text-2xl md:text-3xl mb-4">
                {selectedImg.title}
              </h3>
              <a
                href={
                  selectedImg.imageUrl || selectedImg.pdfUrl || selectedImg.file
                }
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 bg-white text-[#1C3F82] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#FF6B34] hover:text-white transition-all shadow-xl"
              >
                <Download size={18} /> Download High Quality
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
