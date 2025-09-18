export interface HeatMat { sku:string; coverageSF:number; price:number; voltage:'120'|'240'|'both'; requiresThermostat:boolean; thermostatSku?:string; thermostatPrice?:number; name?: string; }
export function pickHeatMats(targetSF: number, mats: HeatMat[], prioritize:'fewest'|'cheapest'='fewest'){
  const list = [...mats].sort((a,b)=> b.coverageSF - a.coverageSF || a.price - b.price);
  let remain = targetSF, chosen: HeatMat[] = [];
  for (const m of list){
    while (remain > 0 && m.coverageSF <= remain){ chosen.push(m); remain -= m.coverageSF; }
  }
  if (remain > 0 && list.length){ chosen.push(list[0]); remain = 0; }
  return chosen.map(m=>({ sku:m.sku, name:m.name||'Heat Mat', qty:1, unitPrice:m.price, total:m.price }));
}
