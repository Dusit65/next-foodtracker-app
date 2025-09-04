"use-client"
import React, {  } from 'react';

/**
 * A functional component for the registration page of the Food Tracker application.
 *
 * @returns {JSX.Element} The Register page component.
 */
const RegisterPage = () => {
  

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          ลงทะเบียน
        </h1>
        <form  className="w-full space-y-4">
          <input 
            type="text" 
            placeholder="ชื่อ-สกุล" 
            // value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <input 
            type="email" 
            placeholder="อีเมล" 
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <input 
            type="password" 
            placeholder="รหัสผ่าน" 
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <select 
            // value={gender}
            // onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </select>
          
          {/* {imagePreview && (
            <div className="my-4 flex justify-center">
              <img src={imagePreview} alt="Profile Preview" className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
            </div>
          )} */}

          <div className="flex w-full items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              {/* เปลี่ยน span ข้อความเป็น icon SVG และข้อความ */}
              <span className="block w-full transform rounded-full bg-white px-6 py-3 font-semibold text-sky-600 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-50 flex items-center justify-center">
                {/* SVG icon for camera */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-6 w-6">
                  <path d="M4 4h4.5l1.5-3h4l1.5 3H20a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 11.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/>
                </svg>
                <span>เลือกรูปโปรไฟล์</span>
              </span>
              <input id="file-upload" type="file" className="hidden" accept="image/*"  />
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

export default RegisterPage;
