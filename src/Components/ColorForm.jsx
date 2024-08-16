import { useState } from "react";
import React from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";

const ColorForm = ({ onAddColor }) => {
  const [role, setRole] = useState("primary main");
  const [hex, setHex] = useState("#ff4a11");
  const [contrastText, setContrastText] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddColor({ id: nanoid(), role, hex, contrastText });
  };
  return (
    <form onSubmit={handleSubmit} className="color_form">
      <div>
        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <ColorInput label="Hex" value={hex} onChange={setHex} />
      <ColorInput
        label="Contrast Text"
        value={contrastText}
        onChange={setContrastText}
      />
      <button type="submit">Add Color</button>
    </form>
  );
};

export default ColorForm;
