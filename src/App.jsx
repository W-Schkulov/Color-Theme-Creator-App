import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);
  const handleAddColor = (color) => {
    setColors([...colors, color]);
  };
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      <li key={color.id}>
        <Color color={color} />
      </li>
      ;
    </>
  );
}
export default App;
