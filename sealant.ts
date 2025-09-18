export function calcWallboardSealant(sf: number, tubesPerSF: number, tubePrice: number, sku: string, name='Sealant (Wallboard)') {
  const qty = Math.ceil(sf * tubesPerSF);
  return { sku, name, qty, unitPrice: tubePrice, total: qty * tubePrice };
}
export function calcSingleSlopeDrainSealant(drainInches: number, ozPerIn: number, tubeOz: number, price: number, sku: string, name='Sealant (Drain)') {
  const requiredOz = drainInches * ozPerIn;
  const qty = Math.ceil(requiredOz / tubeOz);
  return { sku, name, qty, unitPrice: price, total: qty * price };
}
