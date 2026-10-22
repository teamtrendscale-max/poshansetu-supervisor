import React, { useState } from 'react';
import { MealPhoto, Language } from '../types';
import { translations } from '../services/translations';
import { X, MapPin, CheckCircle2, Clock, Users, ShieldCheck } from 'lucide-react';

interface ImageModalProps {
  photo: MealPhoto | null;
  onClose: () => void;
  onVerify: (photoId: string, mealEntryId: string, notes: string) => void;
  language: Language;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  photo,
  onClose,
  onVerify,
  language
}) => {
  if (!photo) return null;
  const t = translations[language];

  const [notes, setNotes] = useState(photo.inspectionNotes || 'Inspected meal portion, hygiene & child attendance compliance. Verified.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onVerify(photo.id, photo.mealEntryId, notes);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.viewEnlarged}
            </h3>
            <p className="text-xs text-slate-500">
              {photo.menuName} · {photo.capturedAt}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Image with Geotag Overlay */}
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-950 flex flex-col justify-end min-h-[300px]">
            <img
              src={photo.imageUrl}
              alt={photo.menuName}
              className="w-full h-full object-cover max-h-[360px]"
              referrerPolicy="no-referrer"
            />
            {/* Geotag Watermark Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 text-white text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-mono-numbers">
                  {(typeof photo.latitude === 'number' && !isNaN(photo.latitude) ? photo.latitude : 22.58512).toFixed(5)}° N, {(typeof photo.longitude === 'number' && !isNaN(photo.longitude) ? photo.longitude : 72.93245).toFixed(5)}° E
                </span>
                <span className="text-[10px] text-emerald-300 ml-1">
                  (±{photo.locationAccuracyMeters || 4.2}m)
                </span>
              </div>
              <div className="text-[11px] text-slate-200 line-clamp-1">
                {photo.addressText}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-white/20">
                <span>{photo.capturedAt}</span>
                <span className="font-medium text-emerald-300">
                  AWW: {photo.awwName}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Inspection Audit Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Verification status chip */}
              <div className="flex items-center gap-2">
                {photo.verified ? (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-md text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.verifiedStamp}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-md text-xs font-bold">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{t.pendingVerification}</span>
                  </div>
                )}
              </div>

              {/* Headcount */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>{t.childrenServed}:</span>
                  <span className="font-bold text-slate-900 font-mono-numbers text-sm">
                    {photo.childrenCountVisible} {language === 'gu' ? 'બાળકો' : 'children'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{t.recipeMenu}:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {photo.menuName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{t.awwWorker}:</span>
                  <span className="font-semibold text-slate-900">
                    {photo.awwName}
                  </span>
                </div>
              </div>

              {/* Supervisor Observation form */}
              <form onSubmit={handleVerifySubmit} className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'gu' ? 'સુપરવાઇઝર નિરીક્ષણ નોંધ' : 'Supervisor Inspection Note'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="Enter remarks regarding food hygiene, child count, or temperature..."
                />

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{photo.verified ? t.save : t.verifyMealBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {t.close}
                  </button>
                </div>
              </form>
            </div>

            <div className="text-[11px] text-slate-400">
              {language === 'gu'
                ? 'આ નિરીક્ષણ પોષણ ટ્રેકર અને આણંદ જિલ્લા સર્વર સાથે રીઅલ-ટાઇમ સિંક થાય છે.'
                : 'Stamped inspections are automatically logged on Anand District ICDS & Poshan Tracker server.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
