"use client";

import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { ImageUpload } from "./Imageupload";

export const ImageClassifier: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [prediction, setPrediction] = useState<{
    className: string;
    probability: number;
  } | null>(null);

  const classifyImage = async () => {
    if (image) {
      await tf.ready();
      const model = await mobilenet.load();
      const newPredictions = await model.classify(image);

      const mostLikelyPrediction = newPredictions.reduce((prev, current) => {
        return prev.probability > current.probability ? prev : current;
      });

      setPrediction(mostLikelyPrediction);
    }
  };

  useEffect(() => {
    if (prediction) {
      console.log(prediction);
    }
  }, [prediction]);

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <ImageUpload onImageReady={(img) => setImage(img)} />
      <button
        onClick={classifyImage}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-5 hover:bg-blue-700 transition duration-300"
      >
        Classify Image
      </button>
      {prediction && (
        <div className="mt-5 p-3 border border-gray-300 rounded shadow">
          <p className="text-lg font-semibold">{`Prediction: ${prediction.className}`}</p>
          <p className="text-sm text-gray-600">{`Probability: ${(
            prediction.probability * 100
          ).toFixed(2)}%`}</p>
        </div>
      )}
    </div>
  );
};
