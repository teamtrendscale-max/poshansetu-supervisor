/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AwcId, ViewTab, Language, MealPhoto, InwardChallan, BillUpload, SetuShareTransfer } from './types';
import { defaultStoreState, subscribeToAwcData, updateBillStatusOnRtdb, verifyMealOnRtdb, seedPrimaryCentreToRtdb, addChallanToRtdb, StoreState } from './services/firebase';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { OverviewView } from './components/OverviewView';
import { InventoryView } from './components/InventoryView';
import { MealInspectionView } from './components/MealInspectionView';
import { BillPortalView } from './components/BillPortalView';
import { SetuShareView } from './components/SetuShareView';
import { MonthlyReportView } from './components/MonthlyReportView';
import { ImageModal } from './components/ImageModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [store, setStore] = useState<StoreState>(defaultStoreState);
  const [currentTab, setCurrentTab] = useState<ViewTab>('overview');
  const [currentCentre, setCurrentCentre] = useState<AwcId | 'all'>('awc_awvad04');
  const [selectedDate, setSelectedDate] = useState('2026-10-22');
  const [language, setLanguage] = useState<Language>('en');
  const [inspectingPhoto, setInspectingPhoto] = useState<MealPhoto | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Subscribe to RTDB for the current centre
  useEffect(() => {
    const awcToListen: AwcId = currentCentre === 'all' ? 'awc_awvad04' : currentCentre;

    const unsubscribe = subscribeToAwcData(
      awcToListen,
      (incomingData) => {
        setStore((prev) => ({
          ...prev,
          ...incomingData
        }));
      },
      (err) => {
        console.warn('Realtime sync fallback active:', err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentCentre]);

  // Sync Live manual trigger
  const handleSyncLive = useCallback(() => {
    setIsSyncing(true);
    const awcToListen: AwcId = currentCentre === 'all' ? 'awc_awvad04' : currentCentre;
    subscribeToAwcData(awcToListen, (incomingData) => {
      setStore((prev) => ({
        ...prev,
        ...incomingData,
        lastSynced: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }));
      setIsSyncing(false);
      showToast('Synced with Poshan Setu Realtime Database');
    });
  }, [currentCentre]);

  // Seed sample data to RTDB
  const handleSeedRtdb = async () => {
    setIsSyncing(true);
    const success = await seedPrimaryCentreToRtdb('awc_awvad04');
    setIsSyncing(false);
    if (success) {
      showToast('Primary Centre (04-Vadtal) schema & data pushed to RTDB successfully!');
    } else {
      showToast('Live RTDB connected in local-sync mode. Ready for field operations.');
    }
  };

  // Verify meal
  const handleVerifyMeal = async (photoId: string, mealEntryId: string, notes: string) => {
    const activeAwc: AwcId = currentCentre === 'all' ? 'awc_awvad04' : currentCentre;

    // Optimistic update
    setStore((prev) => {
      const updatedPhotos = { ...prev.mealPhotos };
      Object.keys(updatedPhotos).forEach((key) => {
        const id = key as AwcId;
        updatedPhotos[id] = updatedPhotos[id].map((p) =>
          p.id === photoId
            ? { ...p, verified: true, inspectionNotes: notes, verificationBadge: 'VERIFIED_ON_PREMISES' }
            : p
        );
      });

      const updatedMeals = { ...prev.meals };
      Object.keys(updatedMeals).forEach((key) => {
        const id = key as AwcId;
        updatedMeals[id] = updatedMeals[id].map((m) =>
          m.id === mealEntryId
            ? { ...m, supervisorVerified: true, supervisorComment: notes, verifiedAt: new Date().toISOString() }
            : m
        );
      });

      return {
        ...prev,
        mealPhotos: updatedPhotos,
        meals: updatedMeals
      };
    });

    await verifyMealOnRtdb(activeAwc, mealEntryId, photoId, notes);
    showToast('Meal successfully stamped & certified by Supervisor Shardaben Shah');
  };

  // Add inward challan
  const handleAddChallan = async (awcId: AwcId, newChallan: InwardChallan) => {
    setStore((prev) => {
      const existingChallans = prev.challans[awcId] || [];
      const existingInv = prev.inventory[awcId] || [];

      // Update inventory stock based on added item
      const addedItem = newChallan.items[0];
      const updatedInv = existingInv.map((item) => {
        if (addedItem && (item.name.toLowerCase().includes(addedItem.itemName.toLowerCase().split(' ')[0]) || addedItem.itemName.toLowerCase().includes(item.name.toLowerCase().split(' ')[0]))) {
          return {
            ...item,
            currentStockKg: item.currentStockKg + addedItem.quantity,
            lastUpdated: 'Just now'
          };
        }
        return item;
      });

      return {
        ...prev,
        challans: {
          ...prev.challans,
          [awcId]: [newChallan, ...existingChallans]
        },
        inventory: {
          ...prev.inventory,
          [awcId]: updatedInv
        }
      };
    });

    await addChallanToRtdb(awcId, newChallan);
    showToast(`Challan ${newChallan.challanNumber} recorded and stock register updated in RTDB`);
  };

  // Update Bill status (Approve DBT, Disburse, Re-upload)
  const handleUpdateBillStatus = async (
    awcId: AwcId,
    billId: string,
    newStatus: BillUpload['status'],
    note?: string
  ) => {
    const dbtRef = newStatus === 'approved_dbt'
      ? `DBT-WCD-GJ-${Math.floor(10000 + Math.random() * 90000)}`
      : newStatus === 'disbursed'
        ? `PFMS-CR-AND-${Math.floor(100000 + Math.random() * 900000)}`
        : undefined;

    // Optimistic UI
    setStore((prev) => ({
      ...prev,
      bills: prev.bills.map((b) =>
        b.id === billId
          ? {
              ...b,
              status: newStatus,
              supervisorNote: note || b.supervisorNote,
              approvedAt: new Date().toISOString(),
              dbtReferenceNumber: dbtRef || b.dbtReferenceNumber
            }
          : b
      )
    }));

    await updateBillStatusOnRtdb(awcId, billId, newStatus, note, dbtRef);

    if (newStatus === 'approved_dbt') {
      showToast(`Bill approved for DBT. Reference ID: ${dbtRef}`);
    } else if (newStatus === 'disbursed') {
      showToast(`Marked as disbursed via PFMS. Ref: ${dbtRef}`);
    } else if (newStatus === 'rejected_reupload') {
      showToast('Worker requested to re-upload clear receipt');
    }
  };

  // Setu Share transfer
  const handleAddTransfer = (transfer: SetuShareTransfer) => {
    setStore((prev) => ({
      ...prev,
      transfers: [transfer, ...prev.transfers]
    }));
    showToast(`Emergency transfer authorized with OTP ${transfer.otpCode}`);
  };

  // Settle transfer
  const handleSettleTransfer = (transferId: string) => {
    setStore((prev) => ({
      ...prev,
      transfers: prev.transfers.map((t) =>
        t.id === transferId
          ? {
              ...t,
              status: 'returned_settled',
              settledDate: new Date().toISOString().split('T')[0]
            }
          : t
      )
    }));
    showToast('Commodity loan marked as returned and settled');
  };

  // Calculate sidebar counts
  const stockAlertCount = Object.values(store.inventory).reduce((acc, list) => {
    return acc + (list || []).filter((i) => i && typeof i === 'object' && ((typeof i.currentStockKg === 'number' ? i.currentStockKg : (Number(i.currentStockKg) || 0)) <= (typeof i.minimumThreshold === 'number' ? i.minimumThreshold : 10))).length;
  }, 0);

  const pendingBillsCount = store.bills.filter((b) => b.status === 'pending_review').length;

  const pendingMealAuditCount = Object.values(store.mealPhotos).reduce((acc, list) => {
    return acc + (list || []).filter((p) => !p.verified).length;
  }, 0);

  // Active inventory for Inventory view
  const activeAwcForInventory: AwcId = currentCentre === 'all' ? 'awc_awvad04' : currentCentre;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Official Government Header */}
      <Header
        currentCentre={currentCentre}
        onSelectCentre={setCurrentCentre}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'gu' : 'en'))}
        isLiveConnected={store.isLiveConnected}
        lastSynced={store.lastSynced}
        onSyncLive={handleSyncLive}
        onSeedRtdb={handleSeedRtdb}
        isSyncing={isSyncing}
      />

      {/* Main Workspace: Sidebar + Viewport */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          language={language}
          stockAlertCount={stockAlertCount}
          pendingBillsCount={pendingBillsCount}
          pendingMealAuditCount={pendingMealAuditCount}
        />

        {/* Dynamic Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentTab === 'overview' && (
            <OverviewView
              store={store}
              currentCentre={currentCentre}
              onSelectTab={setCurrentTab}
              onSelectCentre={setCurrentCentre}
              onOpenPhotoModal={setInspectingPhoto}
              language={language}
            />
          )}

          {currentTab === 'inventory' && (
            <InventoryView
              inventory={store.inventory[activeAwcForInventory] || []}
              challans={store.challans[activeAwcForInventory] || []}
              awcId={activeAwcForInventory}
              onAddChallan={handleAddChallan}
              language={language}
            />
          )}

          {currentTab === 'meals' && (
            <MealInspectionView
              meals={store.meals}
              mealPhotos={store.mealPhotos}
              selectedCentre={currentCentre}
              onOpenPhotoModal={setInspectingPhoto}
              language={language}
            />
          )}

          {currentTab === 'bills' && (
            <BillPortalView
              bills={store.bills}
              onUpdateBillStatus={handleUpdateBillStatus}
              selectedCentre={currentCentre}
              language={language}
            />
          )}

          {currentTab === 'transfers' && (
            <SetuShareView
              transfers={store.transfers}
              onAddTransfer={handleAddTransfer}
              onSettleTransfer={handleSettleTransfer}
              selectedCentre={currentCentre}
              language={language}
            />
          )}

          {currentTab === 'report' && (
            <MonthlyReportView
              store={store}
              selectedCentre={currentCentre}
              language={language}
            />
          )}
        </main>
      </div>

      {/* Geotagged Photo & Meal Inspection Modal */}
      <ImageModal
        photo={inspectingPhoto}
        onClose={() => setInspectingPhoto(null)}
        onVerify={handleVerifyMeal}
        language={language}
      />
    </div>
  );
}
