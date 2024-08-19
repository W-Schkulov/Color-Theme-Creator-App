export default function Color({ color }) {
  return (
    <div
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
        padding: "20px",
        borderRadius: "5px",
        margin: "10px 0",
        textAlign: "center",
      }}
    >
      <h2>{color.role}</h2>
      <p>Hex: {color.hex}</p>
      <p>Contrast Text: {color.contrastText}</p>
    </div>
  );
}
