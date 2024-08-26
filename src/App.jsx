import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors";
import ColorCard from "./Components/Color/ColorCard";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeManager from "./Components/ColorForm/Theme";
import { nanoid } from "nanoid";

function App() {
  // Verwende einen benutzerdefinierten Hook useLocalStorageState, um den Zustand "colors" zu verwalten,
  // der im lokalen Speicher des Browsers gespeichert wird. Initialer Wert ist "initialColors".
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  // Funktion, die aufgerufen wird, wenn das Thema geändert wird.
  // Nimmt die Farben des Themas und fügt sie der aktuellen Farbliste hinzu.
  const handleThemeChange = (themeColors) => {
    const themeColorsArray = themeColors.map(({ role, hex, contrastText }) => ({
      id: nanoid(), // Erstelle neue eindeutige IDs für die Farben
      role, // Rolle der Farbe (z.B. primary, secondary)
      hex, // Hexadezimalwert der Farbe
      contrastText: contrastText || "#ffffff", // Textfarbe mit Kontrast, Standard ist weiß
    }));
    setColors([...themeColorsArray, ...colors]); // Neue Farben hinzufügen, ohne bestehende zu überschreiben
  };

  // Funktion zum Hinzufügen einer neuen Farbe zur Farbliste
  const handleAddColor = (color) => {
    setColors([color, ...colors]); // Neue Farbe an den Anfang der Liste setzen
  };

  // Funktion zum Löschen einer Farbe anhand ihrer ID
  const handleDeleteColor = (id) => {
    setColors(colors.filter((color) => color.id !== id)); // Filtere die Farbe aus der Liste heraus
  };

  // Funktion zum Aktualisieren einer vorhandenen Farbe
  const handleUpdateColor = (updatedColor) => {
    setColors(
      colors.map(
        (color) => (color.id === updatedColor.id ? updatedColor : color) // Ersetze die Farbe mit der aktualisierten Version
      )
    );
  };

  // Rendern der App-Komponente
  return (
    <div>
      <h1>Color Theme Creator App</h1>
      {/* ThemeManager-Komponente, die die Funktion handleThemeChange verwendet */}
      <ThemeManager onThemeChange={handleThemeChange} />{" "}
      {/* ColorForm-Komponente, die die Funktion handleAddColor verwendet */}
      <ColorForm onAddColor={handleAddColor} />{" "}
      {/* Überprüfen, ob es keine Farben mehr gibt */}
      {colors.length === 0 ? (
        <p className="no-colors-message">
          No colors left. Please add new colors.
        </p>
      ) : (
        // Wenn Farben vorhanden sind, liste sie auf
        <ul>
          {colors.map((color) => (
            <li key={color.id}>
              <ColorCard
                color={color} // Farbe als Prop übergeben
                onDelete={handleDeleteColor} // Löschfunktion als Prop übergeben
                onUpdate={handleUpdateColor} // Aktualisierungsfunktion als Prop übergeben
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Exportiere die App-Komponente als Standardexport
export default App;
