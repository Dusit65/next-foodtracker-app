'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, PlusCircle, Edit, Trash2, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import profile from './../images/profile.png';
// Mock data for a logged-in user. In a real application, this would come from an authentication service.
interface User {
  id: string;
  name: string;
  profileImage: string;
}

// Mock data for food entries
interface FoodEntry {
  id: number;
  date: string;
  foodImage: string;
  foodName: string;
  mealType: string;
}

const mockFoodData: FoodEntry[] = [
  { id: 1, date: '2024-05-20', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวผัดกะเพรา', mealType: 'อาหารกลางวัน' },
  { id: 2, date: '2024-05-20', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ส้มตำ', mealType: 'อาหารเย็น' },
  { id: 3, date: '2024-05-21', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ไข่เจียวหมูสับ', mealType: 'อาหารเช้า' },
  { id: 4, date: '2024-05-21', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ก๋วยเตี๋ยวเรือ', mealType: 'อาหารกลางวัน' },
  { id: 5, date: '2024-05-22', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ไก่ทอด', mealType: 'ของว่าง' },
  { id: 6, date: '2024-05-22', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'พิซซ่า', mealType: 'อาหารเย็น' },
  { id: 7, date: '2024-05-23', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวต้มกุ๊ย', mealType: 'อาหารเช้า' },
  { id: 8, date: '2024-05-23', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวต้มกุ๊ย', mealType: 'อาหารเช้า' },
  { id: 9, date: '2024-05-23', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวต้มกุ๊ย', mealType: 'อาหารเช้า' },
  { id: 10, date: '2024-05-23', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวต้มกุ๊ย', mealType: 'อาหารเช้า' },
  { id: 11, date: '2024-05-23', foodImage: 'https://cdn.pixabay.com/photo/2018/12/07/15/46/food-3861918_1280.jpg', foodName: 'ข้าวต้มกุ๊ย', mealType: 'อาหารเช้า' },


];

/**
 * A functional component for the dashboard page of the Food Tracker application.
 *
 * @returns {JSX.Element} The Dashboard page component.
 */
const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock user state
  const [user, setUser] = useState<User | null>({
    id: 'user123',
    name: 'สมชาย รักสุขภาพ',
    profileImage: 'https://placehold.co/100x100/60a5fa/ffffff?text=U',
  });
  const mockUser = {
  name: 'Taramiratsu Xato',
  profileImageUrl: profile, // รูปโปรไฟล์สุ่ม
};

  const filteredData = mockFoodData.filter(food =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id: number) => {
    console.log('แก้ไขรายการ:', id);
    // Add logic for editing
  };

  const handleDelete = (id: number) => {
    console.log('ลบรายการ:', id);
    // Add logic for deleting
  };

  const handleLogout = () => {
    // In a real app, this would sign out the user from the authentication service
    setUser(null);
    console.log('ออกจากระบบแล้ว');
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-red-400 via-green-500 to-blue-600 p-4 font-sans text-white">
      {/* Header bar with title and user info, now outside the main card */}
      {/* --- NEW: Header Section --- */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
          <Home size={20} />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">My Food Diary</h1>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="hidden sm:inline font-semibold text-gray-700">{mockUser.name}</Link>
          <Image
            src={mockUser.profileImageUrl}
            alt="User profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Main content card */}
      <div className="flex w-full max-w-4xl flex-col items-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <div className="flex w-full items-center justify-between mb-4 flex-wrap gap-4">
          <a
            href="/addfood"
            className="rounded-full bg-sky-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500"
          >
            เพิ่มอาหาร
          </a>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="ค้นหาชื่ออาหาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full border-0 bg-white/50 px-4 py-2 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            />
            <button
              onClick={() => setCurrentPage(1)}
              className="rounded-full bg-sky-600 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500"
            >
              ค้นหา
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white text-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-bold">วันที่</th>
                <th className="px-4 py-2 text-left text-sm font-bold">รูปภาพ</th>
                <th className="px-4 py-2 text-left text-sm font-bold">ชื่ออาหาร</th>
                <th className="px-4 py-2 text-left text-sm font-bold">มื้ออาหาร</th>
                <th className="px-4 py-2 text-left text-sm font-bold">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <td className="px-4 py-2 text-sm">{item.date}</td>
                    <td className="px-4 py-2">
                      <img src={item.foodImage} alt={item.foodName} className="h-12 w-16 rounded-lg object-cover shadow-sm" />
                    </td>
                    <td className="px-4 py-2 text-sm">{item.foodName}</td>
                    <td className="px-4 py-2 text-sm">{item.mealType}</td>
                    <td className="px-4 py-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-600 transition-colors"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-600 transition-colors"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-sm italic">
                    ไม่พบรายการอาหาร
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`h-8 w-8 rounded-full font-bold transition-colors duration-200 ${
                  currentPage === index + 1
                    ? 'bg-sky-600 text-white'
                    : 'bg-white/40 text-white hover:bg-white/50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
