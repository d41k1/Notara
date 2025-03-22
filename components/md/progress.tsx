"use client";
import React from "react";

type ChipItemProps = {
  progress: number;
  bgColor: string;
  height?: string;
  textSize?: string;
  showPercentage?: boolean;
};

const Progress: React.FC<ChipItemProps> = ({
  progress,
  bgColor,
  height = "h-3.5",
  textSize = "text-xs",
  showPercentage = true,
}) => {
  const progressPercentage = Math.floor(progress * 100);

  let isValidProgress = !Number.isNaN(progressPercentage);
  if (progressPercentage === 0) {
    isValidProgress = false;
  }

  return (
    <div className={`w-full ${height} bg-SurfaceContainer rounded-full`}>
      <div
        className={`h-full rounded-full flex justify-center items-center ${textSize} text-SurfaceBright font-semibold`}
        style={{
          backgroundColor: bgColor,
          width: `${isValidProgress ? progressPercentage : 0}%`,
        }}
      >
        {isValidProgress && showPercentage ? (
          <div>{progressPercentage}%</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Progress;
