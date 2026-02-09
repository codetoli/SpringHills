import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  FileText,
  Trash2,
  Edit3,
  Search,
  LogOut,
  User,
  Lock,
  Mail,
} from "lucide-react";

// FIXED: Using Environment Variables instead of hardcoded strings
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function Admin() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState("notices");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [editingId, setEditingId] = useState(null);

  // 1. Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Data (Only if logged in)
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, activeTab), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [activeTab, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || (!file && !editingId)) {
      setStatus({ type: "error", msg: "Title and file are required." });
      return;
    }

    setLoading(true);
    try {
      let secureUrl =
        items.find((i) => i.id === editingId)?.[
          activeTab === "notices" ? "pdfUrl" : "imageUrl"
        ] || "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          formData,
        );
        secureUrl = res.data.secure_url;
      }

      if (editingId) {
        await updateDoc(doc(db, activeTab, editingId), {
          title,
          [activeTab === "notices" ? "pdfUrl" : "imageUrl"]: secureUrl,
        });
        setStatus({ type: "success", msg: "Updated successfully!" });
      } else {
        await addDoc(collection(db, activeTab), {
          title,
          [activeTab === "notices" ? "pdfUrl" : "imageUrl"]: secureUrl,
          date: serverTimestamp(),
        });
        setStatus({ type: "success", msg: "Published successfully!" });
      }
      resetForm();
    } catch (err) {
      setStatus({ type: "error", msg: "Upload failed." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setEditingId(null);
    if (document.getElementById("fileInput"))
      document.getElementById("fileInput").value = "";
  };

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
        <Loader2 className="animate-spin text-[#1C3F82]" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1C3F82] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="text-white" size={30} />
            </div>
            <h1 className="text-2xl font-black text-[#1C3F82] uppercase tracking-tight">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Admin Email"
                className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-gray-50 rounded-2xl focus:outline-none focus:border-[#1C3F82] font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-6 py-4 bg-[#F8FAFC] border-2 border-gray-50 rounded-2xl focus:outline-none focus:border-[#1C3F82] font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                <AlertCircle size={16} /> {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#1C3F82] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6B34] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#1C3F82]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <nav className="bg-[#1C3F82] text-white py-4 px-8 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6B34] rounded flex items-center justify-center font-bold italic">
            S
          </div>
          <span className="font-black uppercase tracking-tighter hidden sm:block">
            SpringHill Admin
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold opacity-80 border-r border-white/20 pr-4 italic">
            <User size={14} /> {user.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#FF6B34] transition-colors"
          >
            Logout <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="flex bg-white p-2 rounded-2xl shadow-sm mb-8">
          {["notices", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setEditingId(null);
                setStatus({ type: "", msg: "" });
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all capitalize ${activeTab === tab ? "bg-[#1C3F82] text-white shadow-lg" : "text-gray-400"}`}
            >
              {tab === "notices" ? (
                <FileText size={20} />
              ) : (
                <ImageIcon size={20} />
              )}{" "}
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 mb-12">
          <h1 className="text-3xl font-black text-[#1C3F82] mb-1">
            {editingId ? "Edit Item" : "Upload Manager"}
          </h1>
          <p className="text-gray-400 font-medium mb-8">
            Section:{" "}
            <span className="text-[#FF6B34] font-bold uppercase">
              {activeTab}
            </span>
          </p>

          <form onSubmit={handleUpload} className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title / Caption..."
              className="w-full px-6 py-4 bg-[#F8FAFC] border-2 border-gray-50 rounded-2xl focus:outline-none focus:border-[#1C3F82] font-medium"
            />

            <div className="relative">
              <input
                id="fileInput"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-gray-200 rounded-3xl bg-[#F8FAFC] cursor-pointer hover:bg-gray-100 transition-all"
              >
                <Upload
                  className={`mb-2 ${file ? "text-green-500" : "text-gray-400"}`}
                  size={32}
                />
                <span className="text-sm font-bold text-gray-500">
                  {file ? file.name : "Choose File"}
                </span>
              </label>
            </div>

            {status.msg && (
              <div
                className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}{" "}
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#1C3F82] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6B34] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : editingId ? (
                "Update Now"
              ) : (
                "Publish Now"
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full text-xs font-bold text-gray-400 uppercase"
              >
                Cancel Editing
              </button>
            )}
          </form>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl shadow-sm border border-transparent focus:border-[#1C3F82] outline-none font-medium"
            />
          </div>

          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100 group hover:border-[#1C3F82]/30 transition-all"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center shrink-0">
                    {activeTab === "notices" ? (
                      <FileText size={20} className="text-[#1C3F82]" />
                    ) : (
                      <ImageIcon size={20} className="text-[#FF6B34]" />
                    )}
                  </div>
                  <h4 className="font-bold text-gray-700 truncate">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setTitle(item.title);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this?"))
                        await deleteDoc(doc(db, activeTab, item.id));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
