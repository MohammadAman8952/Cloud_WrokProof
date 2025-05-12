import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

const themes = ["theme-a", "theme-b", "theme-c"];

const App = () => {
  const [theme, setTheme] = useState(themes[0]);
  const [previewImg, setPreviewImg] = useState("/default-print.png"); // Add a default image to public folder

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: "athletic",
      textLine1: "",
      textLine2: "",
      textLine3: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "q") {
        setTheme((prev) => {
          const currentIndex = themes.indexOf(prev);
          return themes[(currentIndex + 1) % themes.length];
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen p-4 ${theme}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        {/* Left: Image Preview */}
        <div className="w-full h-full border p-2 flex flex-col items-center">
          <img src={previewImg} alt="T-Shirt Preview" className="w-full h-full object-contain" />
        </div>

        {/* Middle: Upload + Text */}
        <div className="space-y-4">
          {/* Drag or Upload Image */}
          <div className="border-2 border-dashed p-4 text-center">
            <label className="cursor-pointer">
              Upload Image
              <input type="file" onChange={handleImageUpload} hidden />
            </label>
            <div className="mt-2">
              <img src={previewImg} alt="Preview small" className="h-24 mx-auto" />
            </div>
          </div>

          {/* Text for Print */}
          <div className="space-y-2">
            <input
              {...register("textLine1", { maxLength: 30 })}
              placeholder="Line 1"
              className="w-full border p-2"
            />
            <input
              {...register("textLine2", { maxLength: 30 })}
              placeholder="Line 2"
              className="w-full border p-2"
            />
            <input
              {...register("textLine3", { maxLength: 30 })}
              placeholder="Line 3"
              className="w-full border p-2"
            />
          </div>
        </div>

        {/* Right: Form Inputs */}
        <div className="space-y-4 bg-gray-50 p-4 rounded">
          <div>
            <label>Height (cm)</label>
            <input {...register("height")} type="number" className="w-full p-2 border" />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input {...register("weight")} type="number" className="w-full p-2 border" />
          </div>
          <div>
            <label>Build</label>
            <select {...register("build")} className="w-full p-2 border">
              <option value="lean">Lean</option>
              <option value="reg">Regular</option>
              <option value="athletic">Athletic</option>
              <option value="big">Big</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
