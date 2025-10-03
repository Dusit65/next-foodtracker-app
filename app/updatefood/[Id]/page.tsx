"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/libs/supabaseClient";
import Image from "next/image";

export default function EditFoodPage() {
  const router = useRouter();
  const params = useParams();
  const foodId = params?.id;

  const [foodname, setFoodName] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [oldFoodImg, setOldFoodImg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ดึงข้อมูลจาก Supabase
  useEffect(() => {
    //Fetch food data by id and set to state แสดงข้อมูลที่ดึงมาใน state
    async function fetchfoodById() {
      const { data, error } = await supabase
        .from("food_tb")
        .select("*")
        .eq("id", foodId)
        .single(); //ดึงมาแค่ 1 record/row
      //if error found
      if (error) {
        alert("ไม่สามารถดึงข้อมูลได้TwT โปรดลองใหม่อีกครั้ง");
        console.log(error.message, "ดึงข้อมูลไม่สำเร็จTwT❌");
        return;
      } else {
        //success set data to state
        console.log("ดึงข้อมูลสำเร็จ✅");
        console.log(data);
        setFoodName(data.foodname);
        setMeal(data.meal);
        setPreviewImage(data.food_image_url);
      }
    }
    fetchfoodById();
  }, [foodId]);

  // Handle file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoodImage(file);
      // Blob preview ใช้ <img>
      setPreviewImage(URL.createObjectURL(file));
      setOldFoodImg(previewImage); //เก็บ url รูปเก่าไว้ใน state
    }
  };

  const handleUpdateFood = async (event: React.FormEvent) => {
    event.preventDefault();
    //upload img to supabase
    let imageFoodUrl = previewImage || ""; //variable to store img url in supabase
    //Upload img with changed file name
    if (foodImage) {
      //if require delete old img to upload new img ต้องการลบรูปเก่าเพื่ออัพโหลดรูปใหม่
      const fileImgName = oldFoodImg?.split("/food_bk/")[1]; //option 1
      // const fileImgName = oldImg?.split("/").pop(); //option 2
      await supabase.storage.from("food_bk").remove([fileImgName!]); //เอาชื่อไฟล์รูปเก่าไปลบออกจาก storage supabase
      console.log("ลบรูปเก่าออกจาก food_bk สำเร็จ✅");
      //=========================================================

      //validate image
      const newImgFileName = `${Date.now()}-${foodImage.name}`; //create new file name
      const { error } = await supabase.storage
        .from("food_bk")
        .upload(newImgFileName, foodImage);
      if (error) {
        //Upload Failed
        alert("ไม่สามารถบันทึกรูปลง supabase ได้TwT❌");
        console.log(error.message);
        return;
      } else {
        //Upload Success
        const { data } = await supabase.storage
          .from("food_bk")
          .getPublicUrl(newImgFileName);
        imageFoodUrl = data.publicUrl;
      }
    }
    //Update data to supabase
    const { error } = await supabase
      .from("food_tb")
      .update({
        foodname: foodname,
        meal: meal,
        food_image_url: imageFoodUrl,
        update_at: new Date(), //update วันที่แก้ไข
      })
      .eq("id", foodId);
    if (error) {
      alert("ไม่สามารถแก้ไขข้อมูลอาหารได้TwT❌");
      console.log(error.message);
      return;
    } else {
      //display success message and return to alltask page
      alert("แก้ไขข้อมูลอาหารสําเร็จ✅");
      router.push("/dashboard");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 font-sans text-gray-100">
      <div className="absolute left-4 top-4">
        <a
          href="/dashboard"
          className="flex items-center gap-2 text-gray-300 hover:text-gray-100 font-semibold"
        >
          <ArrowLeft size={20} /> Back to dashboard
        </a>
      </div>

      <div className="flex w-full max-w-lg flex-col items-center rounded-2xl bg-gray-500 p-8 shadow-2xl backdrop-blur-md border border-gray-700">
        <h1 className="mb-6 text-3xl font-extrabold text-gray-100 sm:text-4xl">
          Edit Food
        </h1>

        <form onSubmit={handleUpdateFood} className="w-full space-y-6">
          <input
            type="text"
            value={foodname}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Food Name"
            className="w-full border border-gray-600 bg-gray-700/70 px-6 py-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700/70 px-6 py-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>

          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center py-4">
            <div
              className="flex flex-col items-center justify-center 
                text-white px-6 py-4 rounded-2xl 
               cursor-pointer hover:bg-gray-600 hover:border-dashed hover:border-white shadow-lg border-4 border-gray-700"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {previewImage ? (
                <div className="mt-2 flex items-center justify-center">
                  {previewImage.startsWith("blob:") ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-40 w-40 rounded-2xl object-cover "
                    />
                  ) : (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={160}
                      height={160}
                      className="rounded-2xl  object-cover "
                    />
                  )}
                </div>
              ) : (
                <p>กดที่นี่เพื่อเลือกรูป</p>
              )}
            </div>
          </div>
          {/*Update Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full transform  bg-indigo-500 px-8 py-4 font-semibold text-gray-100 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-600 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save"}
          </button>
        </form>

        {showSaveMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70">
            <div className="rounded-lg bg-indigo-600 px-8 py-6 text-white text-center shadow-lg">
              <p className="font-bold">Save Successful✅</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
