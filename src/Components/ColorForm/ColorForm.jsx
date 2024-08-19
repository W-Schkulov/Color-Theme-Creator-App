import { useState } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#ff0000");
  const [contrastText, setContrastText] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <ul>
        <li>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </li>
        <ColorInput label="Color" value={hex} onChange={setHex} />
        <ColorInput
          label="Contrast Text"
          value={contrastText}
          onChange={setContrastText}
        />
        <li>
          <button type="submit">Add Color</button>
        </li>
      </ul>
    </form>
  );
}
