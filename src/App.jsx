import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (color) => {
    setColors([...colors, color]);
  };

  const handleDeleteColor = (id) => {
    setColors(colors.filter((color) => color.id !== id));
  };

  const handleUpdateColor = (updatedColor) => {
    setColors(
      colors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      {colors.length === 0 ? (
        <p className="no-colors-message">
          No colors left. Please add new colors.
        </p>
      ) : (
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              <Color
                color={color}
                onDelete={handleDeleteColor}
                onUpdate={handleUpdateColor}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
