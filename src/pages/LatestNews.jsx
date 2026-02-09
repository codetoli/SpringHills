import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path matches your firebase config file
import { Link } from "react-router-dom";

export default function HomeNotice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Setup direct Firebase query: Latest 3 notices
    const q = query(
      collection(db, "notices"),
      orderBy("date", "desc"),
      limit(3),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to get preview image (especially for PDFs)
  const getPreviewUrl = (notice) => {
    const url =
      notice.pdfUrl ||
      notice.imageUrl ||
      notice.file ||
      notice.pdf ||
      notice.image;
    if (!url) return null;

    if (url.includes("cloudinary")) {
      return url
        .replace("/upload/", "/upload/f_auto,q_auto/")
        .replace(".pdf", ".jpg");
    }
    return url;
  };

  if (loading) return null; // Or a small spinner

  return (
    <section className="bg-[#F9FBFF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C3F82] relative inline-block">
            Latest News and Notices
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] bg-[#FF6B34] w-full" />
          </h2>
        </div>

        {notices.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => {
              const previewImage = getPreviewUrl(notice);

              return (
                <Link
                  key={notice.id}
                  to="/notice"
                  className="group bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-tl-[60px] rounded-br-[60px]"
                >
                  <div className="h-56 bg-gray-50 relative overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={notice.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Preview
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F82]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium">
                        Click to view details →
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[#FF6B34] text-xs font-bold uppercase tracking-widest mb-2">
                      {notice.date?.toDate
                        ? notice.date.toDate().toLocaleDateString()
                        : "Recent"}
                    </p>
                    <h3 className="text-[#1C3F82] font-bold text-lg line-clamp-2">
                      {notice.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No recent notices found.
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <Link
            to="/notice"
            className="inline-block border-2 border-[#1C3F82] text-[#1C3F82] px-10 py-3 rounded-full font-bold hover:bg-[#1C3F82] hover:text-white transition-all shadow-md"
          >
            Read All News
          </Link>
        </div>
      </div>
    </section>
  );
}
