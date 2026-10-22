import React, { useState } from 'react';
import { AwcId, MealEntry, MealPhoto, Language } from '../types';
import { translations } from '../services/translations';
import { AWC_CENTRES } from '../data/mockData';
import { 
  UtensilsCrossed, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users, 
  ShieldCheck, 
  Filter, 
  Search,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface MealInspectionViewProps {
  meals: Record<AwcId, MealEntry[]>;
  mealPhotos: Record<AwcId, MealPhoto[]>;
  selectedCentre: AwcId | 'all';
  onOpenPhotoModal: (photo: MealPhoto) => void;
  language: Language;
}

export const MealInspectionView: React.FC<MealInspectionViewProps> = ({
  meals,
  mealPhotos,
  selectedCentre,
  onOpenPhotoModal,
  language
}) => {
  const t = translations[language];
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'pending'>('all');

  const centresToDisplay: AwcId[] = selectedCentre === 'all'
    ? ['awc_awvad04', 'awc_awvad02', 'awc_awvad03', 'awc_awvad05']
    : [selectedCentre];

  // Aggregate all photos
  const allPhotos: { photo: MealPhoto; awcId: AwcId }[] = [];
  centresToDisplay.forEach((id) => {
    (mealPhotos[id] || []).forEach((photo) => {
      allPhotos.push({ photo, awcId: id });
    });
  });

  const filteredPhotos = allPhotos.filter(({ photo }) => {
    if (filterType === 'verified') return photo.verified;
    if (filterType === 'pending') return !photo.verified;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {t.mealsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.mealsSubtitle} · Daily hot lunch and morning snack inspection
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            All Submissions ({allPhotos.length})
          </button>
          <button
            onClick={() => setFilterType('pending')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending Audit ({allPhotos.filter(p => !p.photo.verified).length})
          </button>
          <button
            onClick={() => setFilterType('verified')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'verified' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Verified ({allPhotos.filter(p => p.photo.verified).length})
          </button>
        </div>
      </div>

      {/* Geotagged Meal Inspection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map(({ photo, awcId }) => {
          const centre = AWC_CENTRES[awcId];

          return (
            <div
              key={photo.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Photo with Geotag Overlay */}
                <div
                  onClick={() => onOpenPhotoModal(photo)}
                  className="relative h-48 bg-slate-900 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.menuName}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-slate-800 px-2 py-0.5 rounded shadow-xs">
                      {centre.name.split(' ')[0]}
                    </span>

                    {photo.verified ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded shadow-xs">
                        <Clock className="w-3 h-3" />
                        <span>Pending Stamp</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Geotag Watermark */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 text-white">
                    <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold font-mono-numbers">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {(typeof photo.latitude === 'number' && !isNaN(photo.latitude) ? photo.latitude : 22.58512).toFixed(5)}° N, {(typeof photo.longitude === 'number' && !isNaN(photo.longitude) ? photo.longitude : 72.93245).toFixed(5)}° E
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-200 truncate mt-0.5">
                      {photo.addressText}
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {photo.menuName}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-between">
                      <span>AWW: {photo.awwName}</span>
                      <span className="font-mono-numbers">{photo.capturedAt}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{t.childrenServed}:</span>
                    <span className="font-bold text-slate-900 font-mono-numbers text-sm flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{photo.childrenCountVisible}</span>
                    </span>
                  </div>

                  {photo.inspectionNotes && (
                    <div className="text-[11px] bg-emerald-50 text-emerald-900 p-2 rounded border border-emerald-200">
                      <span className="font-bold block">Supervisor Stamp:</span>
                      <span>{photo.inspectionNotes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => onOpenPhotoModal(photo)}
                  className={`w-full text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    photo.verified
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{photo.verified ? 'Review Verification Details' : t.verifyMealBtn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw Ingredients Cooked Usage Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            Daily Cooked Menu & Commodity Consumption Audit
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-verification of children served against raw rice, dal, and oil deducted from store register
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">AWC Centre</th>
                <th className="py-3 px-3 font-bold">Meal Type</th>
                <th className="py-3 px-3 font-bold">Nutritional Menu</th>
                <th className="py-3 px-3 font-bold text-center">Served / Planned</th>
                <th className="py-3 px-3 font-bold">Commodities Consumed</th>
                <th className="py-3 px-4 font-bold text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {centresToDisplay.map((id) => {
                const centre = AWC_CENTRES[id];
                const list = meals[id] || [];

                return list.map((meal) => (
                  <tr key={meal.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {centre.name.split(' ')[0]}
                      <div className="text-[10px] text-slate-500 font-normal">
                        Time: {meal.servedAt}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">
                        {meal.mealType === 'hot_cooked_lunch' ? 'Hot Cooked Lunch' : 'Morning Snack'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-700 max-w-[220px]">
                      <div className="font-medium">{meal.menuName}</div>
                      <div className="text-[11px] text-slate-500 font-gujarati">{meal.menuNameGu}</div>
                    </td>

                    <td className="py-3 px-3 text-center font-mono-numbers">
                      <span className="font-bold text-slate-900">{meal.actualServedCount}</span>
                      <span className="text-slate-400"> / {meal.plannedCount}</span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="space-y-0.5 font-mono-numbers text-[11px]">
                        {meal.itemsUsed.map((it, idx) => (
                          <span key={idx} className="inline-block bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded mr-1">
                            {it.itemName}: {it.quantityKg}kg
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {meal.supervisorVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Audited</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
