import React from 'react';
import { ViewTab, Language } from '../types';
import { translations } from '../services/translations';
import { 
  LayoutDashboard, 
  Boxes, 
  UtensilsCrossed, 
  ReceiptIndianRupee, 
  ArrowLeftRight, 
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  language: Language;
  stockAlertCount: number;
  pendingBillsCount: number;
  pendingMealAuditCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  language,
  stockAlertCount,
  pendingBillsCount,
  pendingMealAuditCount
}) => {
  const t = translations[language];

  const navItems: { id: ViewTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number; badgeColor?: string }[] = [
    {
      id: 'overview',
      label: t.navOverview,
      icon: LayoutDashboard
    },
    {
      id: 'inventory',
      label: t.navInventory,
      icon: Boxes,
      badge: stockAlertCount > 0 ? stockAlertCount : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'meals',
      label: t.navMeals,
      icon: UtensilsCrossed,
      badge: pendingMealAuditCount > 0 ? pendingMealAuditCount : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'bills',
      label: t.navBills,
      icon: ReceiptIndianRupee,
      badge: pendingBillsCount > 0 ? pendingBillsCount : undefined,
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'transfers',
      label: t.navTransfers,
      icon: ArrowLeftRight
    },
    {
      id: 'report',
      label: t.navReports,
      icon: FileSpreadsheet
    }
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 shrink-0">
      <div className="p-3 sm:p-4">
        {/* Navigation title */}
        <div className="hidden lg:block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-3">
          {language === 'gu' ? 'મુખ્ય મોડ્યુલ્સ' : 'SUPERVISORY WORKSPACE'}
        </div>

        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-numbers shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Help box */}
        <div className="hidden lg:block mt-6 pt-4 border-t border-slate-100 px-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'મહત્વપૂર્ણ સંપર્ક' : 'CDPO Helpline'}</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {language === 'gu'
              ? 'પુરવઠા અથવા ચુકવણી સહાય માટે આણંદ કચેરી: 02692-260144'
              : 'Anand District ICDS Support: 02692-260144 (09:30 AM - 06:00 PM)'}
          </p>
        </div>
      </div>
    </aside>
  );
};
