import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors";
import ColorCard from "./Components/Color/ColorCard";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeManager from "./Components/ColorForm/Theme";
import { nanoid } from "nanoid";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  const handleThemeChange = (themeColors) => {
    const themeColorsArray = themeColors.map(({ role, hex, contrastText }) => ({
      id: nanoid(),
      role,
      hex,
      contrastText: contrastText || "#ffffff",
    }));
    setColors([...themeColorsArray, ...colors]);
  };

  const handleAddColor = (color) => {
    setColors([color, ...colors]);
  };

  const handleDeleteColor = (id) => {
    setColors(colors.filter((color) => color.id !== id));
  };

  const handleUpdateColor = (updatedColor) => {
    setColors(
      colors.map(
        (color) => (color.id === updatedColor.id ? updatedColor : color) // Ersetze die Farbe mit der aktualisierten Version
      )
    );
  };

  return (
    <div>
      <h1>Color Theme Creator App</h1>
      <ThemeManager onThemeChange={handleThemeChange} />{" "}
      <ColorForm onAddColor={handleAddColor} />{" "}
      {colors.length === 0 ? (
        <p className="no-colors-message">
          No colors left. Please add new colors.
        </p>
      ) : (
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              <ColorCard
                color={color}
                onDelete={handleDeleteColor}
                onUpdate={handleUpdateColor}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
