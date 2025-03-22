import React from "react";
import "material-symbols";

type Option = {
  label: string;
  value: string | boolean;
};

type SelectProps = {
  options: Option[];
  label: string;
  value?: string | boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select: React.FC<SelectProps> = ({ options, label, value, onChange }) => {
  return (
    <div className="w-full max-w-full min-w-[200px] h-14">
      <div className="relative">
        <select
          className="peer w-full px-3 py-2 rounded-md bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 appearance-none cursor-pointer"
          value={value !== undefined ? value.toString() : "false"}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value.toString()}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-3 text-slate-700 cursor-pointer">
          <span className="material-symbols-rounded">arrow_drop_down</span>
        </div>
        <label className="absolute left-2.5 -top-2 text-slate-400 text-xs transition-all transform  cursor-text bg-SurfaceBright px-1">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Select;
