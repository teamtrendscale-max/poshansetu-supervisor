import React from 'react';
import { AwcId, Language, ViewTab } from '../types';
import { translations } from '../services/translations';
import { AWC_CENTRES } from '../data/mockData';
import { StoreState } from '../services/firebase';
import { 
  Users, 
  UtensilsCrossed, 
  AlertTriangle, 
  ReceiptIndianRupee, 
  CheckCircle2, 
  ArrowUpRight,
  Clock,
  Building2,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface OverviewViewProps {
  store: StoreState;
  currentCentre: AwcId | 'all';
  onSelectTab: (tab: ViewTab) => void;
  onSelectCentre: (centreId: AwcId | 'all') => void;
  onOpenPhotoModal: (photo: any) => void;
  language: Language;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  store,
  currentCentre,
  onSelectTab,
  onSelectCentre,
  onOpenPhotoModal,
  language
}) => {
  const t = translations[language];

  // Calculate totals
  const centreKeys: AwcId[] = currentCentre === 'all' 
    ? ['awc_awvad04', 'awc_awvad02', 'awc_awvad03', 'awc_awvad05', 'awc_10103']
    : [currentCentre];

  const totalEnrolled = centreKeys.reduce((acc, id) => acc + (store.attendance[id]?.enrolled || AWC_CENTRES[id].enrolledChildren), 0);
  const totalPresent = centreKeys.reduce((acc, id) => acc + (store.attendance[id]?.present || 0), 0);
  const attendanceRate = totalEnrolled > 0 ? Math.round((totalPresent / totalEnrolled) * 100) : 0;

  // Meal compliance
  const totalMealEntries = centreKeys.reduce((acc, id) => acc + (store.meals[id]?.length || 0), 0);
  const verifiedMeals = centreKeys.reduce((acc, id) => acc + (store.meals[id]?.filter(m => m.supervisorVerified).length || 0), 0);

  // Stock alerts
  const lowStockItems: { awcId: AwcId; name: string; current: number; threshold: number; unit: string }[] = [];
  centreKeys.forEach((id) => {
    (store.inventory[id] || []).forEach((item) => {
      if (item && typeof item === 'object') {
        const current = typeof item.currentStockKg === 'number' ? item.currentStockKg : (Number(item.currentStockKg) || 0);
        const threshold = typeof item.minimumThreshold === 'number' ? item.minimumThreshold : 10;
        if (current <= threshold) {
          lowStockItems.push({
            awcId: id,
            name: language === 'gu' ? (item.nameGu || item.name || 'સામગ્રી') : (item.name || 'Item'),
            current,
            threshold,
            unit: item.unit || 'kg'
          });
        }
      }
    });
  });

  // Pending Bills
  const filteredBills = currentCentre === 'all'
    ? store.bills
    : store.bills.filter(b => b.awcId === currentCentre);
  const pendingBills = filteredBills.filter(b => b.status === 'pending_review');
  const pendingAmount = pendingBills.reduce((acc, b) => acc + b.amount, 0);

  // Today's primary photo (Vadtal lunch)
  const primaryPhoto = store.mealPhotos.awc_awvad04?.[0];

  return (
    <div className="space-y-6">
      {/* Sector Alert Banner if low stock */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">
                {language === 'gu'
                  ? `ધ્યાન આપો: ${lowStockItems.length} સામગ્રીઓમાં સ્ટોક નહિવત (૫ દિવસથી ઓછો)`
                  : `Attention Required: ${lowStockItems.length} commodities critically low in stock`}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {lowStockItems.slice(0, 3).map(i => `${i.name} (${i.current} ${i.unit})`).join(', ')}
                {lowStockItems.length > 3 ? ` +${lowStockItems.length - 3} more` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('inventory')}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <span>{t.navInventory}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Children Attendance */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.kpiChildrenPresent}
            </span>
            <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-md">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900">
              {totalPresent}
            </span>
            <span className="text-xs text-slate-500 font-mono-numbers">
              / {totalEnrolled} ({attendanceRate}%)
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-emerald-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>
              {language === 'gu' ? '૯૨% પોષણ હાજરી દર' : '+4% over last week'}
            </span>
          </div>
        </div>

        {/* KPI 2: Meal Compliance */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.kpiMealStatus}
            </span>
            <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-md">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900">
              {verifiedMeals} / {totalMealEntries}
            </span>
            <span className="text-xs text-emerald-700 font-medium">
              {language === 'gu' ? 'પ્રમાણિત' : 'Verified'}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>04-Vadtal: Hot lunch logged & geotagged</span>
          </div>
        </div>

        {/* KPI 3: Stock Alert Badge */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.kpiStockAlerts}
            </span>
            <div className={`p-1.5 rounded-md ${lowStockItems.length > 0 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900">
              {lowStockItems.length}
            </span>
            <span className="text-xs text-slate-500">
              {t.kpiStockItemsNeedInward}
            </span>
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium">
            {lowStockItems.length > 0 
              ? (language === 'gu' ? 'પૂર્ણા શક્તિ / તુવેર દાળ રિફિલ જરૂરી' : 'Purna Shakti & Dal need inward') 
              : 'All commodities healthy (>7 days)'}
          </div>
        </div>

        {/* KPI 4: Pending DBT Claims */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.kpiPendingBills}
            </span>
            <div className="p-1.5 bg-orange-50 text-orange-700 rounded-md">
              <ReceiptIndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900">
              {pendingBills.length}
            </span>
            <span className="text-xs text-slate-500">
              claims (₹{pendingAmount.toLocaleString('en-IN')})
            </span>
          </div>
          <div className="mt-2 text-xs text-orange-700 font-medium">
            {language === 'gu' ? 'ડીબીટી મંજૂરી માટે તૈયાર' : 'Awaiting Supervisor Approval'}
          </div>
        </div>
      </div>

      {/* Main Content Split: Circle Centres Status + Live Meal Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Anand Rural Circle 04 Centres Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'gu' ? 'આણંદ ગ્રામ્ય સર્કલ ૦૪ કેન્દ્ર નિરીક્ષણ' : 'Circle 04 Anganwadi Centres Audit'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'gu'
                  ? 'સુપરવાઇઝર શારદાબેન શાહ હેઠળના તમામ ૫ આંગણવાડી કેન્દ્રોની સ્થિતિ'
                  : 'Real-time performance across 5 operational centres under Supervisor Shardaben'}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              5 Active Centres
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">{language === 'gu' ? 'આંગણવાડી કેન્દ્ર' : 'Centre & Worker'}</th>
                  <th className="py-3 px-3 font-bold text-center">{language === 'gu' ? 'હાજરી' : 'Attendance'}</th>
                  <th className="py-3 px-3 font-bold text-center">{language === 'gu' ? 'ગરમ ભોજન' : 'Hot Meal'}</th>
                  <th className="py-3 px-3 font-bold text-center">{language === 'gu' ? 'ઓછો સ્ટોક' : 'Stock Alert'}</th>
                  <th className="py-3 px-3 font-bold text-center">{language === 'gu' ? 'બાકી બિલો' : 'Pending Bills'}</th>
                  <th className="py-3 px-4 font-bold text-right">{language === 'gu' ? 'ક્રિયા' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(['awc_awvad04', 'awc_awvad02', 'awc_awvad03', 'awc_awvad05', 'awc_10103'] as AwcId[]).map((id) => {
                  const info = AWC_CENTRES[id];
                  const att = store.attendance[id];
                  const meals = store.meals[id] || [];
                  const isMealVerified = meals.some(m => m.supervisorVerified);
                  const isMealUploaded = meals.length > 0;
                  
                  // Low stock for this centre
                  const lowCount = (store.inventory[id] || []).filter(i => i && typeof i === 'object' && ((typeof i.currentStockKg === 'number' ? i.currentStockKg : (Number(i.currentStockKg) || 0)) <= (typeof i.minimumThreshold === 'number' ? i.minimumThreshold : 10))).length;
                  const centrePendingBills = store.bills.filter(b => b && b.awcId === id && b.status === 'pending_review').length;

                  return (
                    <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">
                          {language === 'gu' ? info.nameGu : info.name}
                          {id === 'awc_awvad04' && (
                            <span className="ml-1.5 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          AWW: {info.workerName} · {info.workerPhone}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="font-bold font-mono-numbers text-slate-900">
                          {att?.present || 0}/{att?.enrolled || info.enrolledChildren}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold font-mono-numbers">
                          {Math.round(((att?.present || 0) / (att?.enrolled || info.enrolledChildren)) * 100)}%
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        {isMealVerified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{language === 'gu' ? 'પ્રમાણિત' : 'Verified'}</span>
                          </span>
                        ) : isMealUploaded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>{language === 'gu' ? 'ઓડિટ બાકી' : 'Pending'}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Not Uploaded</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center font-mono-numbers">
                        {lowCount > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span>{lowCount} items</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Normal</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center font-mono-numbers">
                        {centrePendingBills > 0 ? (
                          <span className="inline-block text-[11px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                            {centrePendingBills} claims
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">0</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            onSelectCentre(id);
                            onSelectTab('meals');
                          }}
                          className="text-xs text-emerald-800 hover:text-emerald-950 font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{language === 'gu' ? 'તપાસો' : 'Inspect'}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Live Geotagged Meal Inspection Spotlight (Vadtal Primary) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'gu' ? 'તાજેતરનો જીઓટેગ ભોજન ફોટો' : "Today's Verified Hot Meal"}
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                04-Vadtal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              AWW: Smt. BhavnaBen Patel · 12:18 PM
            </p>
          </div>

          {primaryPhoto ? (
            <div className="p-4 space-y-3">
              <div 
                onClick={() => onOpenPhotoModal(primaryPhoto)}
                className="relative rounded-lg overflow-hidden border border-slate-200 cursor-pointer group bg-slate-900"
              >
                <img
                  src={primaryPhoto.imageUrl}
                  alt={primaryPhoto.menuName}
                  className="w-full h-44 object-cover group-hover:scale-102 transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                    <MapPin className="w-3 h-3" />
                    <span>22.58512° N, 72.93245° E (±4.2m)</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-100 truncate">
                    {primaryPhoto.menuName}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t.childrenServed}:</span>
                  <span className="font-bold text-slate-900 font-mono-numbers">39 children</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hygiene & Portions:</span>
                  <span className="font-semibold text-emerald-700">ICDS Compliant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Supervisor Stamp:</span>
                  <span className="font-bold text-emerald-800">Shardaben Shah (12:45 PM)</span>
                </div>
              </div>

              <button
                onClick={() => onOpenPhotoModal(primaryPhoto)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
              >
                {t.viewEnlarged}
              </button>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No meal photo recorded today
            </div>
          )}

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={() => onSelectTab('meals')}
              className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
            >
              {language === 'gu' ? 'બધા ૪ કેન્દ્રોના ભોજન ફોટા જુઓ →' : 'View all circle meal submissions →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
