function Parts({
  parts,
  selectionsByPartId = {},
  onSelectProduct,
  isCompatible,
  getReason,
}) {
  const handleProductClick = (part, product) => {
    if (isCompatible && !isCompatible(product, part.id)) return;
    onSelectProduct({ ...product, partId: part.id, partLabel: part.label });
  };

  return (
    <div className="parts-wrapper">
      <div className="parts">
        {parts.map((part) => {
          const selectedProduct = selectionsByPartId[part.id];
          console.log(selectedProduct);
          return (
            <div key={part.id} className="parts-item">
              <div className="parts-header">
                <div className="parts-part-label">{part.label}</div>
                {selectedProduct && (selectedProduct?.image ?? part.image) ? (
                  <img
                    src={selectedProduct?.image ?? part.image}
                    alt=""
                    className="parts-part-image"
                  />
                ) : (
                  <p className="parts-empty">
                    Por favor selecciona un producto
                  </p>
                )}
              </div>
              <div className="parts-body">
                <ul className="product-list">
                  {part.products.map((product) => {
                    const compatible =
                      !isCompatible || isCompatible(product, part.id);
                    const isSelected = selectedProduct?.id === product.id;
                    const reason = getReason
                      ? getReason(product, part.id)
                      : null;
                    return (
                      <li key={product.id}>
                        <button
                          type="button"
                          className={`product-list-item${compatible ? "" : " product-list-item--disabled"}${isSelected ? " product-list-item--selected" : ""}`}
                          onClick={() => handleProductClick(part, product)}
                          title={!compatible && reason ? reason : undefined}
                          aria-disabled={!compatible}
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="product-list-thumb"
                          />
                          <span className="product-list-name">
                            {product.name}
                          </span>
                          <span className="product-list-price">
                            €{product.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Parts;
