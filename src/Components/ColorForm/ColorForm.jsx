import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onAddColor, // Funktion, die beim Hinzufügen einer neuen Farbe aufgerufen wird
  initialColor, // Anfangswert der Farbe, die bearbeitet werden soll, oder null, wenn eine neue Farbe hinzugefügt wird
  onSubmit, // Funktion, die beim Aktualisieren einer bestehenden Farbe aufgerufen wird
  onCancel, // Funktion, die beim Abbrechen der Bearbeitung aufgerufen wird
}) {
  // Zustand für die verschiedenen Eingabefelder initialisieren, entweder mit den Werten aus initialColor oder mit Standardwerten
  const [role, setRole] = useState(initialColor?.role || "");
  const [hex, setHex] = useState(initialColor?.hex || "#216d17");
  const [contrastText, setContrastText] = useState(
    initialColor?.contrastText || "#ffffff"
  );

  // useEffect-Hook, der die Eingabefelder aktualisiert, wenn sich initialColor ändert
  useEffect(() => {
    if (initialColor) {
      setRole(initialColor.role); // Rolle (Name) der Farbe setzen
      setHex(initialColor.hex); // Hex-Code der Farbe setzen
      setContrastText(initialColor.contrastText); // Kontrasttext-Farbe setzen
    }
  }, [initialColor]); // Abhängig von initialColor, um sicherzustellen, dass die Werte nur bei Änderung aktualisiert werden

  const handleSubmit = (event) => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seiten-Neuladen)

    const colorData = {
      id: initialColor?.id || nanoid(), // Wenn eine initialColor existiert, nutze ihre ID, andernfalls generiere eine neue ID
      role, // Rolle (Name) der Farbe
      hex, // Hex-Code der Farbe
      contrastText, // Hex-Code der Kontrasttextfarbe
    };

    if (initialColor) {
      onSubmit(colorData); // Wenn eine initialColor existiert, wird die Update-Funktion aufgerufen
    } else {
      onAddColor(colorData); // Andernfalls wird die Add-Funktion aufgerufen
    }

    if (!initialColor) {
      // Wenn keine initialColor vorhanden ist (also bei einer neuen Farbe), setze die Felder zurück
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
        value={role} // Wert des Eingabefeldes für die Rolle (Name der Farbe)
        onChange={(event) => setRole(event.target.value)} // Aktualisiere den Zustand bei Änderung des Eingabefeldes
        required // Das Eingabefeld ist erforderlich
      />
      <div className="color-input-container">
        <ColorInput label="Color" value={hex} onChange={setHex} />{" "}
        {/* Farbwert als Text-Eingabefeld */}
        <input
          type="color"
          value={hex} // Wert des Farbauswahl-Tools
          onChange={(event) => setHex(event.target.value)} // Aktualisiere den Zustand bei Änderung des Farbauswahl-Tools
          className="color-picker"
        />
      </div>
      <div className="color-input-container">
        <ColorInput
          label="Contrast Text"
          value={contrastText} // Wert des Eingabefeldes für die Kontrasttextfarbe
          onChange={setContrastText} // Aktualisiere den Zustand bei Änderung des Eingabefeldes
        />
        <input
          type="color"
          value={contrastText} // Wert des Farbauswahl-Tools für die Kontrasttextfarbe
          onChange={(event) => setContrastText(event.target.value)} // Aktualisiere den Zustand bei Änderung des Farbauswahl-Tools
          className="color-picker"
        />
      </div>
      <button type="submit" className="btn btn-submit">
        {initialColor ? "Update Color" : "Add Color"}{" "}
        {/* Zeigt je nach Modus entweder "Update Color" oder "Add Color" an */}
      </button>

      {initialColor && (
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancel{" "}
          {/* Zeigt einen Abbrechen-Button an, wenn eine Farbe bearbeitet wird */}
        </button>
      )}
    </form>
  );
}
