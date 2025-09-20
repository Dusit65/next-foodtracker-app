"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "./../../libs/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

 const handleLoginClick = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  

  const { data, error } = await supabase
      .from("user_tb") // ชื่อตารางจริงใน DB
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    // ล็อกอินสําเร็จ
    alert("ล็อกอินสําเร็จ✅");
    router.push('/dashboard');
    localStorage.setItem("user_id", data.id);
    localStorage.setItem("fullname", data.fullname);
    localStorage.setItem("userImage", data.user_image_url);

};

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Back to Home"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Login
        </h1>
        <form onSubmit={handleLoginClick} className="w-full space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={Loading}
            className="w-full transform rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500"
          >
            {Loading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-sky-600 hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </main>
    //Don{"'""}t have an account?
  );
}
