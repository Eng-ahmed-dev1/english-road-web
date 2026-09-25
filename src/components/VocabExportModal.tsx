import React, { useRef } from 'react';
import { Printer, Download, X, FileText } from 'lucide-react';
import type { VocabWord } from '../types';

interface VocabExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWords: VocabWord[];
  unitNumber?: number;
  unitTitle?: string;
}

export const VocabExportModal: React.FC<VocabExportModalProps> = ({
  isOpen,
  onClose,
  selectedWords,
  unitNumber = 1,
  unitTitle = 'English Road Curriculum'
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const generateStandaloneHtml = () => {
    const rowsHtml = selectedWords.map((w, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0; ${idx % 2 === 1 ? 'background-color: #f8fafc;' : ''}">
        <td style="padding: 10px 12px; text-align: center; font-weight: 700; color: #64748b; font-size: 13px;">
          ${idx + 1}
        </td>
        <td style="padding: 10px 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 16px; color: #0f172a; direction: ltr; text-align: left;">
          ${w.word}
        </td>
        <td style="padding: 10px 12px; text-align: center;">
          <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-size: 11px; font-weight: 700; background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;">
            ${w.partOfSpeech}
          </span>
        </td>
        <td style="padding: 10px 14px; font-weight: 800; font-size: 16px; color: #1d4ed8; text-align: right;">
          ${w.arabicMeaning}
        </td>
        <td style="padding: 10px 14px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #334155; line-height: 1.5; direction: ltr; text-align: left;">
          ${w.definition ? `<em>"${w.definition}"</em>` : ''}
          ${w.exampleSentence ? `<div style="font-size: 11px; color: #64748b; margin-top: 4px;">• ${w.exampleSentence}</div>` : ''}
        </td>
      </tr>
    `).join('');

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مفردات English Road - الوحدة ${unitNumber}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Cairo', 'Plus Jakarta Sans', system-ui, sans-serif;
      margin: 0;
      padding: 20px;
      color: #0f172a;
      background: #ffffff;
      direction: rtl;
    }
    .header-box {
      border: 2px solid #2563eb;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .table-container {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
    }
    th {
      background-color: #1e3a8a;
      color: #ffffff;
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 800;
    }
    tr {
      page-break-inside: avoid;
    }
    thead {
      display: table-header-group;
    }
    .footer-note {
      margin-top: 25px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #64748b;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="header-box">
    <div>
      <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 900; color: #1e3a8a;">
        English Road • منصة المنهج التفاعلية
      </h1>
      <p style="margin: 0; font-size: 14px; color: #475569; font-weight: 700;">
        الوحدة ${unitNumber}: ${unitTitle} • بنك المفردات المعتمد
      </p>
    </div>
    <div style="text-align: left; font-size: 13px; color: #334155; font-weight: 600;">
      <div>📅 ${currentDate}</div>
      <div style="margin-top: 4px; font-weight: 800; color: #2563eb;">📚 ${selectedWords.length} كلمة محددة</div>
    </div>
  </div>

  <table class="table-container">
    <thead>
      <tr>
        <th style="width: 50px; text-align: center;">#</th>
        <th style="width: 25%; text-align: left; direction: ltr;">الكلمة (Word)</th>
        <th style="width: 15%; text-align: center;">النوع (Type)</th>
        <th style="width: 25%; text-align: right;">المعنى بالعربية</th>
        <th style="width: 35%; text-align: left; direction: ltr;">التعريف والسياق (Definition)</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <div class="footer-note">
    <span>منصة English Road التعليمية لطلاب ومعلمي المرحلة الثانوية</span>
    <span>صفحة ملخص الكلمات المعتمدة • تم التوليد بنجاح</span>
  </div>
</body>
</html>`;
  };

  const handlePrint = () => {
    const htmlContent = generateStandaloneHtml();

    // Use a clean hidden iframe for reliable, isolated native vector printing
    let iframe = document.getElementById('vocab-print-iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'vocab-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      }, 400);
    }
  };

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `English-Road-Vocab-Unit-${unitNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Top Header & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shadow-xs shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-ar">
                معاينة وتصدير المفردات المحددة (PDF)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-ar">
                تم تحديد <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm">{selectedWords.length}</span> كلمة • جاهزة للحفظ كـ PDF والطباعة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Direct Print / Save to PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xs active:scale-95 transition-all touch-manipulation cursor-pointer"
              title="طباعة أو حفظ بتنسيق PDF"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF</span>
            </button>

            {/* Offline HTML Document Download */}
            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              title="تحميل كملف مستند منسق"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">تحميل كملف</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/60">
          <div
            ref={printAreaRef}
            className="bg-white text-slate-900 rounded-2xl shadow-md border border-slate-200 p-6 sm:p-10 max-w-3xl mx-auto font-ar select-text"
          >
            {/* Document Letterhead */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b-2 border-blue-600">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-600 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                    English Road
                  </span>
                  <span className="text-xs font-bold text-slate-500">منصة المنهج التفاعلية</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  الوحدة {unitNumber}: {unitTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                  قائمة المفردات اللغوية المحددة (Custom Vocabulary Bank)
                </p>
              </div>

              <div className="text-xs text-slate-500 font-medium sm:text-left space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5 font-mono">
                  <span>📅</span>
                  <span>{currentDate}</span>
                </div>
                <div className="text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 inline-block">
                  إجمالي الكلمات: {selectedWords.length}
                </div>
              </div>
            </div>

            {/* Organized Table with Columns */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-bold">
                    <th className="py-3 px-3 text-center w-12">#</th>
                    <th className="py-3 px-4 text-left font-en" dir="ltr">Word</th>
                    <th className="py-3 px-3 text-center">Type</th>
                    <th className="py-3 px-4 text-right">المعنى بالعربية</th>
                    <th className="py-3 px-4 text-left font-en hidden sm:table-cell" dir="ltr">Definition / Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {selectedWords.map((word, idx) => (
                    <tr
                      key={word.id || idx}
                      className={idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}
                    >
                      <td className="py-3 px-3 text-center font-bold text-slate-400 font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-black font-en text-slate-900 text-base" dir="ltr">
                        {word.word}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {word.partOfSpeech}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-blue-600 text-base">
                        {word.arabicMeaning}
                      </td>
                      <td className="py-3 px-4 text-xs font-en text-slate-600 leading-relaxed hidden sm:table-cell" dir="ltr">
                        {word.definition && <div>"{word.definition}"</div>}
                        {word.exampleSentence && (
                          <div className="text-[11px] text-slate-400 mt-0.5">• {word.exampleSentence}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <span>منصة English Road • المنهج التفاعلي المتطور لطلاب الثانوية العامة</span>
              <span className="font-mono">صفحة 1 من 1</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Helper */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          💡 عند الضغط على "طباعة / حفظ كـ PDF"، يمكنك اختيار وجهة الطباعة "Save as PDF / حفظ بتنسيق PDF" في متصفحك للحصول على ملف PDF فوري عالي الدقة.
        </div>
      </div>
    </div>
  );
};
