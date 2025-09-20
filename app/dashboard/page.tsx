// file: app/dashboard/page.tsx

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import profile from "./../images/profile.png";
import { supabase } from "./../../libs/supabaseClient";
import { useRouter } from "next/navigation";

useEffect;
interface FoodLog {
  id: string;
  date: string; // yyyy-mm-dd
  imageUrl: string;
  name: string;
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack";
}
// --- Mock User Data (เพิ่มเข้ามา) ---
const mockUser = {
  name: "Kinema",
  profileImageUrl: profile, // รูปโปรไฟล์สุ่ม
};

// --- Type และ Mock Data สำหรับอาหาร (คงเดิม) ---
type food = {
  id: string;
  created_at: string;
  foodname: string;
  meal: string;
  fooddate_at: string;
  food_image_url: string;
  update_at: string;
};

export default function Page() {
  // const [foods, setFoods] = useState<FoodLog[]>(mockFoodData);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [foods, setFoods] = useState<FoodLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

  const isExternalUrl = (u?: string | null) => !!u && /^https?:\/\//i.test(u);
  // ===== Load user once =====
  useEffect(() => {
    (async () => {
      let uid: string | null = null;
      const { data: auth } = await supabase.auth.getUser();
      uid = auth?.user?.id ?? localStorage.getItem("user_id") ?? null;
      if (!uid) {
        router.push("/login");
        return;
      }
      setUserId(uid);

      // profile (ใช้ cache localStorage ก่อน)
      let name = localStorage.getItem("fullname");
      let avatar = localStorage.getItem("user_image_url");
      if ((!name || !avatar) && uid) {
        const { data: urow } = await supabase
          .from("user_tb")
          .select("fullname, user_image_url")
          .eq("id", uid)
          .single();
        if (urow) {
          name = urow.fullname ?? name ?? "User";
          avatar = urow.user_image_url ?? avatar ?? null;
          localStorage.setItem("fullname", name || "");
          if (avatar) localStorage.setItem("user_image_url", avatar);
        }
      }
      setUserName(name || "User");
      setUserAvatar(avatar || null);
    })();
  }, [router]);

  // ===== Fetch foods when user/page/search/pageSize changes =====
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        let query = supabase
          .from("food_tb")
          .select("id, foodname, meal, fooddate_at, food_image_url", {
            count: "exact",
          })
          .eq("user_id", userId);

        if (searchQuery.trim()) {
          query = query.ilike("foodname", `%${searchQuery.trim()}%`);
        }

        const {
          data: rows,
          count,
          error,
        } = await query
          .order("fooddate_at", { ascending: false })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        type RowType = {
          id: string;
          foodname: string;
          meal: string;
          fooddate_at: string;
          food_image_url: string | null;
        };
        const mapped: FoodLog[] =
          (rows as RowType[] | null)?.map((r) => {
            const rawUrl: string | null = r.food_image_url ?? null;
            let imageUrl = "";
            if (isExternalUrl(rawUrl)) {
              imageUrl = rawUrl!;
            } else if (rawUrl) {
              const { data: p } = supabase.storage
                .from("food_bk")
                .getPublicUrl(rawUrl);
              imageUrl = p.publicUrl;
            }
            const dateStr =
              r.fooddate_at ?? new Date().toISOString().slice(0, 10);
            return {
              id: r.id,
              date: dateStr,
              imageUrl,
              name: r.foodname || "",
              meal: (r.meal || "Breakfast") as FoodLog["meal"],
            };
          }) || [];

        setFoods(mapped);
        setTotal(count ?? 0);

        const newTotalPages = Math.max(1, Math.ceil((count ?? 0) / pageSize));
        if (page > newTotalPages) setPage(newTotalPages);
      } catch (e) {
        const err = e as Error;
        console.error("fetch foods error:", err?.message || err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, page, pageSize, searchQuery]);
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    localStorage.removeItem("user_id");
    localStorage.removeItem("fullname");
    localStorage.removeItem("user_image_url");
    router.push("/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from("food_tb").delete().eq("id", id);
    if (error) {
      alert("ลบไม่สำเร็จ: " + error.message);
      return;
    }
    if (foods.length === 1 && page > 1) setPage((p) => p - 1);
    else setPage((p) => p);
  };

  const avatarNode =
    isExternalUrl(userAvatar) && userAvatar ? (
      <Image
        src={userAvatar}
        alt="User profile picture"
        width={40}
        height={40}
        className="rounded-full object-cover w-10 h-10 ring-1 ring-gray-600"
        unoptimized
      />
    ) : (
      <Image
        src={profile}
        alt="User profile picture"
        width={40}
        height={40}
        className="rounded-full object-cover w-10 h-10 ring-1 ring-gray-600"
      />
    );
  // const filteredFoods = useMemo(() => {
  //   return foods.filter((food) =>
  //     food.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [foods, searchQuery]);

  // const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  // const currentItems = filteredFoods.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const goToNextPage = () =>
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // const handleDelete = (id: string) => {
  //   if (confirm("Are you sure you want to delete this item?")) {
  //     setFoods((currentFoods) => currentFoods.filter((food) => food.id !== id));
  //   }
  // };

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-black">
      {/* --- NEW: Header Section --- */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
        >
          <Home size={20} />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          My Food Diary
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="hidden sm:inline font-semibold text-white"
          >
            {userName}
          </Link>
          <Image
            src={userAvatar || profile}
            alt="User profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-gray-300 backdrop-blur-sm rounded-3xl shadow-lg p-6">
        {/* --- Search and Add Section --- */}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Link
            href="/addfood"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Food
            <PlusCircle size={20} />
          </Link>
          {/* <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search"
              className="w-full sm:w-80 p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900/40">
              <tr>
                <th className="border p-3 font-semibold text-black">Date</th>
                <th className="border p-3 font-semibold text-black">Food</th>
                <th className="border  p-3 font-semibold text-black">Meal</th>
                <th className="border p-3 text-right font-semibold text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-6 text-center text-gray-300" colSpan={4}>
                    Loading...
                  </td>
                </tr>
              ) : foods.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan={4}>
                    No food logs found.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr
                    key={food.id}
                    className="border-b border-gray-700/60 hover:bg-gray-400"
                  >
                    <td className="border p-3 text-black">{food.date}</td>
                    <td className="border p-3">
                      <div className="flex items-center gap-3">
                        {/* บังคับขนาดรูปอาหารให้เท่ากันทั้งหมด */}
                        {food.imageUrl ? (
                          <Image
                            src={food.imageUrl}
                            alt={food.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-md object-cover ring-1 ring-gray-600"
                            unoptimized
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-700 rounded-md" />
                        )}
                        <span className="font-medium text-black">
                          {food.name}
                        </span>
                      </div>
                    </td>
                    <td className="border p-3 text-black">{food.meal}</td>
                    <td className="border p-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/updatefood/${food.id}`}
                          className="p-1 text-green-6d00 hover:text-green-500"
                        >
                          <Edit size={30} />
                        </Link>
                        <button
                          onClick={() => handleDelete(food.id)}
                          className="p-1 text-red-500 hover:text-red-300"
                        >
                          <Trash2 size={30} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination + PageSize (ย้ายลงมาล่าง) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
          <div className="text-sm text-gray-300">
            Showing{" "}
            <span className="font-semibold">
              {foods.length ? (page - 1) * pageSize + 1 : 0}
            </span>
            {"–"}
            <span className="font-semibold">
              {(page - 1) * pageSize + foods.length}
            </span>{" "}
            of <span className="font-semibold">{total}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Page size moved here */}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-gray-600 bg-gray-700/70 text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Items per page"
            >
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/70 text-gray-100 border border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-700"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span className="text-sm text-gray-300">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/70 text-gray-100 border border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-700"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
