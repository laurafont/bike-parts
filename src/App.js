import { useState, useCallback, useEffect } from "react";
import "./App.css";
import { PARTS } from "./data/parts";
import {
  isProductCompatible,
  getIncompatibilityReason,
} from "./utils/compatibility";
import Parts from "./components/Parts";
import Summary from "./components/Summary";
import Preview from "./components/Preview";

const STORAGE_KEY = "bike-parts-selections";
const STORAGE_KEY_CALCULATED = "bike-parts-show-calculated";

function getDefaultSelections() {
  const result = {};
  for (const part of PARTS) {
    const first = part.products?.[0];
    if (first)
      result[part.id] = {
        ...first,
        partId: part.id,
        partLabel: part.label,
      };
  }
  return result;
}

function loadSelectionsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSelections();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return getDefaultSelections();
    const partIds = new Set(PARTS.map((p) => p.id));
    const valid = {};
    for (const [partId, product] of Object.entries(parsed)) {
      if (!partIds.has(partId) || !product?.id) continue;
      const part = PARTS.find((p) => p.id === partId);
      const productExists = part?.products?.some((p) => p.id === product.id);
      if (productExists) valid[partId] = product;
    }
    return Object.keys(valid).length > 0 ? valid : getDefaultSelections();
  } catch {
    return getDefaultSelections();
  }
}

function App() {
  const [selectionsByPartId, setSelectionsByPartId] = useState(
    loadSelectionsFromStorage,
  );
  const [showCalculatedPrice, setShowCalculatedPrice] = useState(
    () => localStorage.getItem(STORAGE_KEY_CALCULATED) === "true",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectionsByPartId));
  }, [selectionsByPartId]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY_CALCULATED,
      showCalculatedPrice ? "true" : "false",
    );
  }, [showCalculatedPrice]);

  const handleAddToSum = (product) => {
    setSelectionsByPartId((prev) => ({
      ...prev,
      [product.partId]: product,
    }));
  };

  const handleRemove = (partId) => {
    setSelectionsByPartId((prev) => {
      const next = { ...prev };
      delete next[partId];
      return next;
    });
  };

  const handleClearAll = () => {
    setSelectionsByPartId(getDefaultSelections());
    setShowCalculatedPrice(false);
  };

  const handleCalculatePrice = () => {
    setShowCalculatedPrice(true);
  };

  const isCompatible = useCallback(
    (product, partId) =>
      isProductCompatible(product, selectionsByPartId, partId),
    [selectionsByPartId],
  );

  const getReason = useCallback(
    (product, partId) =>
      getIncompatibilityReason(product, selectionsByPartId, PARTS, partId),
    [selectionsByPartId],
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bicycle parts - Configura tu bicicleta</h1>
      </header>
      <div className="App-layout">
        <div className="App-top">
          <Parts
            parts={PARTS}
            selectionsByPartId={selectionsByPartId}
            onSelectProduct={handleAddToSum}
            isCompatible={isCompatible}
            getReason={getReason}
          />
          <div className="App-summary-row">
            <Summary
              selectionsByPartId={selectionsByPartId}
              showCalculatedPrice={showCalculatedPrice}
              onRemove={handleRemove}
              onClearAll={handleClearAll}
              onCalculatePrice={handleCalculatePrice}
            />
            {showCalculatedPrice && (
              <Preview selectionsByPartId={selectionsByPartId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
