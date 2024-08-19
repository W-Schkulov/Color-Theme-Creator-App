import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = (color) => {
    // console.log("Adding color:", color);
    setColors([...colors, color]);
  };

  return (
    <> <ul>
      <h1>Theme Creator</h1>
   
      <ColorForm onAddColor={handleAddColor} />
      <ul>
        {colors.map((currentArrayItem) => (
          <li key={currentArrayItem.id}>
            <Color color={currentArrayItem} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
