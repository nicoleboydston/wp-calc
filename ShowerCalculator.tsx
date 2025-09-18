import React, { useMemo, useState } from "react";
import { calcWallboard } from "@/calc/wallboard";
import { calcTapeFromPerimeter } from "@/calc/tape";
import { calcWallboardSealant, calcSingleSlopeDrainSealant } from "@/calc/sealant";
import PanDrawing from "./PanDrawing";
import { usePricing } from "@/contexts/PricingContext";

type Audience = "retail" | "wholesale";
interface Props { audience: Audience }

export default function ShowerCalculator({ audience }: Props) {
  const { tier } = usePricing();
  // Required customer fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [sidemark, setSidemark] = useState("");
  const [jobDate, setJobDate] = useState<string>("");

  // Pan
  const [panType, setPanType] = useState<"standard"|"thin"|"single-slope">("standard");
  const [panLengthIn, setPanLengthIn] = useState<number>(60);
  const [panWidthIn, setPanWidthIn] = useState<number>(36);
  const [drainLocation, setDrainLocation] = useState<"length"|"width">("length");

  // Constants (swap with catalog later)
  const boardSF = 20;
  const wallSF = 120;
  const wallboardPrice = tier === "retail" ? 65 : 42;
  const wallboardSKU = "WB-48x60";
  const tapeFeetPerRoll = 32.81;
  const tapePrice = tier === "retail" ? 24 : 17;
  const tapeSKU = "TSJIATWROLL2";
  const sealantTubeOz = 10.5;
  const sealantRateSF = 0.08;
  const singleSlopeOzPerIn = 1.2;
  const sealantPrice = tier === "retail" ? 19 : 12;
  const sealantSKU = "SEAL-UNIV";

  const wallboardLine = useMemo(()=> calcWallboard({ wallSF, boardSF, sku: wallboardSKU, name: "Wallboard", unitPrice: wallboardPrice }), [wallSF, boardSF, wallboardPrice]);

  const perimeterIn = useMemo(()=> (2*panLengthIn + 2*panWidthIn), [panLengthIn, panWidthIn]);
  const tapeLine = useMemo(()=> calcTapeFromPerimeter(perimeterIn, tapeFeetPerRoll, tapePrice, tapeSKU, "Watertight Tape"), [perimeterIn, tapeFeetPerRoll, tapePrice]);

  const wallSealLine = useMemo(()=> calcWallboardSealant(wallSF, sealantRateSF, sealantPrice, sealantSKU), [wallSF, sealantRateSF, sealantPrice]);
  const drainSealLine = useMemo(()=> {
    if (panType !== "single-slope") return null;
    const drainInches = drainLocation === "length" ? panLengthIn : panWidthIn;
    return calcSingleSlopeDrainSealant(drainInches, singleSlopeOzPerIn, sealantTubeOz, sealantPrice, sealantSKU);
  }, [panType, drainLocation, panLengthIn, panWidthIn, singleSlopeOzPerIn, sealantTubeOz, sealantPrice]);

  const lines = useMemo(()=> {
    const arr = [wallboardLine, tapeLine, wallSealLine];
    if (drainSealLine) arr.push(drainSealLine);
    return arr;
  }, [wallboardLine, tapeLine, wallSealLine, drainSealLine]);

  const totals = useMemo(()=> {
    const subtotal = lines.reduce((s,l)=> s + l.total, 0);
    return { subtotal, grandTotal: subtotal };
  }, [lines]);

  function validateRequired(): string[] {
    const errs: string[] = [];
    if (!firstName) errs.push("First Name");
    if (!lastName) errs.push("Last Name");
    if (!email) errs.push("Email");
    if (!accountNumber) errs.push("Account #");
    if (!poNumber) errs.push("PO #");
    if (!sidemark) errs.push("Sidemark");
    if (!jobDate) errs.push("Date");
    return errs;
  }

  function onExportPDF() {
    const missing = validateRequired();
    if (missing.length) { alert("Missing: " + missing.join(", ")); return; }
    console.log("Export PDF for", tier, { lines, totals });
    // TODO: integrate lib/pdf-generator.ts
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="text-xl font-semibold">Watertight Shower Calculator — {tier === "retail" ? "Retail" : "Wholesale"}</div>

      <div className="grid grid-cols-2 gap-3 p-3 border rounded bg-white">
        <label className="text-sm">Pan Length (in)
          <input className="block border rounded px-2 py-1 w-full" type="number" value={panLengthIn} onChange={e=>setPanLengthIn(parseFloat(e.target.value)||0)} />
        </label>
        <label className="text-sm">Pan Width (in)
          <input className="block border rounded px-2 py-1 w-full" type="number" value={panWidthIn} onChange={e=>setPanWidthIn(parseFloat(e.target.value)||0)} />
        </label>
      </div>

      <div className="border rounded p-4 bg-white">
        <div className="mb-2 text-sm opacity-75">Pan Drawing (orientation-agnostic)</div>
        <PanDrawing mode="rectangle" rect={{ lengthIn: panLengthIn, widthIn: panWidthIn }} />
      </div>

      <div className="border rounded p-4 bg-white">
        <div className="font-medium mb-2">Quote Lines</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-1">SKU</th>
              <th className="py-1">Item</th>
              <th className="py-1">Qty</th>
              <th className="py-1">Unit</th>
              <th className="py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l,i)=> (
              <tr key={i} className="border-b last:border-b-0">
                <td className="py-1 pr-2">{l.sku}</td>
                <td className="py-1 pr-2">{l.name}</td>
                <td className="py-1 pr-2">{l.qty}</td>
                <td className="py-1 pr-2">${l.unitPrice.toFixed(2)}</td>
                <td className="py-1 pr-2 font-medium">${l.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="py-2 text-right font-medium">Grand Total</td>
              <td className="py-2 font-semibold">${totals.grandTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 border rounded" onClick={onExportPDF}>Export PDF ({tier})</button>
      </div>
    </div>
  );
}
