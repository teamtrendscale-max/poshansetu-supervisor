import React, { useState } from 'react';
import { AwcId, Language } from '../types';
import { translations } from '../services/translations';
import { AWC_CENTRES } from '../data/mockData';
import { StoreState } from '../services/firebase';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Award,
  FileCheck
} from 'lucide-react';

interface MonthlyReportViewProps {
  store: StoreState;
  selectedCentre: AwcId | 'all';
  language: Language;
}

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  store,
  selectedCentre,
  language
}) => {
  const t = translations[language];
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const centreName = selectedCentre === 'all'
    ? (language === 'gu' ? 'તમામ સર્કલ કેન્દ્રો (૫)' : 'All 5 Circle Centres')
    : (language === 'gu' ? AWC_CENTRES[selectedCentre]?.nameGu : AWC_CENTRES[selectedCentre]?.name) || '04-Vadtal Anganwadi Centre';

  // Commodities to summarize in MPR Form 3
  const commoditiesList = [
    { key: 'rice', name: 'Fortified Rice', unit: 'kg', opening: 40.0, inward: 50.0, cooked: 56.5, thr: 0, closing: 33.5 },
    { key: 'atta', name: 'Wheat Atta (Flour)', unit: 'kg', opening: 25.0, inward: 40.0, cooked: 44.0, thr: 0, closing: 21.0 },
    { key: 'oil', name: 'Fortified Edible Oil', unit: 'liter', opening: 10.0, inward: 15.0, cooked: 14.5, thr: 0, closing: 10.5 },
    { key: 'dal', name: 'Tuver Dal (Split Pea)', unit: 'kg', opening: 18.0, inward: 25.0, cooked: 30.0, thr: 0, closing: 13.0 },
    { key: 'bal_shakti', name: 'Bal Shakti THR (6m - 3y)', unit: 'packets', opening: 50, inward: 60, cooked: 0, thr: 68, closing: 42 },
    { key: 'matru_shakti', name: 'Matru Shakti THR (Mothers)', unit: 'packets', opening: 20, inward: 25, cooked: 0, thr: 29, closing: 16 },
    { key: 'purna_shakti', name: 'Purna Shakti THR (Girls)', unit: 'packets', opening: 15, inward: 20, cooked: 0, thr: 27, closing: 8 }
  ];

  // Direct PDF Download generation with jsPDF
  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Government Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(21, 128, 61); // Emerald Green
      doc.text('GOVERNMENT OF GUJARAT', 105, 14, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('WOMEN & CHILD DEVELOPMENT DEPARTMENT - ICDS ANAND', 105, 19, { align: 'center' });

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text('POSHAN SETU - MONTHLY PROGRESS REPORT (MPR)', 105, 27, { align: 'center' });

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text('Form No. 3: Statutory Commodity Balance Sheet & Nutritional Audit', 105, 32, { align: 'center' });

      // Meta box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 37, 182, 20, 2, 2, 'FD');

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`District: Anand | Taluka: Anand Rural | Sector: Circle 04`, 18, 43);
      doc.text(`Reporting Centre: ${centreName}`, 18, 48);
      doc.text(`Month: ${selectedMonth} | Supervisor: Smt. Shardaben Shah`, 18, 53);

      // AutoTable for Form 3
      const tableHeaders = [
        ['#', 'Commodity Name', 'Unit', 'Opening Stock', 'Inward (GSCSC)', 'Cooked Meals', 'THR Distributed', 'Closing Stock']
      ];

      const tableData = commoditiesList.map((item, idx) => [
        (idx + 1).toString(),
        item.name,
        item.unit,
        item.opening.toFixed(1),
        `+${item.inward.toFixed(1)}`,
        `-${item.cooked.toFixed(1)}`,
        item.thr > 0 ? `-${item.thr.toFixed(1)}` : '0',
        `${item.closing.toFixed(1)} ${item.unit}`
      ]);

      autoTable(doc, {
        head: tableHeaders,
        body: tableData,
        startY: 61,
        theme: 'grid',
        headStyles: {
          fillColor: [21, 128, 61], // Emerald 700
          textColor: [255, 255, 255],
          fontSize: 8.5,
          fontStyle: 'bold',
          halign: 'center'
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 10 },
          1: { halign: 'left', cellWidth: 46 },
          2: { halign: 'center', cellWidth: 16 },
          3: { halign: 'right', cellWidth: 22 },
          4: { halign: 'right', cellWidth: 22, textColor: [21, 128, 61] },
          5: { halign: 'right', cellWidth: 22, textColor: [217, 119, 6] },
          6: { halign: 'right', cellWidth: 22, textColor: [37, 99, 235] },
          7: { halign: 'right', cellWidth: 22, fontStyle: 'bold' }
        },
        styles: {
          fontSize: 8,
          cellPadding: 2.5
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        }
      });

      // Summary KPI boxes below table
      const finalY = (doc as any).lastAutoTable?.finalY || 135;
      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(14, finalY + 8, 56, 18, 1.5, 1.5, 'FD');
      doc.roundedRect(77, finalY + 8, 56, 18, 1.5, 1.5, 'FD');
      doc.roundedRect(140, finalY + 8, 56, 18, 1.5, 1.5, 'FD');

      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Hot Meals Served (Month):', 17, finalY + 14);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('942 Meals', 17, finalY + 21);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('THR Packets Delivered:', 80, finalY + 14);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('124 Packets', 80, finalY + 21);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Total DBT Reimbursements:', 143, finalY + 14);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('INR 2,443.00', 143, finalY + 21);

      // Signatures
      const sigY = finalY + 45;
      doc.setDrawColor(203, 213, 225);
      doc.line(14, sigY, 70, sigY);
      doc.line(126, sigY, 196, sigY);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('Smt. BhavnaBen Patel', 14, sigY + 5);
      doc.text('Smt. Shardaben Shah', 126, sigY + 5);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Anganwadi Worker (AWW)', 14, sigY + 9);
      doc.text('Anganwadi Supervisor (Mukhya Sevika)', 126, sigY + 9);
      doc.text('04-Vadtal Centre, Anand', 14, sigY + 13);
      doc.text('Circle 04, Anand Rural, Anand Dist.', 126, sigY + 13);

      doc.setFontSize(7);
      doc.text(`Digitally certified via Poshan Setu Command Center · ${new Date().toLocaleDateString('en-IN')}`, 105, 285, { align: 'center' });

      // Save file directly!
      const fileName = `ICDS_MPR_${selectedCentre}_${selectedMonth.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      setIsGeneratingPdf(false);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setIsGeneratingPdf(false);
      // Fallback
      window.print();
    }
  };

  // CSV Export function
  const handleExportCsv = () => {
    const headers = [
      'Commodity Name',
      'Unit',
      'Opening Balance (01 Oct)',
      'Total Inward Received (GSCSC)',
      'Total Cooked in Hot Meals',
      'Total THR Distributed',
      'Closing Balance (Store Register)'
    ];

    const rows = commoditiesList.map(c => [
      `"${c.name}"`,
      c.unit,
      c.opening,
      c.inward,
      c.cooked,
      c.thr,
      c.closing
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [
      `"ICDS MONTHLY PROGRESS REPORT (MPR) - ANAND RURAL CIRCLE 04"`,
      `"Reporting Month: ${selectedMonth}"`,
      `"Centre: ${centreName}"`,
      `"Supervisor: Smt. Shardaben Shah"`,
      '',
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ICDS_MPR_${selectedCentre}_October_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action buttons (hidden on print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.reportsTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.reportsSubtitle} · Official Government Form-3 audit sheet
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.downloadCsv}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Official PDF'}</span>
          </button>
        </div>
      </div>

      {/* Official Printable Report Document Paper */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-slate-900">
        {/* Official Letterhead with Poshan Setu Logo */}
        <div className="border-b-2 border-slate-800 pb-5 text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <img
              src="/src/assets/images/poshan_setu_official_logo_1792660604697.jpg"
              alt="Poshan Setu Logo"
              className="w-12 h-12 rounded-full object-cover border border-emerald-600/30 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div className="text-left leading-none">
              <div className="text-lg font-black tracking-tight">
                <span className="text-[#EA580C]">Poshan</span>
                <span className="text-[#15803D] ml-1">Setu</span>
              </div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                Government of Gujarat · ICDS Mission
              </div>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
            WOMEN & CHILD DEVELOPMENT DEPARTMENT · GUJARAT
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
            INTEGRATED CHILD DEVELOPMENT SERVICES (ICDS)
          </h1>
          <div className="text-xs font-semibold text-slate-700">
            MONTHLY PROGRESS REPORT (MPR) — FORM NO. 3 (COMMODITY & THR BALANCE SHEET)
          </div>
          <div className="text-xs text-slate-500 pt-1 font-mono-numbers">
            District: <span className="font-bold text-slate-800">Anand (07)</span> · 
            Taluka: <span className="font-bold text-slate-800">Anand Rural</span> · 
            Sector Circle: <span className="font-bold text-slate-800">Circle 04</span> · 
            Month: <span className="font-bold text-slate-800">{selectedMonth}</span>
          </div>
        </div>

        {/* Metadata info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-500 block">Supervisor:</span>
            <span className="font-bold text-slate-900">Smt. Shardaben Shah</span>
          </div>
          <div>
            <span className="text-slate-500 block">Audited Centres:</span>
            <span className="font-bold text-slate-900">
              {selectedCentre === 'all' ? 'All 4 Circle Centres' : AWC_CENTRES[selectedCentre].name}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Beneficiaries Reached:</span>
            <span className="font-bold text-slate-900 font-mono-numbers">182 Children / 53 Mothers</span>
          </div>
          <div>
            <span className="text-slate-500 block">Audit Status:</span>
            <span className="font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified & Reconciled</span>
            </span>
          </div>
        </div>

        {/* Commodity Balance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300">Sr.</th>
                <th className="py-2.5 px-4 font-bold border-r border-slate-300">{t.commodity}</th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300 text-center">Unit</th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300 text-right">{t.openingBalance}</th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300 text-right">{t.receivedInward}</th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300 text-right">{t.consumedMeals}</th>
                <th className="py-2.5 px-3 font-bold border-r border-slate-300 text-right">{t.thrDistributed}</th>
                <th className="py-2.5 px-4 font-bold text-right bg-emerald-50 text-emerald-950">{t.closingBalance}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {commoditiesList.map((item, idx) => (
                <tr key={item.key} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 border-r border-slate-200 font-mono-numbers text-center">{idx + 1}</td>
                  <td className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono-numbers">{item.unit}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-mono-numbers">{item.opening.toFixed(1)}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-mono-numbers text-emerald-800 font-semibold">+{item.inward.toFixed(1)}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-mono-numbers text-amber-800">-{item.cooked.toFixed(1)}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-mono-numbers text-blue-800">-{item.thr.toFixed(1)}</td>
                  <td className="py-2.5 px-4 text-right font-mono-numbers font-bold text-slate-950 bg-emerald-50/50">
                    {item.closing.toFixed(1)} {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nutritional Performance Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
            <div className="text-slate-500 font-semibold">Cooked Meals Served (Month)</div>
            <div className="text-xl font-bold font-mono-numbers text-slate-900 mt-1">942 meals</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Average 39.2 children / day in Vadtal</div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
            <div className="text-slate-500 font-semibold">THR Take-Home Ration Delivered</div>
            <div className="text-xl font-bold font-mono-numbers text-slate-900 mt-1">124 packets</div>
            <div className="text-[11px] text-slate-600 mt-0.5">100% pregnant & lactating mothers covered</div>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs">
            <div className="text-slate-500 font-semibold">Reimbursement Claims Audited</div>
            <div className="text-xl font-bold font-mono-numbers text-slate-900 mt-1">₹2,443.00</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Vegetables, spices & domestic LPG cylinders</div>
          </div>
        </div>

        {/* Signature & Digital Certification Block */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs border-t border-slate-200">
          <div className="space-y-6">
            <div>
              <span className="text-slate-500 block">Verified by Anganwadi Worker:</span>
              <span className="font-bold text-slate-900 text-sm">Smt. BhavnaBen Patel</span>
              <div className="text-slate-500 text-[11px]">AWW, 04-Vadtal Anganwadi Centre</div>
            </div>
            <div className="text-[11px] text-slate-400">
              Countersigned on store physical stock ledger: 22-10-2026
            </div>
          </div>

          <div className="space-y-6 text-right">
            <div>
              <span className="text-slate-500 block">Approved & Certified by:</span>
              <span className="font-bold text-emerald-950 text-sm">Smt. Shardaben Shah</span>
              <div className="text-emerald-800 font-semibold text-[11px]">
                Anganwadi Supervisor (Mukhya Sevika), Anand Rural Circle 04
              </div>
            </div>
            <div className="text-[11px] text-slate-500 font-mono-numbers">
              Digital Signature ID: GJ-ICDS-AND-2026-9941 · CDPO Anand Rural
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
