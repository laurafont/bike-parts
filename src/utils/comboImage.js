/**
 * Builds the combination image path for the bicycle preview.
 * Filename format: slug1--slug2--slug3--slug4--slug5.webp (part order: cuadro, acabado, tipo rueda, color, cambio).
 */

export const DEFAULT_COMBO_IMAGE =
  "/images/combinaciones/diamond--brillo--carretera--negro--6-velocidades.webp";

function slugFromProduct(product) {
  if (product.comboSlug) return product.comboSlug;
  return (product.name || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * @param {Object} selectionsByPartId - partId -> selected product (with name, optional comboSlug)
 * @param {Array} parts - PARTS array (each has id)
 * @returns {string} - path to combo image or default
 */
export function getComboImagePath(selectionsByPartId, parts) {
  if (!parts || !parts.length) return DEFAULT_COMBO_IMAGE;

  const slugs = [];
  for (const part of parts) {
    const product = selectionsByPartId[part.id];
    if (!product) return DEFAULT_COMBO_IMAGE;
    slugs.push(slugFromProduct(product));
  }

  const filename = slugs.join("--") + ".webp";
  return `/images/combinaciones/${filename}`;
}
