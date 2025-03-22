import React from "react";

type IconButtonProps = {
  icon: string;
  isFilled?: boolean;
  onClick?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  isFilled = false,
  onClick,
}) => {
  return (
    <button
      className={`pointer-events-none material-symbols-rounded text-MdPrimary ${
        isFilled ? "text-MdPrimary fill" : "text-SurfaceDim"
      } hover:bg-gray-200 rounded-full`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
