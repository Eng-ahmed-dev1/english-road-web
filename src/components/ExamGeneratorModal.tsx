import React, { useState, useMemo } from 'react';
import {
  Printer,
  Download,
  X,
  FileSpreadsheet,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  BookOpen,
  UserCheck
} from 'lucide-react';
import type { UnitData } from '../types';

interface ExamGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitData;
}

export const ExamGeneratorModal: React.FC<ExamGeneratorModalProps> = ({
  isOpen,
  onClose,
  unit
}) => {
  // Exam Header Settings
  const [teacherName, setTeacherName] = useState('Eng. Ahmed Alaa');
  const [academyName, setAcademyName] = useState('English Road Secondary Academy');
  const [examTitle, setExamTitle] = useState(`Unit ${unit.unitNumber}: ${unit.title} — Assessment Quiz`);
  const [gradeLevel, setGradeLevel] = useState('3rd Secondary Stage');
  const [timeAllowed, setTimeAllowed] = useState('45 Minutes');
  const [totalMarks, setTotalMarks] = useState('30');

  // Section Toggles
  const [includeVocabMCQ, setIncludeVocabMCQ] = useState(true);
  const [includeCollocations, setIncludeCollocations] = useState(true);
  const [includeFillBlanks, setIncludeFillBlanks] = useState(true);
  const [includeMatching, setIncludeMatching] = useState(true);
  const [includeSentencePuzzles, setIncludeSentencePuzzles] = useState(true);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  // Active Preview Tab
  const [activeTab, setActiveTab] = useState<'settings' | 'preview'>('preview');

  // Data subsets for the exam
  const vocabMCQs = useMemo(() => {
    return unit.definitionsQuiz.slice(0, 5);
  }, [unit.definitionsQuiz]);

  const collocationsMCQs = useMemo(() => {
    return unit.collocationsQuiz.slice(0, 5);
  }, [unit.collocationsQuiz]);

  const fillBlanksQuestions = useMemo(() => {
    return unit.fillInBlanksQuiz.slice(0, 5);
  }, [unit.fillInBlanksQuiz]);

  const matchingPairs = useMemo(() => {
    const words = unit.keyVocabulary.slice(0, 5);
    // Shuffle the definitions for Column B
    const shuffledDefs = [...words].sort(() => 0.5 - Math.random());
    return {
      words,
      definitions: shuffledDefs
    };
  }, [unit.keyVocabulary]);

  const sentencePuzzles = useMemo(() => {
    return unit.sentencePuzzles.slice(0, 3);
  }, [unit.sentencePuzzles]);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate Standalone HTML for Printing / Download
  const generateStandaloneHtml = () => {
    // Part I HTML
    const part1Html = includeVocabMCQ && vocabMCQs.length > 0 ? `
      <div class="exam-section">
        <div class="section-title">
          <span>Part I: Choose the correct answer from a, b, c, or d (Vocabulary & Meaning):</span>
          <span class="section-marks">(5 Marks)</span>
        </div>
        <div class="questions-list">
          ${vocabMCQs.map((q, idx) => `
            <div class="mcq-item">
              <div class="mcq-prompt">
                <span class="q-num">${idx + 1}.</span> ${q.question}
              </div>
              <div class="options-grid">
                ${q.options.map((opt, optIdx) => `
                  <div class="opt-col">
                    <span class="opt-letter">(${String.fromCharCode(97 + optIdx)})</span> ${opt}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Part II HTML
    const part2Html = includeCollocations && collocationsMCQs.length > 0 ? `
      <div class="exam-section">
        <div class="section-title">
          <span>Part II: Choose the correct preposition / collocation:</span>
          <span class="section-marks">(5 Marks)</span>
        </div>
        <div class="questions-list">
          ${collocationsMCQs.map((q, idx) => `
            <div class="mcq-item">
              <div class="mcq-prompt">
                <span class="q-num">${idx + 1}.</span> ${q.question}
              </div>
              <div class="options-grid">
                ${q.options.map((opt, optIdx) => `
                  <div class="opt-col">
                    <span class="opt-letter">(${String.fromCharCode(97 + optIdx)})</span> ${opt}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Part III HTML
    const part3Html = includeFillBlanks && fillBlanksQuestions.length > 0 ? `
      <div class="exam-section">
        <div class="section-title">
          <span>Part III: Complete the following sentences with the most suitable word:</span>
          <span class="section-marks">(5 Marks)</span>
        </div>
        <div class="questions-list">
          ${fillBlanksQuestions.map((q, idx) => `
            <div class="mcq-item">
              <div class="mcq-prompt">
                <span class="q-num">${idx + 1}.</span> ${q.question.replace(/_____+/g, '___________________')}
              </div>
              <div class="options-grid">
                ${q.options.map((opt, optIdx) => `
                  <div class="opt-col">
                    <span class="opt-letter">(${String.fromCharCode(97 + optIdx)})</span> ${opt}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Part IV Matching HTML
    const part4Html = includeMatching && matchingPairs.words.length > 0 ? `
      <div class="exam-section">
        <div class="section-title">
          <span>Part IV: Match the words in Column (A) with their appropriate definitions in Column (B):</span>
          <span class="section-marks">(5 Marks)</span>
        </div>
        <table class="match-table">
          <thead>
            <tr>
              <th style="width: 45%;">Column (A)</th>
              <th style="width: 55%;">Column (B)</th>
            </tr>
          </thead>
          <tbody>
            ${matchingPairs.words.map((w, idx) => `
              <tr>
                <td><strong>${idx + 1}.</strong> ${w.word} <span style="font-size: 11px; color: #64748b;">(${w.partOfSpeech})</span></td>
                <td><strong>(${String.fromCharCode(65 + idx)})</strong> ${matchingPairs.definitions[idx].definition || matchingPairs.definitions[idx].arabicMeaning}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="match-strip">
          <strong>Answers:</strong>
          ${matchingPairs.words.map((_, idx) => `
            <span class="strip-box">${idx + 1} ➔ ( &nbsp;&nbsp; )</span>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Part V Sentence Puzzles HTML
    const part5Html = includeSentencePuzzles && sentencePuzzles.length > 0 ? `
      <div class="exam-section">
        <div class="section-title">
          <span>Part V: Reorder the words to form correct, grammatical sentences:</span>
          <span class="section-marks">(5 Marks)</span>
        </div>
        <div class="questions-list">
          ${sentencePuzzles.map((p, idx) => `
            <div class="puzzle-item">
              <div class="puzzle-prompt">
                <span class="q-num">${idx + 1}.</span>
                <span class="chunks-badge">${[...p.chunks].sort(() => 0.5 - Math.random()).join(' / ')}</span>
              </div>
              <div class="answer-line">Answer: ________________________________________________________________________________</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Answer Key Page HTML
    const answerKeyHtml = includeAnswerKey ? `
      <div class="page-break"></div>
      <div class="answer-key-header">
        <div style="font-size: 20px; font-weight: 900; color: #1e3a8a; margin-bottom: 4px;">
          TEACHER'S ANSWER KEY • نموذج الإجابة الرسمي
        </div>
        <div style="font-size: 13px; color: #475569; font-weight: 700;">
          ${examTitle} • ${gradeLevel} • ${currentDate}
        </div>
      </div>

      <div class="answer-key-content">
        ${includeVocabMCQ && vocabMCQs.length > 0 ? `
          <div class="key-box">
            <h4>Part I: Vocabulary MCQs</h4>
            <div class="key-items">
              ${vocabMCQs.map((q, idx) => `
                <div class="key-row">
                  <span class="key-num">${idx + 1}.</span>
                  <strong>${q.correctAnswer}</strong>
                  <span class="key-exp">— ${q.explanation}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${includeCollocations && collocationsMCQs.length > 0 ? `
          <div class="key-box">
            <h4>Part II: Collocations & Prepositions</h4>
            <div class="key-items">
              ${collocationsMCQs.map((q, idx) => `
                <div class="key-row">
                  <span class="key-num">${idx + 1}.</span>
                  <strong>${q.correctAnswer}</strong>
                  <span class="key-exp">— ${q.explanation}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${includeFillBlanks && fillBlanksQuestions.length > 0 ? `
          <div class="key-box">
            <h4>Part III: Sentence Completion</h4>
            <div class="key-items">
              ${fillBlanksQuestions.map((q, idx) => `
                <div class="key-row">
                  <span class="key-num">${idx + 1}.</span>
                  <strong>${q.correctAnswer}</strong>
                  <span class="key-exp">— ${q.explanation}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${includeMatching && matchingPairs.words.length > 0 ? `
          <div class="key-box">
            <h4>Part IV: Matching Answers</h4>
            <div class="key-items">
              ${matchingPairs.words.map((w, idx) => {
                const targetDef = w.definition || w.arabicMeaning;
                const letterIdx = matchingPairs.definitions.findIndex(d => (d.definition || d.arabicMeaning) === targetDef);
                const letter = letterIdx >= 0 ? String.fromCharCode(65 + letterIdx) : '?';
                return `
                  <div class="key-row">
                    <span class="key-num">${idx + 1} ➔ (${letter})</span>
                    <strong>${w.word}</strong>: ${targetDef}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        ${includeSentencePuzzles && sentencePuzzles.length > 0 ? `
          <div class="key-box">
            <h4>Part V: Sentence Reordering</h4>
            <div class="key-items">
              ${sentencePuzzles.map((p, idx) => `
                <div class="key-row">
                  <span class="key-num">${idx + 1}.</span>
                  <strong>${p.fullSentence}</strong>
                  <span style="font-family: 'Cairo', sans-serif; color: #166534; font-size: 12px; margin-left: 8px;">(${p.arabicTranslation})</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    ` : '';

    return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>${examTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 12mm 15mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 16px;
      color: #0f172a;
      background: #ffffff;
      font-size: 13px;
      line-height: 1.45;
    }
    .exam-header {
      border: 2px solid #1e3a8a;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 12px;
      background: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-left {
      text-align: left;
    }
    .header-center {
      text-align: center;
    }
    .header-right {
      text-align: right;
    }
    .academy-title {
      font-size: 15px;
      font-weight: 800;
      color: #1e3a8a;
    }
    .teacher-sub {
      font-size: 12px;
      color: #475569;
      font-weight: 700;
    }
    .exam-main-title {
      font-size: 16px;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: -0.2px;
    }
    .exam-sub-info {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
    }
    .score-box {
      border: 2px dashed #2563eb;
      border-radius: 8px;
      padding: 4px 10px;
      font-weight: 800;
      font-size: 12px;
      background: #eff6ff;
      display: inline-block;
      margin-top: 4px;
    }
    .student-bar {
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 700;
      color: #334155;
    }
    .exam-section {
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .section-title {
      background: #f1f5f9;
      border-left: 4px solid #2563eb;
      padding: 6px 10px;
      font-weight: 800;
      font-size: 13px;
      color: #1e293b;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .section-marks {
      font-size: 11px;
      color: #2563eb;
      font-weight: 800;
    }
    .mcq-item {
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .mcq-prompt {
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .q-num {
      display: inline-block;
      width: 20px;
      color: #2563eb;
      font-weight: 800;
    }
    .options-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      padding-left: 20px;
      font-size: 12px;
      color: #334155;
    }
    .opt-letter {
      font-weight: 800;
      color: #475569;
    }
    .match-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #cbd5e1;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .match-table th {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
      font-weight: 800;
      color: #1e3a8a;
    }
    .match-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
    }
    .match-strip {
      padding: 6px 10px;
      background: #f8fafc;
      border: 1px dashed #94a3b8;
      border-radius: 6px;
      font-size: 12px;
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .strip-box {
      font-weight: 700;
      color: #2563eb;
    }
    .puzzle-item {
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .chunks-badge {
      display: inline-block;
      padding: 2px 8px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
    }
    .answer-line {
      margin-top: 4px;
      padding-left: 20px;
      color: #94a3b8;
      font-size: 11px;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
      height: 0;
    }
    .answer-key-header {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 8px;
      margin-bottom: 14px;
      text-align: center;
    }
    .key-box {
      margin-bottom: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
    }
    .key-box h4 {
      margin: 0 0 6px 0;
      font-size: 13px;
      font-weight: 800;
      color: #1e3a8a;
    }
    .key-items {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .key-row {
      font-size: 12px;
      color: #1e293b;
    }
    .key-num {
      font-weight: 800;
      color: #2563eb;
      display: inline-block;
      width: 24px;
    }
    .key-exp {
      font-size: 11px;
      color: #64748b;
      margin-left: 6px;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="exam-header">
    <div class="header-left">
      <div class="academy-title">${academyName}</div>
      <div class="teacher-sub">${teacherName} • ${gradeLevel}</div>
    </div>
    <div class="header-center">
      <div class="exam-main-title">${examTitle}</div>
      <div class="exam-sub-info">English Road • Official Curriculum Practice</div>
    </div>
    <div class="header-right">
      <div style="font-size: 11px; color: #64748b;">Time: <strong>${timeAllowed}</strong></div>
      <div class="score-box">Marks: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${totalMarks}</div>
    </div>
  </div>

  <!-- Student Info Bar -->
  <div class="student-bar">
    <span>Student Name: _____________________________________________</span>
    <span>Class: ________</span>
    <span>Date: ____________</span>
  </div>

  <!-- Exam Sections -->
  ${part1Html}
  ${part2Html}
  ${part3Html}
  ${part4Html}
  ${part5Html}

  <!-- Answer Key (if enabled) -->
  ${answerKeyHtml}
</body>
</html>`;
  };

  const handlePrint = () => {
    const htmlContent = generateStandaloneHtml();

    let iframe = document.getElementById('exam-print-iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'exam-print-iframe';
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
    link.download = `Exam-Unit-${unit.unitNumber}-${unit.title.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs shrink-0">
              <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-en flex items-center gap-2">
                <span>Teacher's Exam & Worksheet Generator</span>
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  A4 Print Ready
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unit {unit.unitNumber}: {unit.title} • Customize questions, header & answer key
              </p>
            </div>
          </div>

          {/* Action Buttons: Print, Download, Close */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="hidden md:flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95 touch-manipulation cursor-pointer"
              title="Download Standalone Printable HTML file"
            >
              <Download className="w-4 h-4" />
              <span>Save HTML</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs on Mobile */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-slate-100/70 dark:bg-slate-850/50">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Exam & Sections</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Live Sheet Preview</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Header Settings Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Teacher & Exam Header Settings</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Teacher Name:
                    </label>
                    <input
                      type="text"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Center / School / Academy:
                    </label>
                    <input
                      type="text"
                      value={academyName}
                      onChange={(e) => setAcademyName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Exam / Quiz Title:
                    </label>
                    <input
                      type="text"
                      value={examTitle}
                      onChange={(e) => setExamTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Grade Level:
                    </label>
                    <input
                      type="text"
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Time Allowed:
                    </label>
                    <input
                      type="text"
                      value={timeAllowed}
                      onChange={(e) => setTimeAllowed(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                      Total Marks:
                    </label>
                    <input
                      type="text"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Sections Selector Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                  <span>Choose Included Exam Sections</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Vocab MCQs */}
                  <div
                    onClick={() => setIncludeVocabMCQ(!includeVocabMCQ)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeVocabMCQ
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeVocabMCQ ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Part I: Vocabulary MCQs (5 Questions)</span>
                      <span className="text-[11px] text-slate-500">Definitions & Contextual words</span>
                    </div>
                  </div>

                  {/* Collocations */}
                  <div
                    onClick={() => setIncludeCollocations(!includeCollocations)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeCollocations
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeCollocations ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Part II: Collocations & Idioms (5 Questions)</span>
                      <span className="text-[11px] text-slate-500">Prepositions and phrasal verbs</span>
                    </div>
                  </div>

                  {/* Fill in Blanks */}
                  <div
                    onClick={() => setIncludeFillBlanks(!includeFillBlanks)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeFillBlanks
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeFillBlanks ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Part III: Fill in the Blanks (5 Questions)</span>
                      <span className="text-[11px] text-slate-500">Sentence completion</span>
                    </div>
                  </div>

                  {/* Matching */}
                  <div
                    onClick={() => setIncludeMatching(!includeMatching)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeMatching
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeMatching ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Part IV: Match Column A with B (5 Pairs)</span>
                      <span className="text-[11px] text-slate-500">Vocabulary definition pairing</span>
                    </div>
                  </div>

                  {/* Sentence Puzzles */}
                  <div
                    onClick={() => setIncludeSentencePuzzles(!includeSentencePuzzles)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeSentencePuzzles
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeSentencePuzzles ? <CheckSquare className="w-5 h-5 text-blue-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Part V: Reorder Sentences (3 Puzzles)</span>
                      <span className="text-[11px] text-slate-500">Grammar & syntax construction</span>
                    </div>
                  </div>

                  {/* Answer Key */}
                  <div
                    onClick={() => setIncludeAnswerKey(!includeAnswerKey)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      includeAnswerKey
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {includeAnswerKey ? <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" /> : <Square className="w-5 h-5 text-slate-400 shrink-0" />}
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">Separate Answer Key (نموذج الإجابة)</span>
                      <span className="text-[11px] text-slate-500">Prints on a new page with explanations</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-blue-700"
                  >
                    View Live Preview →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              {/* Paper Visual Preview Container */}
              <div className="bg-slate-100 dark:bg-slate-950 p-2 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="max-w-3xl mx-auto bg-white text-slate-900 p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200 font-sans text-xs sm:text-sm">
                  
                  {/* Paper Header */}
                  <div className="border-2 border-blue-900 rounded-xl p-3 sm:p-4 mb-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <div>
                      <div className="font-black text-sm sm:text-base text-blue-900">{academyName}</div>
                      <div className="text-xs text-slate-600 font-bold">{teacherName} • {gradeLevel}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-black text-xs sm:text-sm uppercase tracking-tight text-slate-900">{examTitle}</div>
                      <div className="text-[11px] text-slate-500">Official Curriculum Assessment</div>
                    </div>
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                      <div className="text-xs text-slate-500">Time: <strong>{timeAllowed}</strong></div>
                      <div className="border-2 border-dashed border-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-bold text-blue-800">
                        Marks: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / {totalMarks}
                      </div>
                    </div>
                  </div>

                  {/* Student Details Bar */}
                  <div className="border border-slate-300 rounded-lg p-2.5 mb-6 flex flex-col sm:flex-row justify-between text-xs text-slate-600 font-bold gap-2">
                    <span>Student Name: _____________________________________</span>
                    <span>Class: ________</span>
                    <span>Date: ____________</span>
                  </div>

                  {/* Questions Content */}
                  <div className="space-y-6">
                    {/* Part I: Vocab MCQs */}
                    {includeVocabMCQ && vocabMCQs.length > 0 && (
                      <div>
                        <div className="bg-slate-100 border-l-4 border-blue-600 px-3 py-1.5 font-bold text-xs sm:text-sm text-slate-800 mb-3 flex justify-between">
                          <span>Part I: Choose the correct answer (Vocabulary & Meaning):</span>
                          <span className="text-blue-600">(5 Marks)</span>
                        </div>
                        <div className="space-y-3 pl-2">
                          {vocabMCQs.map((q, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="font-semibold text-slate-800">
                                <span className="text-blue-600 font-bold mr-1">{idx + 1}.</span> {q.question}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-slate-600 text-[11px] sm:text-xs pl-4">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx}>
                                    <span className="font-bold">({String.fromCharCode(97 + oIdx)})</span> {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part II: Collocations */}
                    {includeCollocations && collocationsMCQs.length > 0 && (
                      <div>
                        <div className="bg-slate-100 border-l-4 border-blue-600 px-3 py-1.5 font-bold text-xs sm:text-sm text-slate-800 mb-3 flex justify-between">
                          <span>Part II: Choose the correct preposition / collocation:</span>
                          <span className="text-blue-600">(5 Marks)</span>
                        </div>
                        <div className="space-y-3 pl-2">
                          {collocationsMCQs.map((q, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="font-semibold text-slate-800">
                                <span className="text-blue-600 font-bold mr-1">{idx + 1}.</span> {q.question}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-slate-600 text-[11px] sm:text-xs pl-4">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx}>
                                    <span className="font-bold">({String.fromCharCode(97 + oIdx)})</span> {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part III: Fill Blanks */}
                    {includeFillBlanks && fillBlanksQuestions.length > 0 && (
                      <div>
                        <div className="bg-slate-100 border-l-4 border-blue-600 px-3 py-1.5 font-bold text-xs sm:text-sm text-slate-800 mb-3 flex justify-between">
                          <span>Part III: Complete the sentences with the most suitable word:</span>
                          <span className="text-blue-600">(5 Marks)</span>
                        </div>
                        <div className="space-y-3 pl-2">
                          {fillBlanksQuestions.map((q, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="font-semibold text-slate-800">
                                <span className="text-blue-600 font-bold mr-1">{idx + 1}.</span> {q.question.replace(/_____+/g, '_______________')}
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-slate-600 text-[11px] sm:text-xs pl-4">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx}>
                                    <span className="font-bold">({String.fromCharCode(97 + oIdx)})</span> {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part IV: Matching */}
                    {includeMatching && matchingPairs.words.length > 0 && (
                      <div>
                        <div className="bg-slate-100 border-l-4 border-blue-600 px-3 py-1.5 font-bold text-xs sm:text-sm text-slate-800 mb-3 flex justify-between">
                          <span>Part IV: Match Column (A) with Column (B):</span>
                          <span className="text-blue-600">(5 Marks)</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-slate-200 text-xs mb-3">
                            <thead>
                              <tr className="bg-slate-50">
                                <th className="border border-slate-200 p-2 text-left font-bold w-1/2">Column (A)</th>
                                <th className="border border-slate-200 p-2 text-left font-bold w-1/2">Column (B)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {matchingPairs.words.map((w, idx) => (
                                <tr key={idx} className="border-b border-slate-100">
                                  <td className="border border-slate-200 p-2">
                                    <strong>{idx + 1}.</strong> {w.word} <span className="text-slate-400 text-[11px]">({w.partOfSpeech})</span>
                                  </td>
                                  <td className="border border-slate-200 p-2">
                                    <strong>({String.fromCharCode(65 + idx)})</strong> {matchingPairs.definitions[idx].definition || matchingPairs.definitions[idx].arabicMeaning}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="p-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex flex-wrap gap-3 text-xs font-bold text-blue-700">
                          <span>Answers:</span>
                          {matchingPairs.words.map((_, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">
                              {idx + 1} ➔ ( &nbsp;&nbsp;&nbsp; )
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Part V: Sentence Puzzles */}
                    {includeSentencePuzzles && sentencePuzzles.length > 0 && (
                      <div>
                        <div className="bg-slate-100 border-l-4 border-blue-600 px-3 py-1.5 font-bold text-xs sm:text-sm text-slate-800 mb-3 flex justify-between">
                          <span>Part V: Reorder words to form correct sentences:</span>
                          <span className="text-blue-600">(5 Marks)</span>
                        </div>
                        <div className="space-y-3 pl-2">
                          {sentencePuzzles.map((p, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="font-semibold text-slate-800 flex items-center gap-2">
                                <span className="text-blue-600 font-bold">{idx + 1}.</span>
                                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs">
                                  {[...p.chunks].sort(() => 0.5 - Math.random()).join(' / ')}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 pl-4 font-mono">
                                Answer: ____________________________________________________________________
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Answer Key Preview (if enabled) */}
                    {includeAnswerKey && (
                      <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-300">
                        <div className="text-center mb-4">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                            Separate Sheet: Teacher's Answer Key (نموذج الإجابة)
                          </span>
                        </div>
                        <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3 text-xs">
                          {includeVocabMCQ && vocabMCQs.length > 0 && (
                            <div>
                              <strong className="text-emerald-900 block mb-1">Part I: Vocabulary MCQs</strong>
                              <div className="space-y-0.5 text-slate-700">
                                {vocabMCQs.map((q, idx) => (
                                  <div key={idx}>
                                    <span className="font-bold text-emerald-700">{idx + 1}.</span> {q.correctAnswer} <span className="text-slate-400">({q.explanation})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {includeCollocations && collocationsMCQs.length > 0 && (
                            <div>
                              <strong className="text-emerald-900 block mb-1">Part II: Collocations</strong>
                              <div className="space-y-0.5 text-slate-700">
                                {collocationsMCQs.map((q, idx) => (
                                  <div key={idx}>
                                    <span className="font-bold text-emerald-700">{idx + 1}.</span> {q.correctAnswer} <span className="text-slate-400">({q.explanation})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Time: {timeAllowed} • Total: {totalMarks} Marks</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 touch-manipulation cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet / Exam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
