import React from "react";

interface inputProps {
  id?: string;
  onChange?: any;
  value?: string | number;
  label?: string;
  type?: any;
}

const Input: React.FC<inputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <select
        value={}
        className="
          block
          rounded-md 
          px-6
          pt-6
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-non
          focus:outline-none
          focus:ring-0
          peer
          "
        name=""
        id=""
      ></select>
      <label
        htmlFor={id}
        className="
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-4
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:-translate-y-1
          peer-focus:scale-75
          peer-focus:-translate-y-4
        "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
