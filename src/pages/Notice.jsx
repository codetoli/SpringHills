import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import {
  Search,
  X,
  Maximize,
  Loader2,
  FileText,
  Download,
  AlertCircle,
} from "lucide-react";
import Banner from "../components/Banner";

const formatDate = (date) => {
  if (!date) return "";
  try {
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Recent Update";
  }
};

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [activeNotice, setActiveNotice] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [queryStr, setQueryStr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeNotice) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeNotice]);

  useEffect(() => {
    const q = query(collection(db, "notices"), orderBy("date", "desc"));
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

  const getFileType = (url) => {
    if (!url) return "none";
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes(".pdf")) {
      return "pdf";
    }
    return "image";
  };

  const filteredNotices = notices.filter((n) =>
    n.title?.toLowerCase().includes(queryStr.toLowerCase()),
  );

  const closeModal = () => {
    setActiveNotice(null);
    setIsFullScreen(false);
  };

  return (
    <div className="bg-[#F9FBFF] min-h-screen font-sans">
      <Banner
        title="School"
        highlightText="Notices"
        breadcrumb="Notices"
        subtitle="Official circulars and daily updates from the school management."
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by keyword..."
              value={queryStr}
              onChange={(e) => setQueryStr(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-none shadow-sm rounded-2xl focus:ring-2 focus:ring-[#1C3F82] transition-all outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-32 text-gray-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold text-xs uppercase tracking-widest">
              Accessing Firestore...
            </p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <Search size={48} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No notices found
            </h3>
            <p className="text-slate-500">
              Try searching for a different keyword.
            </p>
          </div>
        ) : (
          /* UPDATED GRID LOGIC HERE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotices.map((notice) => {
              const fileLink = notice.pdfUrl || notice.imageUrl || notice.file;
              const type = getFileType(fileLink);

              const thumbUrl =
                type === "pdf" && fileLink.includes("cloudinary")
                  ? fileLink.replace(".pdf", ".jpg")
                  : fileLink;

              return (
                <article
                  key={notice.id}
                  onClick={() => setActiveNotice(notice)}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group"
                >
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-50">
                    {fileLink ? (
                      <img
                        src={thumbUrl}
                        alt=""
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/600x400?text=Notice+Preview";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText size={40} className="text-gray-200" />
                      </div>
                    )}
                    {type === "pdf" && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase">
                        PDF
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-[#FF6B34] uppercase tracking-widest mb-1">
                      {formatDate(notice.date)}
                    </p>
                    <h3 className="text-base font-bold text-[#1C3F82] leading-tight line-clamp-2 group-hover:text-[#FF6B34] transition-colors">
                      {notice.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {activeNotice && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-8"
          onClick={closeModal}
        >
          <div className="hidden md:flex absolute top-6 right-6 gap-3 z-[10001]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(!isFullScreen);
              }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md"
            >
              <Maximize size={20} />
            </button>
            <button
              onClick={closeModal}
              className="p-3 bg-[#FF6B34] hover:bg-[#ff8c5a] rounded-full text-white shadow-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className={`bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl transition-all duration-500 flex flex-col overflow-hidden ${
              isFullScreen
                ? "w-full h-full"
                : "max-w-5xl w-full h-[90vh] md:h-full md:max-h-[85vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b shrink-0 bg-white flex justify-between items-center">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-[#1C3F82] truncate pr-4">
                  {activeNotice.title}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                  {formatDate(activeNotice.date)}
                </p>
              </div>
              <a
                href={
                  activeNotice.pdfUrl ||
                  activeNotice.imageUrl ||
                  activeNotice.file
                }
                target="_blank"
                rel="noreferrer"
                download
                className="flex items-center gap-2 bg-[#1C3F82] text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-bold hover:bg-[#FF6B34] transition-all shrink-0"
              >
                <Download size={18} />{" "}
                <span className="hidden xs:inline">Download</span>
              </a>
              <button
                onClick={closeModal}
                className="md:hidden ml-4 p-2 text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 bg-gray-50 overflow-hidden relative">
              {!(
                activeNotice.pdfUrl ||
                activeNotice.imageUrl ||
                activeNotice.file
              ) ? (
                <div className="h-full flex flex-col items-center justify-center p-10 text-center">
                  <AlertCircle size={48} className="text-red-400 mb-4" />
                  <p className="text-slate-600 font-bold">Document Not Found</p>
                </div>
              ) : getFileType(
                  activeNotice.pdfUrl ||
                    activeNotice.imageUrl ||
                    activeNotice.file,
                ) === "image" ? (
                <div className="h-full overflow-y-auto p-4 flex justify-center items-start">
                  <img
                    src={
                      activeNotice.imageUrl ||
                      activeNotice.pdfUrl ||
                      activeNotice.file
                    }
                    className="max-w-full h-auto rounded-xl shadow-md"
                    alt="Full Notice"
                  />
                </div>
              ) : (
                <div className="w-full h-full">
                  <object
                    data={`${
                      activeNotice.pdfUrl || activeNotice.file
                    }#view=FitH`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full bg-white p-10 text-center">
                      <FileText size={64} className="text-slate-200 mb-4" />
                      <p className="text-slate-600 font-medium mb-6">
                        Preview unavailable.
                      </p>
                      <a
                        href={activeNotice.pdfUrl || activeNotice.file}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-100 text-[#1C3F82] px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Open File
                      </a>
                    </div>
                  </object>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
