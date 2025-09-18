// Placeholder: fetch catalog (SKUs, prices, coverage) from WP REST or local file.
export type Tier = 'retail'|'wholesale'
export async function loadCatalog(){
  // TODO: point to /wp-json/watertight/v1/catalog or a local JSON
  return { currency: 'USD', skus: [] }
}
