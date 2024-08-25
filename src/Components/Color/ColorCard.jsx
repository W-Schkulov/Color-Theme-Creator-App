import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../ColorForm/CopyToClipboard";
import ContrastScore from "../ColorForm/ContrastScore";

export default function ColorCard({ color, onDelete, onUpdate }) {
  // ColorCard-Komponente, die eine Farbe anzeigt und die Bearbeitung oder das Löschen ermöglicht

  const [isConfirming, setIsConfirming] = useState(false); // Zustand, ob die Löschung bestätigt werden soll
  const [isEditing, setIsEditing] = useState(false); // Zustand, ob die Farbe bearbeitet wird

  const handleDeleteClick = () => {
    setIsConfirming(true); // Setzt den Zustand auf "Bestätigung der Löschung anzeigen"
  };

  const confirmDelete = () => {
    onDelete(color.id); // Ruft die onDelete-Funktion auf, um die Farbe zu löschen
  };

  const cancelDelete = () => {
    setIsConfirming(false); // Setzt den Zustand zurück, um die Bestätigung der Löschung abzubrechen
  };

  const handleEditClick = () => {
    setIsEditing(true); // Setzt den Zustand auf "Bearbeitungsmodus aktivieren"
  };

  const handleFormSubmit = (updatedColor) => {
    onUpdate(updatedColor); // Ruft die onUpdate-Funktion auf, um die Farbe mit den neuen Werten zu aktualisieren
    setIsEditing(false); // Schaltet den Bearbeitungsmodus wieder aus
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Schaltet den Bearbeitungsmodus ohne Änderungen wieder aus
  };

  return (
    <div
      className="color-card" // Setzt die CSS-Klasse für das Farbkarten-Element
      style={{ backgroundColor: color.hex, color: color.contrastText }} // Setzt die Hintergrundfarbe und die Textfarbe basierend auf den übergebenen Farbwerten
    >
      {isConfirming ? ( // Wenn der Löschvorgang bestätigt werden soll
        <div className="color_card_highlight">
          <p>Are you sure you want to delete this color?</p>{" "}
          {/* Bestätigungsnachricht */}
          <button className="btn_delete" onClick={confirmDelete}>
            Yes, Delete {/* Button zum Bestätigen der Löschung */}
          </button>
          <button className="btn_cancel" onClick={cancelDelete}>
            Cancel {/* Button zum Abbrechen der Löschung */}
          </button>
        </div>
      ) : isEditing ? ( // Wenn die Farbe bearbeitet wird
        <ColorForm
          initialColor={color} // Übergibt die aktuelle Farbe an das Formular
          onSubmit={handleFormSubmit} // Übergibt die Funktion, die beim Absenden des Formulars aufgerufen wird
          onCancel={handleCancelEdit} // Übergibt die Funktion, die beim Abbrechen der Bearbeitung aufgerufen wird
        />
      ) : (
        <>
          {" "}
          {/* Standardanzeige der Farbkarte */}
          <h2>{color.role}</h2> {/* Anzeige des Farbnamens oder der Rolle */}
          <p>Hex: {color.hex}</p> {/* Anzeige des Hex-Codes */}
          <p>Contrast Text: {color.contrastText}</p>{" "}
          {/* Anzeige des Kontrasttextes */}
          <button className="btn_edit" onClick={handleEditClick}>
            Edit {/* Button zum Aktivieren des Bearbeitungsmodus */}
          </button>
          <button className="btn_delete" onClick={handleDeleteClick}>
            Delete {/* Button zum Aktivieren der Löschbestätigung */}
          </button>
          <CopyToClipboard hexCode={color.hex} />{" "}
          {/* Komponente zum Kopieren des Hex-Codes in die Zwischenablage */}
          <ContrastScore
            colorHex={color.hex}
            contrastTextHex={color.contrastText}
          />{" "}
          {/* Komponente zur Berechnung des Kontrastverhältnisses */}
        </>
      )}
    </div>
  );
}
