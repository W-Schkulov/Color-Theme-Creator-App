import "./ColorInput.css";

// Exportiert die Komponente "ColorInput" als Standardexport
export default function ColorInput({ label, value, onChange }) {
  return (
    <div className="color-input">
      {/* Zeigt das übergebene Label an */}
      <label>{label}</label>

      {/* Textfeld für die Eingabe, der Wert und die Änderungen werden durch Props gesteuert */}
      <input
        type="text"
        value={value} // Der aktuelle Wert des Eingabefelds, wird durch die "value"-Prop festgelegt
        onChange={(event) => onChange(event.target.value)} // Ruft die "onChange"-Funktion auf, wenn der Benutzer den Wert ändert
      />
    </div>
  );
}
