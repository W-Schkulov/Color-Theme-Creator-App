import { useState, useEffect } from "react";

function CopyToClipboard({ hexCode }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(hexCode);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div>
      <button className="btn_copy" onClick={handleCopyClick}>
        Copy
      </button>
      {isCopied && <p className="copy_confirmation">Color copied!</p>}
    </div>
  );
}

export default CopyToClipboard;
