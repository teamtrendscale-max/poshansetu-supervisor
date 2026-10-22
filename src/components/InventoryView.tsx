import React, { useState } from 'react';
import { AwcId, InventoryItem, InwardChallan, Language } from '../types';
import { translations } from '../services/translations';
import { AWC_CENTRES } from '../data/mockData';
import { 
  Boxes, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Search, 
  FileText, 
  Calendar, 
  Truck, 
  ShieldCheck,
  X
} from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  challans: InwardChallan[];
  awcId: AwcId;
  onAddChallan: (awcId: AwcId, challan: InwardChallan) => void;
  language: Language;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  challans,
  awcId,
  onAddChallan,
  language
}) => {
  const t = translations[language];
  const centre = AWC_CENTRES[awcId];

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'grain' | 'pulse' | 'oil' | 'thr'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new challan
  const [challanNumber, setChallanNumber] = useState(`GSCSC-AND-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [supplier, setSupplier] = useState('Gujarat State Civil Supplies Corporation Godown, Anand');
  const [vehicleNo, setVehicleNo] = useState('GJ-23-AX-5510');
  const [selectedCommodity, setSelectedCommodity] = useState('Fortified Rice');
  const [quantity, setQuantity] = useState(50);
  const [batchNo, setBatchNo] = useState('GSCSC-RICE-24-B19');
  const [expiryDate, setExpiryDate] = useState('2027-05-30');

  const safeInventory = Array.isArray(inventory) ? inventory : [];

  const filteredItems = safeInventory.filter((item) => {
    if (!item || typeof item !== 'object') return false;
    const nameStr = (item.name || '').toLowerCase();
    const nameGuStr = item.nameGu || '';
    const query = (searchQuery || '').toLowerCase();
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = !query || nameStr.includes(query) || nameGuStr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCreateChallan = (e: React.FormEvent) => {
    e.preventDefault();
    const newChallan: InwardChallan = {
      id: `chl_${Date.now()}`,
      challanNumber,
      sourceSupplier: supplier,
      date: new Date().toISOString().split('T')[0],
      receivedBy: `${centre.workerName} (AWW)`,
      vehicleNumber: vehicleNo,
      verifiedBySupervisor: true,
      items: [
        {
          itemName: selectedCommodity,
          quantity: Number(quantity),
          unit: selectedCommodity.includes('Oil') ? 'liter' : selectedCommodity.includes('Shakti') ? 'packets' : 'kg',
          batchNumber: batchNo,
          mfgDate: new Date().toISOString().split('T')[0],
          expiryDate
        }
      ]
    };

    onAddChallan(awcId, newChallan);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Centre Title */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono-numbers">
              {centre.code}
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'gu' ? centre.nameGu : centre.name} · {t.inventoryTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.inventorySubtitle} · AWW: <span className="font-semibold text-slate-700">{centre.workerName}</span>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.logChallanBtn}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {(['all', 'grain', 'pulse', 'oil', 'thr'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' && (language === 'gu' ? 'બધી સામગ્રી' : 'All Items')}
              {cat === 'grain' && (language === 'gu' ? 'અનાજ (ચોખા/લોટ)' : 'Grains')}
              {cat === 'pulse' && (language === 'gu' ? 'દાળ (કઠોળ)' : 'Pulses')}
              {cat === 'oil' && (language === 'gu' ? 'તેલ' : 'Oil')}
              {cat === 'thr' && (language === 'gu' ? 'ટી.એચ.આર. પેકેટ્સ' : 'THR Packets')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={language === 'gu' ? 'સામગ્રી શોધો...' : 'Search stock item...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Visual Commodity Pantry Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const stockKg = typeof item.currentStockKg === 'number' ? item.currentStockKg : (Number(item.currentStockKg) || 0);
          const dailyCons = typeof item.dailyConsumption === 'number' && item.dailyConsumption > 0 ? item.dailyConsumption : 1.5;
          const minThresh = typeof item.minimumThreshold === 'number' ? item.minimumThreshold : 10;
          const daysRemaining = Math.floor(stockKg / dailyCons);
          const isCritical = stockKg <= minThresh;
          const isWarning = !isCritical && daysRemaining <= 7;
          
          // Gauge percentage (cap at 100%)
          const maxCapacity = minThresh * 3;
          const pct = Math.min(100, Math.round((stockKg / maxCapacity) * 100));

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-4 shadow-xs flex flex-col justify-between transition-all ${
                isCritical 
                  ? 'border-red-300 ring-1 ring-red-200 bg-red-50/20' 
                  : isWarning 
                    ? 'border-amber-200' 
                    : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'gu' ? (item.nameGu || item.name) : (item.name || 'Commodity')}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-mono-numbers mt-0.5">
                      Batch: {item.batchNumber || 'GSCSC-GEN-24'}
                    </div>
                  </div>

                  {isCritical ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 whitespace-nowrap">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span>{language === 'gu' ? 'રિફિલ જરૂરી' : 'Low Stock'}</span>
                    </span>
                  ) : isWarning ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
                      {language === 'gu' ? '૭ દિવસ બાકી' : 'Approaching'}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                      {language === 'gu' ? 'પર્યાપ્ત' : 'Adequate'}
                    </span>
                  )}
                </div>

                {/* Stock Gauge */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-2xl font-bold font-mono-numbers text-slate-900">
                      {stockKg} <span className="text-xs font-semibold text-slate-500">{item.unit || 'kg'}</span>
                    </span>
                    <span className="text-xs font-bold font-mono-numbers text-slate-700">
                      ~{daysRemaining} {language === 'gu' ? 'દિવસ સ્ટોક' : 'days left'}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isCritical
                          ? 'bg-red-500'
                          : isWarning
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom details */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 text-[11px] text-slate-500 font-mono-numbers">
                <div>
                  <span className="block text-slate-400">{t.burnRate}:</span>
                  <span className="font-semibold text-slate-700">
                    {item.dailyConsumption} {item.unit}/day
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-400">Min Threshold:</span>
                  <span className="font-semibold text-slate-700">
                    {item.minimumThreshold} {item.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inward Challan History Audit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.inwardHistory}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Physical receipts, truck delivery numbers and expiry compliance verification
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            {challans.length} Challans Audited
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">{t.challanNo}</th>
                <th className="py-3 px-3 font-bold">{t.supplier}</th>
                <th className="py-3 px-3 font-bold">{t.inwardDate}</th>
                <th className="py-3 px-3 font-bold">Items & Quantities</th>
                <th className="py-3 px-3 font-bold">{t.batches}</th>
                <th className="py-3 px-4 font-bold text-center">{t.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {challans.map((chl) => (
                <tr key={chl.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold font-mono-numbers text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{chl.challanNumber}</span>
                    </div>
                    {chl.vehicleNumber && (
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Truck: {chl.vehicleNumber}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-slate-700 max-w-[220px]">
                    <div className="font-medium truncate">{chl.sourceSupplier}</div>
                    <div className="text-[10px] text-slate-400">Recv: {chl.receivedBy}</div>
                  </td>

                  <td className="py-3 px-3 font-mono-numbers text-slate-600">
                    {chl.date}
                  </td>

                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {chl.items.map((it, idx) => (
                        <div key={idx} className="font-medium text-slate-800">
                          {it.itemName}: <span className="font-bold font-mono-numbers text-emerald-800">{it.quantity} {it.unit}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono-numbers text-slate-600">
                    {chl.items.map((it, idx) => (
                      <div key={idx} className="text-[11px]">
                        <span>{it.batchNumber}</span>
                        <span className="text-slate-400"> (Exp: {it.expiryDate})</span>
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {chl.verifiedBySupervisor ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Supervisor Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pending Stamp
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Inward Challan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                {t.logChallanBtn} — {centre.name}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateChallan} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.challanNo}</label>
                <input
                  type="text"
                  required
                  value={challanNumber}
                  onChange={(e) => setChallanNumber(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono-numbers"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.supplier}</label>
                <input
                  type="text"
                  required
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.commodity}</label>
                  <select
                    value={selectedCommodity}
                    onChange={(e) => setSelectedCommodity(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Fortified Rice">Fortified Rice</option>
                    <option value="Wheat Atta">Wheat Atta</option>
                    <option value="Tuver Dal">Tuver Dal</option>
                    <option value="Fortified Palmolein Oil">Fortified Oil</option>
                    <option value="Bal Shakti Packets (500g)">Bal Shakti THR</option>
                    <option value="Matru Shakti Packets (1kg)">Matru Shakti THR</option>
                    <option value="Purna Shakti Packets (1kg)">Purna Shakti THR</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quantity ({selectedCommodity.includes('Oil') ? 'liters' : selectedCommodity.includes('Shakti') ? 'pkts' : 'kg'})
                  </label>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    required
                    value={batchNo}
                    onChange={(e) => setBatchNo(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono-numbers"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono-numbers"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehicle / Truck Number</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono-numbers"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold cursor-pointer"
                >
                  Save Inward Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
