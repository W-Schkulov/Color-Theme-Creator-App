import { useState } from "react";
import { initialThemes } from "../../lib/colors"; // Importiere initialThemes

export default function ThemeManager({ onThemeChange }) {
  const [themes, setThemes] = useState(initialThemes); // Nutze initialThemes direkt aus dem Import
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id); // Setze das erste Theme als Standard
  const [isEditing, setIsEditing] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [themeColors, setThemeColors] = useState({
    primaryMain: "",
    primaryDark: "",
    primaryLight: "",
  });

  const handleThemeSelection = (event) => {
    const selectedThemeId = event.target.value;
    setSelectedTheme(selectedThemeId);
    const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
    if (selectedTheme) {
      setThemeColors({
        primaryMain: selectedTheme.colors.find((c) => c.role === "primary main")
          .hex,
        primaryDark: selectedTheme.colors.find((c) => c.role === "primary dark")
          .hex,
        primaryLight: selectedTheme.colors.find(
          (c) => c.role === "primary light"
        ).hex,
      });
      onThemeChange(selectedTheme.colors);
    }
  };

  const handleAddTheme = () => {
    const selectedThemeColors = themes.find(
      (theme) => theme.id === selectedTheme
    )?.colors;
    if (selectedThemeColors) {
      onThemeChange(selectedThemeColors); // Fügt die Farben des ausgewählten Themes hinzu
    }
  };

  const handleDeleteTheme = () => {
    const updatedThemes = themes.filter((theme) => theme.id !== selectedTheme);
    setThemes(updatedThemes);

    if (updatedThemes.length > 0) {
      setSelectedTheme(updatedThemes[0].id); // Setze das nächste verfügbare Theme als ausgewählt
    } else {
      setSelectedTheme(""); // Kein Theme mehr verfügbar
    }

    setIsConfirmingDelete(false); // Rücksetzen der Bestätigungsabfrage
  };

  const handleEditTheme = () => {
    const updatedThemes = themes.map((theme) =>
      theme.id === selectedTheme
        ? {
            ...theme,
            name: newThemeName,
            colors: theme.colors.map((color) => {
              if (color.role === "primary main") {
                return { ...color, hex: themeColors.primaryMain };
              } else if (color.role === "primary dark") {
                return { ...color, hex: themeColors.primaryDark };
              } else if (color.role === "primary light") {
                return { ...color, hex: themeColors.primaryLight };
              } else {
                return color;
              }
            }),
          }
        : theme
    );
    setThemes(updatedThemes);
    setIsEditing(false);
  };

  const handleColorChange = (role, newColor) => {
    setThemeColors((prevColors) => ({
      ...prevColors,
      [role]: newColor,
    }));
  };

  return (
    <div>
      <select value={selectedTheme} onChange={handleThemeSelection}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddTheme}>Add Theme</button>
      {isConfirmingDelete ? (
        <div>
          <p>Are you sure you want to delete this theme?</p>
          <button onClick={handleDeleteTheme}>Yes, Delete</button>
          <button onClick={() => setIsConfirmingDelete(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsConfirmingDelete(true)}>
          Delete Theme
        </button>
      )}

      {isEditing ? (
        <div>
          <input
            type="text"
            value={newThemeName}
            onChange={(e) => setNewThemeName(e.target.value)}
            placeholder="Enter new theme name"
          />
          <div>
            <label>Primary Main: </label>
            <input
              type="color"
              value={themeColors.primaryMain}
              onChange={(e) => handleColorChange("primaryMain", e.target.value)}
            />
          </div>
          <div>
            <label>Primary Dark: </label>
            <input
              type="color"
              value={themeColors.primaryDark}
              onChange={(e) => handleColorChange("primaryDark", e.target.value)}
            />
          </div>
          <div>
            <label>Primary Light: </label>
            <input
              type="color"
              value={themeColors.primaryLight}
              onChange={(e) =>
                handleColorChange("primaryLight", e.target.value)
              }
            />
          </div>
          <button onClick={handleEditTheme}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            const theme = themes.find((theme) => theme.id === selectedTheme);
            setNewThemeName(theme?.name || "");
            setThemeColors({
              primaryMain:
                theme?.colors.find((c) => c.role === "primary main").hex || "",
              primaryDark:
                theme?.colors.find((c) => c.role === "primary dark").hex || "",
              primaryLight:
                theme?.colors.find((c) => c.role === "primary light").hex || "",
            });
          }}
        >
          Edit Theme
        </button>
      )}
    </div>
  );
}
