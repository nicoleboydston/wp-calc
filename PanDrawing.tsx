import React from "react";

type RectConfig = { lengthIn: number; widthIn: number; };
type PolygonConfig = { sides: number[] };
type NeoRoundConfig = { lengthIn: number; widthIn: number; cornerRadiusIn?: number };

export interface PanDrawingProps {
  mode: "rectangle" | "corner" | "neo-round" | "polygon";
  rect?: RectConfig;
  polygon?: PolygonConfig;
  neo?: NeoRoundConfig;
  className?: string;
}

export default function PanDrawing({ mode, rect, polygon, neo, className }: PanDrawingProps) {
  const pad = 16;
  const size = 320;
  const stroke = "#111";
  const fill = "#f3f4f6";

  if (mode === "rectangle" && rect) {
    const { lengthIn, widthIn } = rect;
    const L = Math.max(1, lengthIn);
    const W = Math.max(1, widthIn);
    const scale = (size - pad * 2) / Math.max(L, W);
    const w = W * scale, h = L * scale;
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className={className}>
        <rect x={(size - w) / 2} y={(size - h) / 2} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={2} rx={4} />
      </svg>
    );
  }

  if (mode === "polygon" && polygon) {
    const sides = polygon.sides?.length ? polygon.sides : [24,24,24,24];
    const perim = sides.reduce((a,b)=>a+b,0);
    const radius = (size - pad * 2) / 2;
    let angle = -Math.PI / 2;
    const totalAngle = 2 * Math.PI;
    const pts: Array<[number, number]> = [];
    for (let i=0;i<sides.length;i++){
      const a = angle + (sides[i] / perim) * totalAngle;
      const x = size/2 + radius * Math.cos(a);
      const y = size/2 + radius * Math.sin(a);
      pts.push([x,y]);
      angle = a;
    }
    const d = pts.map(p=>p.join(",")).join(" ");
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className={className}>
        <polygon points={d} fill={fill} stroke={stroke} strokeWidth={2} />
      </svg>
    );
  }

  if (mode === "neo-round" && neo) {
    const L = Math.max(1, neo.lengthIn);
    const W = Math.max(1, neo.widthIn);
    const scale = (size - pad * 2) / Math.max(L, W);
    const w = W * scale, h = L * scale;
    const r = (neo.cornerRadiusIn ?? 4) * scale;
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className={className}>
        <rect x={(size - w) / 2} y={(size - h) / 2} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={2} rx={r} ry={r} />
      </svg>
    );
  }

  if (mode === "corner" && rect) {
    const { lengthIn, widthIn } = rect;
    const L = Math.max(1, lengthIn);
    const W = Math.max(1, widthIn);
    const scale = (size - pad * 2) / Math.max(L, W);
    const w = W * scale, h = L * scale;
    const cut = Math.min(w, h) * 0.15;
    const x0 = (size - w) / 2, y0 = (size - h) / 2;
    const pts = [
      [x0, y0 + cut],
      [x0 + cut, y0],
      [x0 + w, y0],
      [x0 + w, y0 + h],
      [x0, y0 + h],
    ].map(p=>p.join(",")).join(" ");
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className={className}>
        <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={2} />
      </svg>
    );
  }
  return null;
}
