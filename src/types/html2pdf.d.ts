declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    enableLinks?: boolean;
    html2canvas?: any;
    jsPDF?: any;
    pagebreak?: { mode?: string | string[]; avoid?: string | string[] };
  }

  interface Html2PdfWorker {
    set(options: Html2PdfOptions): Html2PdfWorker;
    from(element: HTMLElement | string): Html2PdfWorker;
    save(): Promise<void>;
    outputPdf(type?: string, params?: any): Promise<any>;
  }

  function html2pdf(): Html2PdfWorker;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Promise<void>;

  export default html2pdf;
}
