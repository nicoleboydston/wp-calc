export interface WallboardInput { wallSF: number; boardSF: number; sku: string; name: string; unitPrice: number; }
export interface LineItem { sku: string; name: string; qty: number; unitPrice: number; total: number; }
export function calcWallboard(input: WallboardInput): LineItem {
  const qty = Math.ceil(input.wallSF / input.boardSF);
  const total = qty * input.unitPrice;
  return { sku: input.sku, name: input.name || 'Wallboard', qty, unitPrice: input.unitPrice, total };
}
