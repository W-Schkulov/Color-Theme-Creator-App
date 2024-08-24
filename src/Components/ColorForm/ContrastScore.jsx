import { useState, useEffect } from "react";
import "./ContrastScore.css";

export default function ContrastScore({ colorHex, contrastTextHex }) {
  const [contrastData, setContrastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchContrastData() {
      const URL = "https://www.aremycolorsaccessible.com/api/are-they";

      setIsLoading(true);
      try {
        const response = await fetch(URL, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            colors: [colorHex, contrastTextHex],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response:", errorText);
          throw new Error("Error fetching contrast data");
        }

        const data = await response.json();
        setContrastData(data);
      } catch (error) {
        console.error("Failed to fetch contrast data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContrastData();
  }, [colorHex, contrastTextHex]);

  const getClassForOverallScore = (overall) => {
    const classMap = {
      Yup: "contrast_score success",
      Kinda: "contrast_score warning",
      Nope: "contrast_score fail",
    };

    return classMap[overall] || "contrast_score";
  };

  return (
    <div className="contrast_score_container">
      {isLoading ? (
        <p>Checking contrast...</p>
      ) : contrastData ? (
        <>
          <p className={getClassForOverallScore(contrastData.overall)}>
            Overall: {contrastData.overall}
          </p>
        </>
      ) : (
        <p className="contrast_score">Unable to fetch contrast data</p>
      )}
    </div>
  );
}
