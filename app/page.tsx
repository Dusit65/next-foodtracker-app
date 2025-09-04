import Image from "next/image";
import foodbanner from "./images/foodbanner.jpg";
import Link from "next/link";

export default function HoemPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-300 p-4 font-sans text-center text-white">
      {/* Main content container with a vibrant gradient background */}
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-white/30 p-8 shadow-xl backdrop-blur-md">
        {/* Main heading */}
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Welcome to Food Tracker
        </h1>

        {/* Subheading */}
        <p className="mb-8 text-lg font-medium text-white sm:text-xl">
          Track your meal!!!
        </p>

        {/* Food Tracker image */}
        <div className="mb-10 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg sm:w-64">
           
          <Image
            src={foodbanner}
            alt="Food Tracker"
            width={300}
            height={200}
          />
        </div>

        {/* Button container */}
        <a href="/login" className="items-center w-full transform rounded-full bg-white px-8 py-3 font-semibold text-sky-600 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-50 sm:w-auto">
            Login
          </a>
          <br />
        <a href="/register" className="items-center w-full transform rounded-full bg-white px-8 py-3 font-semibold text-sky-600 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-sky-50 sm:w-auto">
            Register
          </a>
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 items-center">
          {/* Register Button */}
          

          {/* Login Button */}
          
        </div>
        <p>
            Copyright © 2025 Dusit65
          </p>
      </div>
    </main>
  );
}
