import React from 'react';
import { AwcId, Language } from '../types';
import { AWC_CENTRES } from '../data/mockData';
import { translations } from '../services/translations';
import { RefreshCw, Calendar, MapPin, Globe, CheckCircle2, CloudOff, Building2, User } from 'lucide-react';

interface HeaderProps {
  currentCentre: AwcId | 'all';
  onSelectCentre: (centreId: AwcId | 'all') => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  isLiveConnected: boolean;
  lastSynced: string;
  onSyncLive: () => void;
  onSeedRtdb: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentCentre,
  onSelectCentre,
  selectedDate,
  onSelectDate,
  language,
  onToggleLanguage,
  isLiveConnected,
  lastSynced,
  onSyncLive,
  onSeedRtdb,
  isSyncing
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top micro-bar for Gujarat State & ICDS mandate */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-emerald-900/20">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide">
            {language === 'gu' ? 'ગુજરાત સરકાર' : 'GOVERNMENT OF GUJARAT'}
          </span>
          <span className="text-emerald-300">·</span>
          <span>{t.department}</span>
          <span className="text-emerald-300">·</span>
          <span className="text-emerald-200 font-medium">{t.anandCircle}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* RTDB status indicator */}
          <div className="flex items-center gap-1.5 font-mono-numbers text-[11px]">
            {isLiveConnected ? (
              <span className="flex items-center gap-1 text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{t.liveRtdb}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{t.offlineRtdb}</span>
              </span>
            )}
            <span className="text-emerald-400">({lastSynced})</span>
          </div>

          <button
            onClick={onSyncLive}
            disabled={isSyncing}
            className="flex items-center gap-1 text-[11px] bg-emerald-700/60 hover:bg-emerald-700 text-white px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer"
            title="Sync with Firebase RTDB"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{t.refreshData}</span>
          </button>

          <button
            onClick={onSeedRtdb}
            className="text-[11px] bg-emerald-900/60 hover:bg-emerald-950 text-emerald-100 px-2 py-0.5 rounded border border-emerald-700/50 transition-colors whitespace-nowrap cursor-pointer"
            title="Push primary schema & live demo data to Firebase RTDB"
          >
            Push to RTDB
          </button>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-emerald-600/30 shadow-xs shrink-0">
            <img
              src="/src/assets/images/poshan_setu_official_logo_1792660604697.jpg"
              alt="Poshan Setu Official Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                <span className="text-[#EA580C]">{language === 'gu' ? 'પોષણ' : 'Poshan'}</span>
                <span className="text-[#15803D] ml-1">{language === 'gu' ? 'સેતુ' : 'Setu'}</span>
              </h1>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                ANAND DISTRICT
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {t.appSubtitle} · <span className="text-emerald-700 font-semibold">{t.talukaDistrict}</span>
            </p>
          </div>
        </div>

        {/* Global Controls: Centre Select, Date Picker, Language, Supervisor Profile */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Sector / Centre Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <select
              aria-label={t.filterByCentre}
              value={currentCentre}
              onChange={(e) => onSelectCentre(e.target.value as AwcId | 'all')}
              className="bg-transparent font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">{t.allCentres}</option>
              <option value="awc_awvad04">
                {language === 'gu' ? AWC_CENTRES.awc_awvad04.nameGu : AWC_CENTRES.awc_awvad04.name} (Primary)
              </option>
              <option value="awc_awvad02">
                {language === 'gu' ? AWC_CENTRES.awc_awvad02.nameGu : AWC_CENTRES.awc_awvad02.name}
              </option>
              <option value="awc_awvad03">
                {language === 'gu' ? AWC_CENTRES.awc_awvad03.nameGu : AWC_CENTRES.awc_awvad03.name}
              </option>
              <option value="awc_awvad05">
                {language === 'gu' ? AWC_CENTRES.awc_awvad05.nameGu : AWC_CENTRES.awc_awvad05.name}
              </option>
              <option value="awc_10103">
                {language === 'gu' ? AWC_CENTRES.awc_10103.nameGu : AWC_CENTRES.awc_10103.name}
              </option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <input
              aria-label={t.selectDate}
              type="date"
              value={selectedDate}
              onChange={(e) => onSelectDate(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer text-xs font-mono-numbers"
            />
          </div>

          {/* Bilingual Toggle Button */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 transition-colors cursor-pointer"
            title="Switch Language / ભાષા બદલો"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'en' ? 'ગુજરાતી' : 'English'}</span>
          </button>

          {/* Supervisor Card */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              src="/src/assets/images/supervisor_avatar_1792658596640.jpg"
              alt="Supervisor Smt. Shardaben Shah"
              className="w-9 h-9 rounded-full object-cover border border-emerald-600/40 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-none">
                {t.supervisorName}
              </div>
              <div className="text-[10px] text-emerald-800 font-medium mt-0.5">
                {t.supervisorTitle} · Sector 04
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
