/**
 * Product compatibility via central INCOMPATIBILITIES list (bidirectional).
 * Each pair is entered once; the check is symmetric (both IDs in effective selection = incompatible).
 */

import { INCOMPATIBILITIES } from "../data/parts";

/**
 * Build set of selected product IDs as if the candidate product were selected.
 * @param {Object} selectionsByPartId - Current selections: partId -> product
 * @param {Object} product - Candidate product (with id)
 * @param {string} productPartId - Part the candidate belongs to
 * @returns {Set<string>}
 */
function getEffectiveSelectionIds(selectionsByPartId, product, productPartId) {
  const ids = new Set();
  for (const partId of Object.keys(selectionsByPartId)) {
    const selected =
      partId === productPartId ? product : selectionsByPartId[partId];
    if (selected?.id) ids.add(selected.id);
  }
  if (product?.id && !ids.has(product.id)) ids.add(product.id);
  return ids;
}

/**
 * Find part label and product name for a product ID.
 * @param {Array} parts - PARTS array
 * @param {string} productId
 * @returns {{ partLabel: string, productName: string } | null}
 */
function getProductLabel(parts, productId) {
  if (!parts) return null;
  for (const part of parts) {
    const product = part.products?.find((p) => p.id === productId);
    if (product)
      return { partLabel: part.label, productName: product.name };
  }
  return null;
}

/**
 * @param {Object} product - Candidate product (with id)
 * @param {Object} selectionsByPartId - Current selections: partId -> product
 * @param {string} productPartId - Part the candidate belongs to
 * @returns {boolean}
 */
export function isProductCompatible(product, selectionsByPartId, productPartId) {
  const selectedIds = getEffectiveSelectionIds(
    selectionsByPartId,
    product,
    productPartId
  );
  for (const [idA, idB] of INCOMPATIBILITIES) {
    if (selectedIds.has(idA) && selectedIds.has(idB)) return false;
  }
  return true;
}

/**
 * @param {Object} product - Candidate product
 * @param {Object} selectionsByPartId - Current selections
 * @param {Array} parts - PARTS array (each has id, label, products: [{ id, name }])
 * @param {string} productPartId - Part the candidate belongs to
 * @returns {string|null} - Reason string or null if compatible
 */
export function getIncompatibilityReason(
  product,
  selectionsByPartId,
  parts,
  productPartId
) {
  if (isProductCompatible(product, selectionsByPartId, productPartId))
    return null;

  const selectedIds = getEffectiveSelectionIds(
    selectionsByPartId,
    product,
    productPartId
  );
  const reasons = [];
  for (const [idA, idB] of INCOMPATIBILITIES) {
    if (!selectedIds.has(idA) || !selectedIds.has(idB)) continue;
    const otherId = product.id === idA ? idB : idA;
    const label = getProductLabel(parts, otherId);
    if (label)
      reasons.push(`${label.partLabel}: ${label.productName}`);
  }
  if (reasons.length === 0) return null;
  return `Not selectable: incompatible with ${reasons.join("; ")}`;
}
