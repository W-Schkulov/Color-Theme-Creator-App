import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onAddColor,
  initialColor,
  onSubmit,
  onCancel,
}) {
  const [role, setRole] = useState(initialColor?.role || "");
  const [hex, setHex] = useState(initialColor?.hex || "#216d17");
  const [contrastText, setContrastText] = useState(
    initialColor?.contrastText || "#ffffff"
  );

  useEffect(() => {
    if (initialColor) {
      setRole(initialColor.role);
      setHex(initialColor.hex);
      setContrastText(initialColor.contrastText);
    }
  }, [initialColor]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const colorData = {
      id: initialColor?.id || nanoid(),
      role,
      hex,
      contrastText,
    };

    if (initialColor) {
      onSubmit(colorData);
    } else {
      onAddColor(colorData);
    }

    if (!initialColor) {
      setRole("");
      setHex("#216d17");
      setContrastText("#ffffff");
    }
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
      <div className="color-input-container">
        <ColorInput label="Color" value={hex} onChange={setHex} />{" "}
        <input
          type="color"
          value={hex}
          onChange={(event) => setHex(event.target.value)}
          className="color-picker"
        />
      </div>
      <div className="color-input-container">
        <ColorInput
          label="Contrast Text"
          value={contrastText}
          onChange={setContrastText}
        />
        <input
          type="color"
          value={contrastText}
          onChange={(event) => setContrastText(event.target.value)}
          className="color-picker"
        />
      </div>
      <button type="submit" className="btn btn-submit">
        {initialColor ? "Update Color" : "Add Color"}{" "}
      </button>

      {initialColor && (
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancel{" "}
        </button>
      )}
    </form>
  );
}
