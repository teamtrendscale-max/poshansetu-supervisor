import React, { useState } from 'react';
import { BillUpload, Language, AwcId } from '../types';
import { translations } from '../services/translations';
import { 
  ReceiptIndianRupee, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  ExternalLink, 
  AlertCircle,
  Eye,
  Send,
  X
} from 'lucide-react';

interface BillPortalViewProps {
  bills: BillUpload[];
  onUpdateBillStatus: (awcId: AwcId, billId: string, status: BillUpload['status'], note?: string) => Promise<void>;
  selectedCentre: AwcId | 'all';
  language: Language;
}

export const BillPortalView: React.FC<BillPortalViewProps> = ({
  bills,
  onUpdateBillStatus,
  selectedCentre,
  language
}) => {
  const t = translations[language];
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_review' | 'approved_dbt' | 'disbursed' | 'rejected_reupload'>('all');
  const [previewBill, setPreviewBill] = useState<BillUpload | null>(null);
  const [actionModalBill, setActionModalBill] = useState<{ bill: BillUpload; targetStatus: BillUpload['status'] } | null>(null);
  const [supervisorNote, setSupervisorNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredBills = bills.filter((bill) => {
    const matchesCentre = selectedCentre === 'all' || bill.awcId === selectedCentre;
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    return matchesCentre && matchesStatus;
  });

  const totalClaimAmount = filteredBills.reduce((acc, b) => acc + b.amount, 0);
  const pendingCount = bills.filter(b => b.status === 'pending_review').length;

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionModalBill) return;

    setIsProcessing(true);
    await onUpdateBillStatus(
      actionModalBill.bill.awcId,
      actionModalBill.bill.id,
      actionModalBill.targetStatus,
      supervisorNote
    );
    setIsProcessing(false);
    setActionModalBill(null);
    setSupervisorNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Totals */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {t.billsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.billsSubtitle} · Direct Benefit Transfer (DBT) clearance to Anganwadi Workers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-right">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Claims Listed</div>
            <div className="text-base font-bold font-mono-numbers text-slate-900">
              ₹{totalClaimAmount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-2 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold">
        {(['all', 'pending_review', 'approved_dbt', 'disbursed', 'rejected_reupload'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === st
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st === 'all' && `${t.allStatus} (${bills.length})`}
            {st === 'pending_review' && `${t.pendingClaims} (${bills.filter(b => b.status === 'pending_review').length})`}
            {st === 'approved_dbt' && `${t.approvedClaims} (${bills.filter(b => b.status === 'approved_dbt').length})`}
            {st === 'disbursed' && `${t.disbursedClaims} (${bills.filter(b => b.status === 'disbursed').length})`}
            {st === 'rejected_reupload' && `${t.rejectedClaims} (${bills.filter(b => b.status === 'rejected_reupload').length})`}
          </button>
        ))}
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">{t.receiptPreview}</th>
                <th className="py-3 px-3 font-bold">{t.invoiceNumber}</th>
                <th className="py-3 px-3 font-bold">AWC Centre</th>
                <th className="py-3 px-3 font-bold">{t.vendor} & {t.categoryLabel}</th>
                <th className="py-3 px-3 font-bold text-right">{t.claimAmount}</th>
                <th className="py-3 px-3 font-bold">{t.workerNote}</th>
                <th className="py-3 px-3 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.map((bill) => {
                return (
                  <tr key={bill.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div
                        onClick={() => setPreviewBill(bill)}
                        className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 cursor-pointer relative group shrink-0"
                      >
                        <img
                          src={bill.imageUrl}
                          alt={bill.invoiceNumber}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </td>

                    {/* Invoice Number */}
                    <td className="py-3 px-3 font-mono-numbers">
                      <div className="font-bold text-slate-900">{bill.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400">Date: {bill.billDate}</div>
                    </td>

                    {/* AWC Centre */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{bill.awcName.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400">{bill.uploadedAt}</div>
                    </td>

                    {/* Vendor & Category */}
                    <td className="py-3 px-3 max-w-[200px]">
                      <div className="font-medium text-slate-800 truncate">{bill.vendorName}</div>
                      <span className="inline-block mt-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {bill.vendorCategory}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-3 text-right font-mono-numbers font-bold text-slate-900 text-sm">
                      ₹{(Number(bill.amount) || 0).toFixed(2)}
                    </td>

                    {/* Worker Remark */}
                    <td className="py-3 px-3 max-w-[220px] text-slate-600 text-[11px]">
                      <p className="line-clamp-2 leading-relaxed">{bill.workerRemark}</p>
                      {bill.supervisorNote && (
                        <div className="text-[10px] text-emerald-800 font-medium mt-1">
                          Note: {bill.supervisorNote}
                        </div>
                      )}
                      {bill.dbtReferenceNumber && (
                        <div className="text-[10px] text-slate-500 font-mono-numbers">
                          Ref: {bill.dbtReferenceNumber}
                        </div>
                      )}
                    </td>

                    {/* Status Chip */}
                    <td className="py-3 px-3 text-center">
                      {bill.status === 'pending_review' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{t.pendingClaims}</span>
                        </span>
                      )}
                      {bill.status === 'approved_dbt' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{t.approvedClaims}</span>
                        </span>
                      )}
                      {bill.status === 'disbursed' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          <span>{t.disbursedClaims}</span>
                        </span>
                      )}
                      {bill.status === 'rejected_reupload' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          <XCircle className="w-3 h-3 text-red-600" />
                          <span>{t.rejectedClaims}</span>
                        </span>
                      )}
                    </td>

                    {/* Review Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {bill.status === 'pending_review' && (
                          <>
                            <button
                              onClick={() => {
                                setSupervisorNote('Verified bill invoice and prices against mandali rates. Approved for DBT payment.');
                                setActionModalBill({ bill, targetStatus: 'approved_dbt' });
                              }}
                              className="bg-emerald-800 hover:bg-emerald-900 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
                              title="Approve for DBT"
                            >
                              {t.approveDbt}
                            </button>
                            <button
                              onClick={() => {
                                setSupervisorNote('Receipt is partially faded or vendor signature is missing. Please re-upload clearer copy.');
                                setActionModalBill({ bill, targetStatus: 'rejected_reupload' });
                              }}
                              className="border border-red-200 text-red-700 hover:bg-red-50 px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Request Re-upload"
                            >
                              Re-upload
                            </button>
                          </>
                        )}

                        {bill.status === 'approved_dbt' && (
                          <button
                            onClick={() => {
                              setSupervisorNote('PFMS Direct transfer completed to Anganwadi Worker Bank Account.');
                              setActionModalBill({ bill, targetStatus: 'disbursed' });
                            }}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
                            title="Mark as Disbursed"
                          >
                            {t.markDisbursed}
                          </button>
                        )}

                        {bill.status === 'disbursed' && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            Paid via PFMS
                          </span>
                        )}

                        {bill.status === 'rejected_reupload' && (
                          <button
                            onClick={() => {
                              setSupervisorNote('Re-reviewed with AWW. Cleared for DBT.');
                              setActionModalBill({ bill, targetStatus: 'approved_dbt' });
                            }}
                            className="text-[11px] text-slate-600 hover:text-slate-900 underline cursor-pointer"
                          >
                            Re-evaluate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Receipt Preview Modal */}
      {previewBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {previewBill.vendorName} · ₹{previewBill.amount}
                </h3>
                <p className="text-xs text-slate-500 font-mono-numbers">
                  {previewBill.invoiceNumber} · {previewBill.billDate}
                </p>
              </div>
              <button
                onClick={() => setPreviewBill(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[460px] overflow-auto">
              <img
                src={previewBill.imageUrl}
                alt={previewBill.invoiceNumber}
                className="max-h-[420px] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-1">
              <div><span className="font-bold">Centre:</span> {previewBill.awcName}</div>
              <div><span className="font-bold">Remark:</span> {previewBill.workerRemark}</div>
            </div>
          </div>
        </div>
      )}

      {/* Supervisor Action Confirm Modal */}
      {actionModalBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                Confirm Supervisory Action
              </h3>
              <button
                onClick={() => setActionModalBill(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">{actionModalBill.bill.vendorName}</div>
                <div className="text-slate-500 font-mono-numbers">
                  {actionModalBill.bill.invoiceNumber} · ₹{actionModalBill.bill.amount}
                </div>
                <div className="mt-1 text-slate-700">
                  Target Status: <span className="font-bold uppercase text-emerald-800">{actionModalBill.targetStatus.replace('_', ' ')}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Supervisor Audit Note / Remark:
                </label>
                <textarea
                  rows={3}
                  required
                  value={supervisorNote}
                  onChange={(e) => setSupervisorNote(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="Provide approval remark, mandali rate verification, or reason for re-upload..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActionModalBill(null)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  {isProcessing ? 'Writing to RTDB...' : 'Confirm & Sync'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
