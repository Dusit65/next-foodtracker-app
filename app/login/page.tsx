"use client";
import React, { useState } from 'react';

/**
 * A functional component for the login page of the Food Tracker application.
 *
 * @returns {JSX.Element} The Login page component.
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the form submission for user login.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // เพิ่ม logic สำหรับการล็อกอิน เช่น การเรียก API
    console.log('ล็อกอิน:', { email, password });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          เข้าสู่ระบบ
        </h1>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button type="submit" className="w-full transform rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500">
            เข้าสู่ระบบ
          </button>
        </form>
        
        <p className="mt-4 text-sm">
          ยังไม่มีบัญชี?{' '}
          <a href="/register" className="font-semibold text-sky-400 hover:underline">
            สมัครสมาชิกที่นี่
          </a>
        </p>
      </div>
    </main>
    //Don{"'""}t have an account?
  );
};

export default LoginPage;
