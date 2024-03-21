import PDFDocument from 'pdfkit';

export default function BuildPdf(dataCallback,endCallback, data) {
  const doc = new PDFDocument()
  doc.on('data', dataCallback)
  doc.on('end', endCallback)
  doc.fontSize(25).text('Laboratórios', {align: "center"})
  doc.fontSize(14).text(data)
  doc.end()
}
