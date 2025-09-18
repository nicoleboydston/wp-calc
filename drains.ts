export interface DrainSku { sku: string; maxIn: number; price: number; name?: string; }
export interface ConnectSku { sku: string; price: number; name?: string; }
export function composeLinearDrains(targetIn: number, drains: DrainSku[], connector?: ConnectSku) {
  const sorted = [...drains].sort((a,b)=> b.maxIn - a.maxIn || a.price - b.price);
  let remain = targetIn, used: DrainSku[] = [];
  for (const d of sorted) {
    while (remain > 0 && d.maxIn <= remain) { used.push(d); remain -= d.maxIn; }
  }
  if (remain > 0 && sorted.length) { used.push(sorted[0]); remain = 0; }
  const lines = used.map(d=>({ sku:d.sku, name:d.name||'Adjustable Drain', qty:1, unitPrice:d.price, total:d.price }));
  if (connector && used.length>1) lines.push({ sku: connector.sku, name: connector.name||'Drain Connector', qty: used.length-1, unitPrice: connector.price, total: (used.length-1)*connector.price });
  return lines;
}
