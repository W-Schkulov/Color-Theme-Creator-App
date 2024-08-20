import "./ColorInput.css";

export default function ColorInput({ label, value, onChange }) {
  return (
    <div className="color-input">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
