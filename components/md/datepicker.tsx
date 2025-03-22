import React from "react";

const formatDateToLocalInputValue = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

type InputItemProps = {
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const DatePicker: React.FC<InputItemProps> = ({ label, value, onChange }) => {
  const formattedValue = formatDateToLocalInputValue(value || "");

  return (
    <div className="w-full max-w-full min-w-[200px]">
      <div className="relative">
        <input
          type="datetime-local"
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 placeholder-transparent"
          placeholder=""
          value={formattedValue}
          onChange={onChange}
        />
        <label className="absolute cursor-text bg-SurfaceBright px-1 left-2.5 -top-2 text-slate-400 text-xs transition-all duration-300 ease transform  peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-placeholder-shown:left-2.5 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base">
          {label}
        </label>
      </div>
    </div>
  );
};

export default DatePicker;
