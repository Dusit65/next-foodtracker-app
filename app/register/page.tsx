"use client";
import React, { useState } from 'react';

/**
 * A functional component for the registration page of the Food Tracker application.
 *
 * @returns {JSX.Element} The Register page component.
 */
export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /**
   * Handles the form submission for user registration.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // เพิ่ม logic สำหรับการลงทะเบียน เช่น การเรียก API
    console.log('ลงทะเบียน:', { fullName, email, password, gender, imagePreview });
  };

  /**
   * Handles the file input change and sets the image preview.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input file change event.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          ลงทะเบียน
        </h1>
        <form onSubmit={handleRegister} className="w-full space-y-4">
          <input 
            type="text" 
            placeholder="ชื่อ-สกุล" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
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
          <select 
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </select>

          <div className="my-4 flex items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-dashed border-white/50 bg-white/20 text-white shadow-lg">
                  {/* SVG icon for camera */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 opacity-70">
                    <path d="M4 4h4.5l1.5-3h4l1.5 3H20a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 11.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/>
                  </svg>
                </div>
              )}
              <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          
          <button type="submit" className="w-full transform rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500">
            ลงทะเบียน
          </button>
        </form>

        <p className="mt-4 text-sm">
          มีบัญชีอยู่แล้ว?{' '}
          <a href="/login" className="font-semibold text-sky-400 hover:underline">
            ลงชื่อเข้าใช้ที่นี่
          </a>
        </p>
      </div>
    </main>
  );
};

