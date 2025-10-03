"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  // State user
  const [userId, setUserId] = useState<string | null>(null);

  // State profile
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [genDer, setGender] = useState<string>("");
  const [userImage, setUserImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [oldImg, setOldImg] = useState<string | null>(null);

  // 1️⃣ ดึง userId
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const uid = user?.id ?? localStorage.getItem("user_id") ?? null;
      if (!uid) {
        router.push("/login");
        return;
      }
      setUserId(uid);
    })();
  }, [router]);

  // 2️⃣ ดึง profile จาก DB
  useEffect(() => {
    if (!userId) return;

    (async () => {
      const { data, error } = await supabase
        .from("user_tb")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setFullName(data.fullname );
      setEmail(data.email );
      setPassword(data.password );
      setOldImg(data.user_image_url );
      setGender(data.gender );
    })();
  }, [userId]);

  // 3️⃣ เลือกรูป
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 4️⃣ อัปเดต profile
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let ProfilePicUrl = imagePreview || oldImg || "";
    // อัปโหลดรูปใหม่
    if (userImage) {
      const fileImgName = oldImg?.split("/user_bk/")[1];
      if (fileImgName) {
        await supabase.storage.from("user_bk").remove([fileImgName]);
        console.log("ลบรูปเก่าออกจาก user_bk สำเร็จ✅");
      }

      const newImgFileName = `${Date.now()}-${userImage.name}`;
      const { error } = await supabase.storage.from("user_bk").upload(newImgFileName, userImage);
      if (error) {
        alert("ไม่สามารถบันทึกรูปลง supabase ได้TwT❌");
        console.log(error.message);
        return;
      }

      const { data } = await supabase.storage.from("user_bk").getPublicUrl(newImgFileName);
      ProfilePicUrl = data.publicUrl;
    }

    // อัปเดต DB
    const { error } = await supabase
      .from("user_tb")
      .update({
        fullname,
        email,
        user_image_url: ProfilePicUrl,
        gender: genDer,
        update_at: new Date(),
        
      })
      .eq("id", userId);

    if (error) {
      alert("ไม่สามารถแก้ไขข้อมูลผู้ใช้งานได้TwT❌");
      console.log(error.message);
      return;
    }

    // อัปเดต state และ localStorage
    setOldImg(ProfilePicUrl);
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("user_image_url", ProfilePicUrl);

    alert("แก้ไขข้อมูลผู้ใช้งานสำเร็จ✅");
    

    // รีเฟรชหน้า dashboard
    router.replace("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-sans text-center text-white">
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Edit Profile
        </h1>
        <form onSubmit={handleUpdateProfile} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {/* Image */}
          <div className="my-4 flex flex-col items-center justify-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center text-white border-4 border-dashed border-white/50 rounded-full h-28 w-28 hover:bg-gray-600 shadow-lg"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="h-28 w-28 rounded-full object-cover border-4 border-white"
                />
              ) : oldImg ? (
                <Image
                  src={oldImg}
                  alt="Current Profile"
                  width={160}
                  height={160}
                  className="rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 opacity-70">
                    <path d="M4 4h4.5l1.5-3h4l1.5 3H20a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 11.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                  </svg>
                  <p className="text-xs mt-1">กดเพื่อเลือกรูป</p>
                </div>
              )}
              <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
          {/* Gender */}
          <div>
            <select
              className="w-full rounded-md border-0 bg-white/50 px-4 py-3 font-medium text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={genDer}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male" className="text-black">
                male
              </option>
              <option value="female"className="text-black">
                female
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full transform rounded-full bg-sky-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-500"
          >
            Save Edit
          </button>
        </form>
      </div>
    </main>
  );
}
