import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#ff0000");
  const [contrastText, setContrastText] = useState("#ffffff");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newColor = {
      id: nanoid(),
      role,
      hex,
      contrastText,
    };

    onAddColor(newColor);

    setRole("");
    setHex("#ff0000");
    setContrastText("#ffffff");
  };

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label>Role</label>
      <input
        type="text"
        value={role}
        onChange={(event) => setRole(event.target.value)}
        required
      />

      <ColorInput label="Color" value={hex} onChange={setHex} />
      <ColorInput
        type="color"
        label="Contrast Text"
        value={contrastText}
        onChange={setContrastText}
      />

      <button type="submit">Add Color</button>
    </form>
  );
}
