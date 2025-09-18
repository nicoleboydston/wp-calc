import React, { useState } from "react";
import PanDrawing from "./PanDrawing";
export default function PolygonTestInterface() {
  const [sides, setSides] = useState<string>("36,36,36,36,36");
  const arr = sides.split(",").map(s => parseFloat(s.trim())).filter(Boolean);
  return (
    <div className="space-y-4">
      <div className="text-sm opacity-75">Polygon Test</div>
      <input className="border rounded px-2 py-1 w-full" value={sides} onChange={(e)=>setSides(e.target.value)} />
      <div className="border rounded p-3">
        <PanDrawing mode="polygon" polygon={{ sides: arr.length ? arr : [24,24,24,24] }} />
      </div>
    </div>
  );
}
