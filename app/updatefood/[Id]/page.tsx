"use client";
import React, { useState, useEffect } from 'react';

// Mock Link component since we are in a single-file environment
const Link = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// Mock user data to simulate a logged-in user
interface User {
  id: string;
  name: string;
  profileImage: string;
}

const mockUser: User = {
  id: 'user123',
  name: 'สมชาย รักสุขภาพ',
  profileImage: 'https://placehold.co/100x100/60a5fa/ffffff?text=U',
};

// Mock data for the food items to be edited. In a real application, this would be fetched from a database based on the item ID.
const mockFoodData = [
  {
    id: 1,
    date: '2024-05-20',
    foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg',
    foodName: 'ข้าวผัดกะเพรา',
    mealType: 'อาหารกลางวัน',
  },
  {
    id: 2,
    date: '2024-05-21',
    foodImage: 'https://cdn.pixabay.com/photo/2017/01/10/12/05/pancakes-1969244_1280.jpg',
    foodName: 'ส้มตำ',
    mealType: 'อาหารเย็น',
  },
  {
    id: 3,
    date: '2024-05-22',
    foodImage: 'https://cdn.pixabay.com/photo/2017/01/10/12/05/pancakes-1969244_1280.jpg',
    foodName: 'ไก่ทอด',
    mealType: 'ของว่าง',
  },
];

/**
 * A functional component for the Edit Food page.
 * It provides a form to edit an existing food entry.
 *
 * @returns {JSX.Element} The Edit Food page component.
 */
const EditFoodPage = () => {
  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState('');
  const [foodImage, setFoodImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [date, setDate] = useState('');

  // Use useEffect to load a random mock food item into the form when the component mounts
  useEffect(() => {
    // Select a random food item from the mock data for demonstration
    const randomFoodIndex = Math.floor(Math.random() * mockFoodData.length);
    const mockFoodToEdit = mockFoodData[randomFoodIndex];

    setFoodName(mockFoodToEdit.foodName);
    setMealType(mockFoodToEdit.mealType);
    setFoodImage(mockFoodToEdit.foodImage);
    setDate(mockFoodToEdit.date);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFoodEntry = {
      foodName,
      mealType,
      date,
      // In a real application, you would handle image upload here
      foodImage: foodImage || '', 
    };
    console.log('แก้ไขรายการอาหาร:', updatedFoodEntry);
    // Add logic to update the data in a database
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-white">
      {/* User Info and Navigation */}
      <div className="flex w-full items-center justify-between mb-6 flex-wrap gap-4">
        <Link href="/dashboard" className="text-white hover:text-white/80 transition-colors">
          &larr; กลับไปที่แดชบอร์ด
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={mockUser.profileImage}
              alt="User Profile"
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <span className="font-semibold text-white">
              {mockUser.name}
            </span>
          </div>
          <Link
            href="/profile"
            className="rounded-full bg-indigo-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-500"
          >
            โปรไฟล์
          </Link>
        </div>
      </div>
      
      <div className="flex w-full flex-col items-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          แก้ไขอาหาร
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
          {/* Food Name Input */}
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium text-white mb-2">
              ชื่ออาหาร
            </label>
            <input
              id="foodName"
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="w-full rounded-full border-0 bg-white/50 px-4 py-2 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              placeholder="ป้อนชื่ออาหาร"
            />
          </div>

          {/* Meal Type Selection */}
          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-white mb-2">
              มื้ออาหาร
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full rounded-full border-0 bg-white/50 px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            >
              <option value="อาหารเช้า">อาหารเช้า</option>
              <option value="อาหารกลางวัน">อาหารกลางวัน</option>
              <option value="อาหารเย็น">อาหารเย็น</option>
              <option value="ของว่าง">ของว่าง</option>
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
              วันเดือนปี
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-full border-0 bg-white/50 px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            />
          </div>

          {/* Image Upload and Preview */}
          <div className="flex flex-col items-center">
            <label htmlFor="foodImage" className="cursor-pointer mb-4">
              <span className="inline-block rounded-full bg-sky-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500">
                เลือกรูปอาหาร
              </span>
              <input
                id="foodImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {foodImage && (
              <div className="mt-4 p-2 rounded-xl bg-white/50 shadow-inner">
                <img src={foodImage} alt="Image Preview" className="h-48 w-48 object-cover rounded-lg shadow-md" />
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditFoodPage;
