"use client";
import React, { useState } from 'react';

// Mock Link component since we are in a single-file environment
const Link = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// Mock user data to simulate a logged-in user
interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

const mockUser: User = {
  id: 'user123',
  name: 'สมชาย รักสุขภาพ',
  email: 'somchai@email.com',
  profileImage: 'https://placehold.co/150x150/60a5fa/ffffff?text=U',
};

/**
 * A functional component for the User Profile page.
 * It provides a form to edit user details and a profile picture.
 *
 * @returns {JSX.Element} The Profile page component.
 */
const ProfilePage = () => {
  const [userName, setUserName] = useState(mockUser.name);
  const [userEmail, setUserEmail] = useState(mockUser.email);
  const [profileImage, setProfileImage] = useState<string | null>(mockUser.profileImage);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      name: userName,
      email: userEmail,
      profileImage: profileImage || '',
    };
    console.log('ข้อมูลผู้ใช้ที่อัปเดต:', updatedUser);
    // Add logic to save the updated data to a database
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        {/* Back Link */}
        <div className="self-start mb-4">
          <Link href="/dashboard" className="text-white hover:text-white/80 transition-colors">
            &larr; กลับไปที่แดชบอร์ด
          </Link>
        </div>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          แก้ไขข้อมูลส่วนตัว
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Profile Image Upload and Preview */}
          <div className="my-4 flex items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              {profileImage ? (
                <img src={profileImage} alt="Profile Preview" className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
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

          {/* User Name Input */}
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-white mb-2 text-left">
              ชื่อ-สกุล
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              placeholder="ป้อนชื่อ-สกุล"
            />
          </div>

          {/* User Email Input */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-white mb-2 text-left">
              อีเมล
            </label>
            <input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              placeholder="ป้อนอีเมล"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full transform rounded-md bg-emerald-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-emerald-500"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
