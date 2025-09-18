export function calcTapeFromPerimeter(perimeterInches: number, feetPerRoll: number, unitPrice: number, sku: string, name='Watertight Tape') {
  const feet = perimeterInches / 12;
  const qty = Math.ceil(feet / feetPerRoll);
  return { sku, name, qty, unitPrice, total: qty * unitPrice };
}
