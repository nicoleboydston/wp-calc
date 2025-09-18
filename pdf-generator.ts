import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface Line { sku:string; name:string; qty:number; unitPrice:number; total:number }
export function generatePDF(opts: { audience: 'retail'|'wholesale'; lines: Line[]; totals: { grandTotal:number }; header?: { logoDataUrl?: string, title?: string }, footer?: { disclaimer?: string } }){
  const doc = new jsPDF()
  const title = opts.header?.title ?? 'Shower Component Quote'
  doc.setFontSize(18); doc.text(title, 14, 18)

  autoTable(doc, {
    head: [['SKU','Item','Qty','Unit','Total']],
    body: opts.lines.map(l=>[l.sku, l.name, String(l.qty), `$${l.unitPrice.toFixed(2)}`, `$${l.total.toFixed(2)}`]),
    startY: 26
  })

  const y = (doc as any).lastAutoTable?.finalY ?? 26
  doc.setFontSize(12)
  doc.text(`Grand Total: $${opts.totals.grandTotal.toFixed(2)}`, 14, y + 10)

  if (opts.footer?.disclaimer){
    doc.setFontSize(8)
    doc.text(opts.footer.disclaimer, 14, 285, { maxWidth: 180 })
  }

  return doc
}
