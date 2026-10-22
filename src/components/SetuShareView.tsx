import React, { useState } from 'react';
import { SetuShareTransfer, AwcId, Language } from '../types';
import { translations } from '../services/translations';
import { AWC_CENTRES } from '../data/mockData';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  KeyRound, 
  ShieldCheck, 
  Building2,
  X,
  RefreshCw
} from 'lucide-react';

interface SetuShareViewProps {
  transfers: SetuShareTransfer[];
  onAddTransfer: (transfer: SetuShareTransfer) => void;
  onSettleTransfer: (transferId: string) => void;
  selectedCentre: AwcId | 'all';
  language: Language;
}

export const SetuShareView: React.FC<SetuShareViewProps> = ({
  transfers,
  onAddTransfer,
  onSettleTransfer,
  selectedCentre,
  language
}) => {
  const t = translations[language];
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [fromAwc, setFromAwc] = useState<AwcId>('awc_awvad04');
  const [toAwc, setToAwc] = useState<AwcId>('awc_awvad02');
  const [commodity, setCommodity] = useState('Fortified Rice');
  const [quantity, setQuantity] = useState(5);
  const [reason, setReason] = useState('Urgent buffer required before godown delivery arrival.');
  const [generatedOtp, setGeneratedOtp] = useState(`#${Math.floor(1000 + Math.random() * 9000)}`);

  const filteredTransfers = transfers.filter((t) => {
    if (selectedCentre === 'all') return true;
    return t.fromAwcId === selectedCentre || t.toAwcId === selectedCentre;
  });

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrf: SetuShareTransfer = {
      id: `trf_${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      fromAwcId: fromAwc,
      fromAwcName: AWC_CENTRES[fromAwc].name,
      toAwcId: toAwc,
      toAwcName: AWC_CENTRES[toAwc].name,
      commodityName: commodity,
      quantity: Number(quantity),
      unit: commodity.includes('Oil') ? 'liter' : commodity.includes('Shakti') ? 'packets' : 'kg',
      otpCode: generatedOtp,
      status: 'transferred',
      reason,
      initiatedBy: `${AWC_CENTRES[toAwc].workerName} (Borrower)`
    };

    onAddTransfer(newTrf);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.transfersTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.transfersSubtitle} · Zero-stock prevention network across Anand Rural Circle
          </p>
        </div>

        <button
          onClick={() => {
            setGeneratedOtp(`#${Math.floor(1000 + Math.random() * 9000)}`);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.newTransferBtn}</span>
        </button>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Active & Settled Inter-AWC Commodity Ledgers
          </h3>
          <span className="text-xs font-mono-numbers text-slate-500">
            Total {filteredTransfers.length} transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Date & Time</th>
                <th className="py-3 px-3 font-bold">{t.fromAwc}</th>
                <th className="py-3 px-3 font-bold">{t.toAwc}</th>
                <th className="py-3 px-3 font-bold">Lent Commodity</th>
                <th className="py-3 px-3 font-bold text-center">{t.otpBadge}</th>
                <th className="py-3 px-3 font-bold">{t.reasonLabel}</th>
                <th className="py-3 px-3 font-bold text-center">{t.settlementStatus}</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map((item) => {
                const isSettled = item.status === 'returned_settled';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono-numbers text-slate-600">
                      <div>{item.date}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{item.fromAwcName.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400">{item.fromAwcId}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{item.toAwcName.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400">{item.toAwcId}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-emerald-800 font-mono-numbers text-sm">
                        {item.quantity} {item.unit}
                      </div>
                      <div className="text-slate-600 text-[11px]">{item.commodityName}</div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-800 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-[11px]">
                        <KeyRound className="w-3 h-3 text-amber-600" />
                        <span>{item.otpCode}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 max-w-[220px] text-slate-600 text-[11px]">
                      <p className="line-clamp-2 leading-relaxed">{item.reason}</p>
                      <div className="text-[10px] text-slate-400 mt-0.5">By: {item.initiatedBy}</div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      {isSettled ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Settled & Returned</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Active Borrowing</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {!isSettled ? (
                        <button
                          onClick={() => onSettleTransfer(item.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Returned
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono-numbers">
                          Settled {item.settledDate}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorize New Transfer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                Authorize Inter-Centre Commodity Lending
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.fromAwc}</label>
                  <select
                    value={fromAwc}
                    onChange={(e) => setFromAwc(e.target.value as AwcId)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="awc_awvad04">04-Vadtal Centre</option>
                    <option value="awc_awvad02">02-Mogri Centre</option>
                    <option value="awc_awvad03">03-Karamsad Centre</option>
                    <option value="awc_awvad05">05-Samarkha Centre</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.toAwc}</label>
                  <select
                    value={toAwc}
                    onChange={(e) => setToAwc(e.target.value as AwcId)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="awc_awvad02">02-Mogri Centre</option>
                    <option value="awc_awvad04">04-Vadtal Centre</option>
                    <option value="awc_awvad03">03-Karamsad Centre</option>
                    <option value="awc_awvad05">05-Samarkha Centre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Commodity</label>
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Fortified Rice">Fortified Rice</option>
                    <option value="Wheat Atta">Wheat Atta</option>
                    <option value="Fortified Edible Oil">Fortified Oil</option>
                    <option value="Tuver Dal">Tuver Dal</option>
                    <option value="Bal Shakti THR Packets">Bal Shakti THR</option>
                    <option value="Matru Shakti THR Packets">Matru Shakti THR</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.transferQty}</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono-numbers"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">Dual Verification OTP Code</div>
                  <div className="text-[11px] text-amber-700">Both workers confirm handoff via this code</div>
                </div>
                <div className="text-base font-mono font-bold text-amber-900 bg-white px-2.5 py-1 rounded border border-amber-300">
                  {generatedOtp}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.reasonLabel}</label>
                <textarea
                  rows={2}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold cursor-pointer"
                >
                  Authorize & Issue OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
