import React from "react";

type TextFieldItemProps = {
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const TextField: React.FC<TextFieldItemProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <div className="w-full max-w-full min-w-[200px]">
        <div className="relative">
          <textarea
            className="peer w-full resize-none hidden-scrollbar bg-transparent placeholder:text-transparent text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
            placeholder=" "
            value={value}
            onChange={onChange}
          ></textarea>
          <label className="absolute cursor-text bg-SurfaceBright px-1 left-2.5 -top-2 text-slate-400 text-xs transition-all duration-300 ease transform peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
};

export default TextField;
