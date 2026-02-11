/**
 * Product compatibility helpers (blacklist, bidirectional).
 * A product with optional incompatibleWith is invalid if:
 * (1) Direct: for any part in its incompatibleWith, the current selection is in the forbidden list.
 * (2) Reverse: any already-selected product has incompatibleWith[productPartId] containing this product's id.
 * Missing selection for a part is treated as compatible (user can select this product first).
 */

/**
 * @param {Object} product - Product with optional incompatibleWith: { [partId]: forbiddenProductIds[] }
 * @param {Object} selectionsByPartId - Current selections: partId -> selected product object (with id, name, incompatibleWith)
 * @param {string} productPartId - Part this product belongs to (for reverse check)
 * @returns {boolean}
 */
export function isProductCompatible(product, selectionsByPartId, productPartId) {
  // Direct: product forbids some selections
  const rules = product.incompatibleWith;
  if (rules && typeof rules === 'object') {
    for (const partId of Object.keys(rules)) {
      const forbiddenIds = rules[partId];
      const selected = selectionsByPartId[partId];
      if (!selected) continue;
      if (Array.isArray(forbiddenIds) && forbiddenIds.includes(selected.id)) return false;
    }
  }

  // Reverse: some selection forbids this product (in product's part)
  if (productPartId) {
    for (const partId of Object.keys(selectionsByPartId)) {
      const selected = selectionsByPartId[partId];
      const selectedRules = selected?.incompatibleWith;
      if (!selectedRules || typeof selectedRules !== 'object') continue;
      const forbiddenIds = selectedRules[productPartId];
      if (Array.isArray(forbiddenIds) && forbiddenIds.includes(product.id)) return false;
    }
  }

  return true;
}

/**
 * @param {Object} product - Product with optional incompatibleWith
 * @param {Object} selectionsByPartId - Current selections
 * @param {Array} parts - PARTS array (each has id, label, products: [{ id, name }])
 * @param {string} productPartId - Part this product belongs to (for reverse check)
 * @returns {string|null} - Reason string or null if compatible
 */
export function getIncompatibilityReason(product, selectionsByPartId, parts, productPartId) {
  if (isProductCompatible(product, selectionsByPartId, productPartId)) return null;

  const partsById = new Map((parts || []).map((p) => [p.id, p]));
  const reasons = [];

  // Direct: product forbids current selection
  const rules = product.incompatibleWith;
  if (rules && typeof rules === 'object') {
    for (const partId of Object.keys(rules)) {
      const forbiddenIds = rules[partId];
      const selected = selectionsByPartId[partId];
      if (!selected || !Array.isArray(forbiddenIds) || !forbiddenIds.includes(selected.id)) continue;
      const part = partsById.get(partId);
      const partLabel = part ? part.label : partId;
      reasons.push(`${partLabel}: ${selected.name}`);
    }
  }

  // Reverse: some selection forbids this product
  if (productPartId) {
    for (const partId of Object.keys(selectionsByPartId)) {
      const selected = selectionsByPartId[partId];
      const selectedRules = selected?.incompatibleWith;
      if (!selectedRules || typeof selectedRules !== 'object') continue;
      const forbiddenIds = selectedRules[productPartId];
      if (!Array.isArray(forbiddenIds) || !forbiddenIds.includes(product.id)) continue;
      const part = partsById.get(partId);
      const partLabel = part ? part.label : partId;
      reasons.push(`${partLabel}: ${selected.name}`);
    }
  }

  if (reasons.length === 0) return null;
  return `Not selectable: incompatible with ${reasons.join('; ')}`;
}
