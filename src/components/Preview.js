import { useState, useEffect } from "react";
import { getComboImagePath, DEFAULT_COMBO_IMAGE } from "../utils/comboImage";
import { PARTS } from "../data/parts";

function Preview({ selectionsByPartId, parts = PARTS }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = imageError
    ? DEFAULT_COMBO_IMAGE
    : getComboImagePath(selectionsByPartId, parts);

  useEffect(() => {
    setImageError(false);
  }, [selectionsByPartId]);

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div className="preview">
      <h3 className="preview-title">Tu bicicleta</h3>
      <img
        src={imageSrc}
        alt="Preview of selected bicycle"
        onError={handleError}
      />
    </div>
  );
}

export default Preview;
