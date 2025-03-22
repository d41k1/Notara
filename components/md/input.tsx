import React from "react";
type InputItemProps = {
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputItemProps> = ({ label, value, onChange }) => {
  return (
    <div className="w-full max-w-full min-w-[200px]">
      <div className="relative">
        <input
          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 placeholder-transparent"
          placeholder=" "
          value={value}
          onChange={onChange}
        />
        <label className="absolute cursor-text bg-SurfaceBright px-1 left-2.5 -top-2 text-slate-400 text-xs transition-all duration-300 ease transform  peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400  peer-placeholder-shown:left-2.5 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
