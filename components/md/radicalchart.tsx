"use client";
import React from "react";

const RadicalChart = ({ total, done }: { total: number; done: number }) => {
  let ratio = Math.floor((done / total) * 100);
  if (isNaN(ratio)) {
    ratio = 0;
  }
  const strokeWidth = ratio === 0 ? 0 : 2;
  return (
    <div className="relative size-40">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-SurfaceContainer"
          strokeWidth="2"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-MdPrimary"
          strokeWidth={strokeWidth}
          strokeDasharray="100"
          strokeDashoffset={100 - ratio}
          strokeLinecap="round"
        ></circle>
      </svg>
      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className="text-center text-3xl font-bold ">{ratio}%</span>
      </div>
    </div>
  );
};

export default RadicalChart;
