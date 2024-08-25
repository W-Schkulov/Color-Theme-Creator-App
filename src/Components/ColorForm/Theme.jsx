import { useState } from "react";

import { initialThemes } from "../../lib/colors";

import "./Theme.css";

// Exportiere die ThemeManager-Komponente als Standardexport
export default function ThemeManager({ onThemeChange }) {
  // Definiere den Zustand für die Liste der Themen
  const [themes, setThemes] = useState(initialThemes);

  // Definiere den Zustand für das ausgewählte Thema
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id);

  // Definiere den Zustand, ob ein Thema bearbeitet wird
  const [isEditing, setIsEditing] = useState(false);

  // Definiere den Zustand für den neuen Namen eines Themas
  const [newThemeName, setNewThemeName] = useState("");

  // Definiere den Zustand für die Bestätigungsabfrage zum Löschen eines Themas
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Definiere den Zustand für die Farben des ausgewählten Themas
  const [themeColors, setThemeColors] = useState({
    primaryMain: "",
    primaryDark: "",
    primaryLight: "",
  });

  // Funktion zur Auswahl eines Themas aus der Dropdown-Liste
  const handleThemeSelection = (event) => {
    const selectedThemeId = event.target.value; // Hole die ID des ausgewählten Themas aus dem Event
    setSelectedTheme(selectedThemeId); // Setze das ausgewählte Thema im Zustand

    // Finde das ausgewählte Thema in der Liste der Themen
    const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
    if (selectedTheme) {
      // Setze die Farben des ausgewählten Themas
      setThemeColors({
        primaryMain: selectedTheme.colors.find(
          (color) => color.role === "primary main"
        ).hex,
        primaryDark: selectedTheme.colors.find(
          (color) => color.role === "primary dark"
        ).hex,
        primaryLight: selectedTheme.colors.find(
          (color) => color.role === "primary light"
        ).hex,
      });

      // Rufe die Funktion auf, um die Farben des ausgewählten Themas anzuwenden
      onThemeChange(selectedTheme.colors);
    }
  };

  // Funktion zum Hinzufügen eines neuen Themas
  const handleAddTheme = () => {
    // Finde die Farben des ausgewählten Themas
    const selectedThemeColors = themes.find(
      (theme) => theme.id === selectedTheme
    )?.colors;

    if (selectedThemeColors) {
      // Rufe die Funktion auf, um die Farben des ausgewählten Themas hinzuzufügen
      onThemeChange(selectedThemeColors);
    }
  };

  // Funktion zum Löschen des ausgewählten Themas
  const handleDeleteTheme = () => {
    // Filtere das ausgewählte Thema aus der Liste der Themen heraus
    const updatedThemes = themes.filter((theme) => theme.id !== selectedTheme);
    setThemes(updatedThemes); // Aktualisiere den Zustand mit den verbleibenden Themen

    // Setze das nächste verfügbare Thema als ausgewählt, wenn noch Themen vorhanden sind
    if (updatedThemes.length > 0) {
      setSelectedTheme(updatedThemes[0].id);
    } else {
      setSelectedTheme(""); // Setze das ausgewählte Thema auf leer, wenn keine Themen mehr verfügbar sind
    }

    setIsConfirmingDelete(false); // Setze den Zustand für die Löschbestätigung zurück
  };

  // Funktion zum Bearbeiten des ausgewählten Themas
  const handleEditTheme = () => {
    // Aktualisiere die Liste der Themen mit dem bearbeiteten Thema
    const updatedThemes = themes.map(
      (theme) =>
        theme.id === selectedTheme
          ? {
              ...theme, // Behalte alle anderen Eigenschaften des Themas bei
              name: newThemeName, // Aktualisiere den Namen des Themas
              colors: theme.colors.map((color) => {
                // Aktualisiere die Farben basierend auf der Rolle
                if (color.role === "primary main") {
                  return { ...color, hex: themeColors.primaryMain };
                } else if (color.role === "primary dark") {
                  return { ...color, hex: themeColors.primaryDark };
                } else if (color.role === "primary light") {
                  return { ...color, hex: themeColors.primaryLight };
                } else {
                  return color; // Behalte die Farbe bei, wenn sie nicht geändert wurde
                }
              }),
            }
          : theme // Behalte das Thema bei, wenn es nicht das ausgewählte ist
    );

    setThemes(updatedThemes); // Aktualisiere den Zustand mit den geänderten Themen
    setIsEditing(false); // Beende den Bearbeitungsmodus
  };

  // Funktion zum Ändern einer spezifischen Farbe des Themas
  const handleColorChange = (role, newColor) => {
    setThemeColors((prevColors) => ({
      ...prevColors, // Behalte die bestehenden Farben bei
      [role]: newColor, // Ändere die Farbe für die spezifische Rolle
    }));
  };

  // Rückgabeteil der Komponente
  return (
    <div>
      {/* Dropdown zur Auswahl eines Themas */}
      <select value={selectedTheme} onChange={handleThemeSelection}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name} {/* Name des Themas anzeigen */}
          </option>
        ))}
      </select>

      {/* Button zum Hinzufügen eines neuen Themas */}
      <button className="btn_theme" onClick={handleAddTheme}>
        Add Theme
      </button>

      {/* Überprüfen, ob der Benutzer das Löschen eines Themas bestätigt */}
      {isConfirmingDelete ? (
        <div>
          <p>Are you sure you want to delete this theme?</p>{" "}
          {/* Bestätigungstext */}
          <button onClick={handleDeleteTheme}>Yes, Delete</button>{" "}
          {/* Löschen bestätigen */}
          <button onClick={() => setIsConfirmingDelete(false)}>
            Cancel
          </button>{" "}
          {/* Löschen abbrechen */}
        </div>
      ) : (
        <button
          className="btn_theme"
          onClick={() => setIsConfirmingDelete(true)}
        >
          Delete Theme {/* Löschen-Button anzeigen */}
        </button>
      )}

      {/* Überprüfen, ob das Thema bearbeitet wird */}
      {isEditing ? (
        <div>
          {/* Eingabefeld zur Eingabe eines neuen Themennamens */}
          <input
            type="text"
            value={newThemeName}
            onChange={(event) => setNewThemeName(event.target.value)}
            placeholder="Enter new theme name"
          />
          <div>
            <label>Primary Main: </label>
            {/* Farbwahl für die Hauptfarbe */}
            <input
              type="color"
              value={themeColors.primaryMain}
              onChange={(event) =>
                handleColorChange("primaryMain", event.target.value)
              }
            />
          </div>
          <div>
            <label>Primary Dark: </label>
            {/* Farbwahl für die dunkle Farbe */}
            <input
              type="color"
              value={themeColors.primaryDark}
              onChange={(event) =>
                handleColorChange("primaryDark", event.target.value)
              }
            />
          </div>
          <div>
            <label>Primary Light: </label>
            {/* Farbwahl für die helle Farbe */}
            <input
              type="color"
              value={themeColors.primaryLight}
              onChange={(event) =>
                handleColorChange("primaryLight", event.target.value)
              }
            />
          </div>
          <button onClick={handleEditTheme}>Save</button>{" "}
          {/* Änderungen speichern */}
          <button onClick={() => setIsEditing(false)}>Cancel</button>{" "}
          {/* Bearbeitung abbrechen */}
        </div>
      ) : (
        <button
          className="btn_theme"
          onClick={() => {
            setIsEditing(true); // Setzt den Bearbeitungsmodus auf "true"
            const theme = themes.find((theme) => theme.id === selectedTheme); // Findet das aktuell ausgewählte Thema
            setNewThemeName(theme?.name || ""); // Setzt den Namen des neuen Themas (falls vorhanden)
            setThemeColors({
              primaryMain:
                theme?.colors.find((color) => color.role === "primary main")
                  .hex || "", // Setzt die Hauptfarbe des Themas
              primaryDark:
                theme?.colors.find((color) => color.role === "primary dark")
                  .hex || "", // Setzt die dunkle Farbe des Themas
              primaryLight:
                theme?.colors.find((color) => color.role === "primary light")
                  .hex || "", // Setzt die helle Farbe des Themas
            });
          }}
        >
          Edit Theme {/* Button zum Bearbeiten des Themas */}
        </button>
      )}
    </div>
  );
}
