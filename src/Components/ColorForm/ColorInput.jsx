import "./ColorInput.css";

export default function ColorInput({ label, value, onChange }) {
  return (
    <li className="color-input">
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
      />
    </li>
  );
}
