"use client";
import "material-symbols";

type ChipItemProps = {
  icon: string;
  label: string;
  onDelete?: () => void;
  trailing_text?: string;
  trailing_icon?: string;
};

const Chip: React.FC<ChipItemProps> = ({
  icon,
  label,
  onDelete,
  trailing_text,
  trailing_icon,
}) => {
  return (
    <div className="h-8 py-1 pl-2 pr-2 rounded-full border border-gray-300  flex justify-between items-center gap-2">
      <div className="flex flex-col justify-center">
        <span className="material-symbols-rounded !text-[18px]">{icon}</span>
      </div>
      <div className="inline-flex items-center text-xs whitespace-nowrap">
        {label}
      </div>
      <div className="inline-flex items-center text-xs whitespace-nowrap">
        {trailing_text}
      </div>
      <div className="flex flex-col justify-center">
        <span className="material-symbols-rounded !text-[18px]">
          {trailing_icon}
        </span>
      </div>
      {onDelete && (
        <div className="flex flex-col justify-center cursor-pointer">
          <span
            className="material-symbols-rounded !text-[18px]"
            onClick={onDelete}
          >
            close
          </span>
        </div>
      )}
    </div>
  );
};

export default Chip;
