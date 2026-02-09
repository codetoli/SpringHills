import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Lock, User, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // Redirect to admin after success
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <div className="text-center mb-10">
          <div className="bg-[#1C3F82] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="text-white" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-[#1C3F82]">Admin Login</h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your credentials to manage SHEBS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1C3F82] focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="admin@shebs.edu.np"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1C3F82] focus:bg-white rounded-2xl outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#FF6B34] text-white rounded-2xl font-bold shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
