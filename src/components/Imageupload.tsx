"use client";

import React, { useState } from "react";

export const ImageUpload: React.FC<{
  onImageReady: (img: HTMLImageElement) => void;
}> = ({ onImageReady }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => onImageReady(img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        onChange={handleImageChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="mt-5 max-w-xs rounded"
        />
      )}
    </div>
  );
};
