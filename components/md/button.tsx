import React from "react";

type ButtonItemProps = {
  label: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonItemProps> = ({
  label,
  bgColor = "bg-white",
  textColor = "text-black",
  borderColor = "border-gray-200",
  hoverBgColor = "hover:bg-gray-200",
  onClick,
}) => {
  return (
    <button
      className={`h-10 px-6 ${bgColor} ${textColor} ${hoverBgColor} rounded-full border ${borderColor} whitespace-nowrap`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
