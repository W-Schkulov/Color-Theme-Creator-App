import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirming(true);
  };

  const confirmDelete = () => {
    onDelete(color.id);
  };

  const cancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <div
      className="color-card"
      style={{ backgroundColor: color.hex, color: color.contrastText }}
    >
      {isConfirming ? (
        <div className="color-card-highlight">
          <p>Are you sure you want to delete this color?</p>
          <button className="btn_delete" onClick={confirmDelete}>
            Yes, Delete
          </button>
          <button className="btn_cancel" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h2>{color.role}</h2>
          <p>Hex: {color.hex}</p>
          <p>Contrast Text: {color.contrastText}</p>
          <button className="btn_delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
