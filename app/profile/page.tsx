'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Home, ImageIcon, Trash2, Save } from 'lucide-react';

// --- Mock User Data for pre-filling the form ---
// In a real app, this would come from a context or API call
const currentUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  profileImageUrl: null,
};

export default function Page() {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    newPassword: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(currentUser.profileImageUrl);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };
    
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Updated data:", {
        ...formData,
        profileImage: previewImage,
    });
    setMessage("Profile saved successfully!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-400 via-green-500 to-blue-600 p-4 font-sans text-center text-white">
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800">Success!</h3>
            <p className="mt-2 text-gray-600">{message}</p>
            <button
              onClick={() => setMessage(null)}
              className="mt-4 rounded-md bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <div className="flex w-full items-center justify-between mb-4">
            <a href="/dashboard" className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/40">
                <Home className="h-5 w-5 text-white" />
            </a>
        </div>
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          แก้ไขโปรไฟล์
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input 
            type="text" 
            name="name"
            placeholder="ชื่อ-สกุล" 
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <input 
            type="email" 
            name="email"
            placeholder="อีเมล" 
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <input 
            type="password" 
            name="newPassword"
            placeholder="รหัสผ่านใหม่" 
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500" 
          />
          <div className="my-4 flex items-center justify-center space-x-4">
            <div onClick={handleImageUploadClick} className="cursor-pointer">
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg" />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-dashed border-white/50 bg-white/20 text-white shadow-lg">
                  <ImageIcon className="h-10 w-10 opacity-70" />
                </div>
              )}
              <input id="file-upload" type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
            {previewImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-full bg-red-500 p-2 text-white shadow-md transition-transform hover:scale-105"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full transform rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500 flex items-center justify-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>แก้ไขโปรไฟล์</span>
          </button>
        </form>
      </div>
    </main>
  );
}
