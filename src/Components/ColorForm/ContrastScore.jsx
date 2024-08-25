import { useState, useEffect } from "react";
import "./ContrastScore.css";

// Exportiert die Komponente "ContrastScore" als Standardexport
export default function ContrastScore({ colorHex, contrastTextHex }) {
  // Definiert einen Zustand "contrastData", um die erhaltenen Kontrastdaten zu speichern, initial null
  const [contrastData, setContrastData] = useState(null);

  // Definiert einen Zustand "isLoading", um anzuzeigen, ob die Daten gerade geladen werden, initial false
  const [isLoading, setIsLoading] = useState(false);

  // useEffect Hook, der bei jeder Änderung von "colorHex" oder "contrastTextHex" ausgeführt wird
  useEffect(() => {
    // Asynchrone Funktion zum Abrufen der Kontrastdaten von einer API
    async function fetchContrastData() {
      const URL = "https://www.aremycolorsaccessible.com/api/are-they"; // API-Endpunkt

      setIsLoading(true); // Setzt den Ladezustand auf true, bevor die Anfrage beginnt
      try {
        // Führt eine POST-Anfrage an die API durch, um Kontrastdaten abzurufen
        const response = await fetch(URL, {
          method: "POST",
          mode: "cors", // CORS-Modus, um Cross-Origin-Anfragen zu ermöglichen
          body: JSON.stringify({
            colors: [colorHex, contrastTextHex], // Übergibt die Farben als JSON im Body der Anfrage
          }),
          headers: {
            "Content-Type": "application/json", // Setzt den Content-Type Header auf JSON
          },
        });

        // Überprüft, ob die Antwort nicht erfolgreich war (Statuscode nicht im Bereich 200-299)
        if (!response.ok) {
          const errorText = await response.text(); // Extrahiert den Fehlertext aus der Antwort
          console.error("Server response:", errorText); // Gibt die Serverantwort im Fehlerfall in der Konsole aus
          throw new Error("Error fetching contrast data"); // Wirft einen Fehler, wenn die Anfrage fehlschlägt
        }

        const data = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um
        setContrastData(data); // Speichert die erhaltenen Kontrastdaten im Zustand
      } catch (error) {
        console.error("Failed to fetch contrast data:", error); // Gibt Fehler im Fehlerfall in der Konsole aus
      } finally {
        setIsLoading(false); // Setzt den Ladezustand zurück auf false, egal ob erfolgreich oder nicht
      }
    }

    fetchContrastData(); // Ruft die Funktion zum Abrufen der Kontrastdaten auf
  }, [colorHex, contrastTextHex]); // Abhängigkeiten für den useEffect: wird ausgeführt, wenn sich colorHex oder contrastTextHex ändern

  // Funktion, die je nach Ergebnis eine CSS-Klasse für die Darstellung des Gesamtscores zurückgibt
  const getClassForOverallScore = (overall) => {
    const classMap = {
      Yup: "contrast_score success", // Wenn das Ergebnis "Yup" ist, wird die Klasse "success" hinzugefügt
      Kinda: "contrast_score warning", // Wenn das Ergebnis "Kinda" ist, wird die Klasse "warning" hinzugefügt
      Nope: "contrast_score fail", // Wenn das Ergebnis "Nope" ist, wird die Klasse "fail" hinzugefügt
    };

    return classMap[overall] || "contrast_score"; // Gibt die entsprechende Klasse zurück oder eine Standardklasse
  };

  return (
    <div className="contrast_score_container">
      {/* Überprüft, ob die Daten geladen werden */}
      {isLoading ? (
        <p>Checking contrast...</p> // Zeigt "Checking contrast..." an, wenn die Daten geladen werden
      ) : contrastData ? (
        <>
          {/* Zeigt das Gesamtergebnis der Kontrastprüfung an */}
          <p className={getClassForOverallScore(contrastData.overall)}>
            Overall: {contrastData.overall}
          </p>
        </>
      ) : (
        // Zeigt eine Fehlermeldung an, wenn keine Daten abgerufen werden konnten
        <p className="contrast_score">Unable to fetch contrast data</p>
      )}
    </div>
  );
}
