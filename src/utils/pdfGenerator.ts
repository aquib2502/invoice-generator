import html2pdf from 'html2pdf.js';
import { DocumentMeta } from '../types/document';

/**
 * Downloads the document preview as a PDF.
 * Uses html2pdf.js with element-level page break protection so that whole sections
 * (e.g. Terms & Conditions, Bank Credentials box) shift cleanly to the next page
 * without ever slicing text lines or boxes in half.
 */
export const downloadPDF = async (elementId: string, meta: DocumentMeta): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found for PDF export.`);
    return;
  }

  // Construct filename e.g. Invoice_TPF_004.pdf
  const typeStr = meta.documentType.charAt(0) + meta.documentType.slice(1).toLowerCase();
  const docNo = meta.documentNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${typeStr}_TPF_${docNo}.pdf`;

  // Create an off-screen fixed-width container for unscaled HTML capture
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px'; // 210mm at 96 DPI
  container.style.zIndex = '-99999';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.removeAttribute('id');
  
  // Unscale transform and enforce exact 794px A4 canvas layout
  clone.style.setProperty('transform', 'none', 'important');
  clone.style.setProperty('transform-origin', 'initial', 'important');
  clone.style.setProperty('margin', '0', 'important');
  clone.style.setProperty('width', '794px', 'important');
  clone.style.setProperty('min-width', '794px', 'important');
  clone.style.setProperty('max-width', '794px', 'important');
  clone.style.setProperty('height', 'auto', 'important');
  clone.style.setProperty('box-sizing', 'border-box', 'important');
  clone.style.setProperty('box-shadow', 'none', 'important');

  container.appendChild(clone);
  document.body.appendChild(container);

  const opt = {
    margin: 0, // Zero margin offset so 15mm internal padding serves as document margin
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2, // 2x DPI scale for razor sharp text & borders
      useCORS: true,
      logging: false,
      width: 794,
      windowWidth: 794,
      x: 0,
      y: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['.page-break-avoid', '.summary-box', '.bank-box', '.terms-box', '.footer-box', 'tr'],
    },
  };

  try {
    await html2pdf().set(opt).from(clone).save();
  } catch (err) {
    console.error('Error generating PDF with html2pdf:', err);
    window.print();
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};

/**
 * Triggers standard browser print dialog
 */
export const triggerPrint = (): void => {
  window.print();
};
