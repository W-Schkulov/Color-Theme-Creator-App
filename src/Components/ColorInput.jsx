import React from "react";

const ColorInput = ({ label, value, onChange }) => {
  return (
    <div className="color-input">
      <label>{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
};
export default ColorInput;
