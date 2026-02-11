function Summary({
  selectionsByPartId,
  showCalculatedPrice,
  onRemove,
  onClearAll,
  onCalculatePrice,
}) {
  const selections = Object.values(selectionsByPartId);
  const total = selections.reduce((sum, p) => sum + (p?.price ?? 0), 0);

  return (
    <div className="summary" id="summary">
      <h3>Final price</h3>
      {showCalculatedPrice && selections.length > 0 && (
        <>
          <ul className="summary-list">
            {selections.map((product) => (
              <li key={`${product.partId}-${product.id}`}>
                <span className="summary-name-wrap">
                  {product.partLabel && (
                    <span className="summary-part-label">
                      {product.partLabel}
                    </span>
                  )}
                  <span className="summary-name">{product.name}</span>
                  {onRemove && (
                    <button
                      type="button"
                      className="summary-remove-btn"
                      onClick={() => onRemove(product.partId)}
                      title="Remove"
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  )}
                </span>
                <span className="summary-price">€{product.price}</span>
              </li>
            ))}
          </ul>
          <p className="summary-total">
            <strong>Total: €{total}</strong>
          </p>
          {onClearAll && (
            <button
              type="button"
              className="summary-clear-btn"
              onClick={onClearAll}
            >
              Clear all
            </button>
          )}
        </>
      )}
      {!showCalculatedPrice && onCalculatePrice && (
        <button
          type="button"
          className="summary-calculate-btn"
          onClick={onCalculatePrice}
        >
          Calculate price
        </button>
      )}
    </div>
  );
}

export default Summary;
