export interface CurbSku { sku: string; lengthIn: number; price: number; type: 'standard'|'mini'; name?: string; }
export function fitCurbs(widthIn: number, candidates: CurbSku[]) {
  const sorted = [...candidates].sort((a,b)=> b.lengthIn - a.lengthIn || a.price - b.price);
  let remaining = widthIn, used: {sku:string, name:string, qty:number, unitPrice:number}[] = [];
  for (const c of sorted) {
    while (remaining > 0 && c.lengthIn <= remaining) {
      const found = used.find(u=>u.sku===c.sku) || used[used.push({sku:c.sku,name:c.name||'Curb',qty:0,unitPrice:c.price})-1];
      found.qty += 1; remaining -= c.lengthIn;
    }
  }
  if (remaining > 0) {
    const smallest = sorted[sorted.length-1];
    const found = used.find(u=>u.sku===smallest.sku) || used[used.push({sku:smallest.sku,name:smallest.name||'Curb',qty:0,unitPrice:smallest.price})-1];
    found.qty += 1; remaining = 0;
  }
  return used.map(u=>({ ...u, total: u.qty * u.unitPrice }));
}
