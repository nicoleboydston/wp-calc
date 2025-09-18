export interface Bench { type: 'enclosed'|'open'; lengthIn: number; widthIn: number; }
export function benchTapeAndSealant(benches: Bench[], feetPerRoll: number, tubeOz: number, wallboardRate: number, tubePrice: number, tapePrice: number, sealantSku: string, tapeSku: string){
  let tapeRolls = 0;
  let sealantTubes = 0;
  let totalPerimeterFt = 0;
  benches.forEach(b=>{
    const perimIn = b.type==='enclosed' ? (2*b.lengthIn + 2*b.widthIn) : (b.lengthIn + b.widthIn);
    totalPerimeterFt += perimIn/12;
  });
  tapeRolls = Math.ceil(totalPerimeterFt / feetPerRoll);
  const tapeLine = { sku: tapeSku, name: 'Bench Tape', qty: tapeRolls, unitPrice: tapePrice, total: tapeRolls*tapePrice };
  const sealLine = { sku: sealantSku, name: 'Bench Sealant', qty: sealantTubes, unitPrice: tubePrice, total: sealantTubes*tubePrice };
  return [tapeLine, sealLine];
}
