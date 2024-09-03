"use client";

import { useEffect, useState } from "react";

function InputSelect({ name, placeholder, value, options = [], onChange }) {
  const [selected, setSelected] = useState(value || "");

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) {
      onChange(e); // Asegúrate de que onChange esté definido antes de llamarlo
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value); // Actualiza el estado seleccionado cuando el prop value cambie
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <select
        name={name}
        onChange={handleChange}
        value={selected}
        className={`w-full bg-white rounded-3xl h-[2rem] px-3 border border-celeste outline-none cursor-pointer ${
          selected === "" ? "text-[#b4b9c3]" : "text-black"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label || option.value} {/* Asegúrate de mostrar la etiqueta o valor */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
