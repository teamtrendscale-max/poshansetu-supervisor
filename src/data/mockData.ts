import { AwcInfo, InventoryItem, InwardChallan, MealEntry, MealPhoto, ThrDistribution, SetuShareTransfer, BillUpload, ChildAttendance, AwcId } from '../types';

export const AWC_CENTRES: Record<AwcId, AwcInfo> = {
  awc_awvad04: {
    id: 'awc_awvad04',
    code: 'GJ-AND-VAD-04',
    name: '04-Vadtal Anganwadi Centre',
    nameGu: '૦૪-વડતાલ આંગણવાડી કેન્દ્ર',
    village: 'Vadtal',
    villageGu: 'વડતાલ',
    taluka: 'Anand Rural',
    district: 'Anand',
    workerName: 'Smt. BhavnaBen Patel',
    workerPhone: '+91 98254 12044',
    helperName: 'Smt. Geetaben Rathod',
    enrolledChildren: 48,
    pregnantLactatingMothers: 14,
    adolescentGirls: 22,
    coordinates: {
      lat: 22.5851,
      lng: 72.9324
    }
  },
  awc_awvad02: {
    id: 'awc_awvad02',
    code: 'GJ-AND-MOG-02',
    name: '02-Mogri Anganwadi Centre',
    nameGu: '૦૨-મોગરી આંગણવાડી કેન્દ્ર',
    village: 'Mogri',
    villageGu: 'મોગરી',
    taluka: 'Anand Rural',
    district: 'Anand',
    workerName: 'Smt. Kokilaben Vankar',
    workerPhone: '+91 97140 88210',
    helperName: 'Smt. Sarojben Rohit',
    enrolledChildren: 42,
    pregnantLactatingMothers: 11,
    adolescentGirls: 18,
    coordinates: {
      lat: 22.5482,
      lng: 72.9157
    }
  },
  awc_awvad03: {
    id: 'awc_awvad03',
    code: 'GJ-AND-KRM-03',
    name: '03-Karamsad Anganwadi Centre',
    nameGu: '૦૩-કરમસદ આંગણવાડી કેન્દ્ર',
    village: 'Karamsad',
    villageGu: 'કરમસદ',
    taluka: 'Anand Rural',
    district: 'Anand',
    workerName: 'Smt. Hansaben Solanki',
    workerPhone: '+91 94285 33491',
    helperName: 'Smt. Minaben Parmar',
    enrolledChildren: 52,
    pregnantLactatingMothers: 16,
    adolescentGirls: 25,
    coordinates: {
      lat: 22.5516,
      lng: 72.8981
    }
  },
  awc_awvad05: {
    id: 'awc_awvad05',
    code: 'GJ-AND-SMK-05',
    name: '05-Samarkha Anganwadi Centre',
    nameGu: '૦૫-સામરખા આંગણવાડી કેન્દ્ર',
    village: 'Samarkha',
    villageGu: 'સામરખા',
    taluka: 'Anand Rural',
    district: 'Anand',
    workerName: 'Smt. Daxaben Parmar',
    workerPhone: '+91 99042 77150',
    helperName: 'Smt. Ramilaben Vaghela',
    enrolledChildren: 40,
    pregnantLactatingMothers: 12,
    adolescentGirls: 19,
    coordinates: {
      lat: 22.6025,
      lng: 72.9734
    }
  },
  awc_10103: {
    id: 'awc_10103',
    code: 'AWC-10103',
    name: '10103-Kalyan Anganwadi Centre',
    nameGu: '૧૦૧૦૩-કલ્યાણ આંગણવાડી કેન્દ્ર',
    village: 'Kalyan',
    villageGu: 'કલ્યાણ',
    taluka: 'Anand Rural',
    district: 'Anand',
    workerName: 'Anita Sharma',
    workerPhone: '+91 98251 44021',
    helperName: 'Kamlaben Vaghela',
    enrolledChildren: 45,
    pregnantLactatingMothers: 13,
    adolescentGirls: 20,
    coordinates: {
      lat: 22.5601,
      lng: 72.9288
    }
  }
};

export const INITIAL_INVENTORY: Record<AwcId, InventoryItem[]> = {
  awc_awvad04: [
    {
      id: 'inv_1',
      name: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      category: 'grain',
      currentStockKg: 28.5,
      unit: 'kg',
      minimumThreshold: 15.0,
      dailyConsumption: 3.5,
      lastUpdated: 'Today, 08:30 AM',
      batchNumber: 'GSCSC-RICE-24-B12',
      expiryDate: '2027-04-30'
    },
    {
      id: 'inv_2',
      name: 'Wheat Atta (Wheat Flour)',
      nameGu: 'ઘઉંનો લોટ',
      category: 'grain',
      currentStockKg: 18.0,
      unit: 'kg',
      minimumThreshold: 12.0,
      dailyConsumption: 2.5,
      lastUpdated: 'Today, 08:30 AM',
      batchNumber: 'GSCSC-ATTA-24-A08',
      expiryDate: '2027-03-15'
    },
    {
      id: 'inv_3',
      name: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ તેલ',
      category: 'oil',
      currentStockKg: 9.0,
      unit: 'liter',
      minimumThreshold: 5.0,
      dailyConsumption: 0.8,
      lastUpdated: 'Today, 08:30 AM',
      batchNumber: 'OIL-GUJ-24-99',
      expiryDate: '2027-08-20'
    },
    {
      id: 'inv_4',
      name: 'Tuver Dal (Split Pigeon Pea)',
      nameGu: 'તુવેર દાળ',
      category: 'pulse',
      currentStockKg: 12.0,
      unit: 'kg',
      minimumThreshold: 8.0,
      dailyConsumption: 1.8,
      lastUpdated: 'Today, 08:30 AM',
      batchNumber: 'DAL-TUVER-24-41',
      expiryDate: '2027-06-10'
    },
    {
      id: 'inv_5',
      name: 'Bal Shakti THR (6m - 3y)',
      nameGu: 'બાલ શક્તિ (૬ માસ થી ૩ વર્ષ)',
      category: 'thr',
      currentStockKg: 42,
      unit: 'packets',
      minimumThreshold: 20,
      dailyConsumption: 4,
      lastUpdated: 'Yesterday, 04:00 PM',
      batchNumber: 'AMUL-BS-OCT26-09',
      expiryDate: '2027-02-28'
    },
    {
      id: 'inv_6',
      name: 'Matru Shakti THR (Pregnant/Lactating)',
      nameGu: 'માતૃ શક્તિ (સગર્ભા/ધાત્રી માતાઓ)',
      category: 'thr',
      currentStockKg: 16,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:00 PM',
      batchNumber: 'AMUL-MS-OCT26-04',
      expiryDate: '2027-02-28'
    },
    {
      id: 'inv_7',
      name: 'Purna Shakti THR (Adolescent Girls)',
      nameGu: 'પૂર્ણા શક્તિ (કિશોરીઓ)',
      category: 'thr',
      currentStockKg: 6, // Low stock alert triggered!
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:00 PM',
      batchNumber: 'AMUL-PS-OCT26-02',
      expiryDate: '2027-01-31'
    }
  ],
  awc_awvad02: [
    {
      id: 'inv_101',
      name: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      category: 'grain',
      currentStockKg: 12.0, // Low stock
      unit: 'kg',
      minimumThreshold: 15.0,
      dailyConsumption: 3.2,
      lastUpdated: 'Today, 08:45 AM',
      batchNumber: 'GSCSC-RICE-24-B10',
      expiryDate: '2027-04-15'
    },
    {
      id: 'inv_102',
      name: 'Wheat Atta',
      nameGu: 'ઘઉંનો લોટ',
      category: 'grain',
      currentStockKg: 22.0,
      unit: 'kg',
      minimumThreshold: 12.0,
      dailyConsumption: 2.2,
      lastUpdated: 'Today, 08:45 AM',
      batchNumber: 'GSCSC-ATTA-24-A07',
      expiryDate: '2027-03-10'
    },
    {
      id: 'inv_103',
      name: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ તેલ',
      category: 'oil',
      currentStockKg: 7.5,
      unit: 'liter',
      minimumThreshold: 5.0,
      dailyConsumption: 0.7,
      lastUpdated: 'Today, 08:45 AM',
      batchNumber: 'OIL-GUJ-24-95',
      expiryDate: '2027-08-15'
    },
    {
      id: 'inv_104',
      name: 'Tuver Dal',
      nameGu: 'તુવેર દાળ',
      category: 'pulse',
      currentStockKg: 9.5,
      unit: 'kg',
      minimumThreshold: 8.0,
      dailyConsumption: 1.5,
      lastUpdated: 'Today, 08:45 AM',
      batchNumber: 'DAL-TUVER-24-39',
      expiryDate: '2027-06-01'
    },
    {
      id: 'inv_105',
      name: 'Bal Shakti THR',
      nameGu: 'બાલ શક્તિ',
      category: 'thr',
      currentStockKg: 35,
      unit: 'packets',
      minimumThreshold: 20,
      dailyConsumption: 3,
      lastUpdated: 'Yesterday, 03:30 PM',
      batchNumber: 'AMUL-BS-OCT26-07',
      expiryDate: '2027-02-28'
    },
    {
      id: 'inv_106',
      name: 'Matru Shakti THR',
      nameGu: 'માતૃ શક્તિ',
      category: 'thr',
      currentStockKg: 14,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 03:30 PM',
      batchNumber: 'AMUL-MS-OCT26-03',
      expiryDate: '2027-02-28'
    },
    {
      id: 'inv_107',
      name: 'Purna Shakti THR',
      nameGu: 'પૂર્ણા શક્તિ',
      category: 'thr',
      currentStockKg: 15,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 03:30 PM',
      batchNumber: 'AMUL-PS-OCT26-01',
      expiryDate: '2027-01-31'
    }
  ],
  awc_awvad03: [
    {
      id: 'inv_201',
      name: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      category: 'grain',
      currentStockKg: 34.0,
      unit: 'kg',
      minimumThreshold: 15.0,
      dailyConsumption: 3.8,
      lastUpdated: 'Today, 08:20 AM',
      batchNumber: 'GSCSC-RICE-24-B15',
      expiryDate: '2027-05-10'
    },
    {
      id: 'inv_202',
      name: 'Wheat Atta',
      nameGu: 'ઘઉંનો લોટ',
      category: 'grain',
      currentStockKg: 25.0,
      unit: 'kg',
      minimumThreshold: 12.0,
      dailyConsumption: 2.8,
      lastUpdated: 'Today, 08:20 AM',
      batchNumber: 'GSCSC-ATTA-24-A10',
      expiryDate: '2027-04-05'
    },
    {
      id: 'inv_203',
      name: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ તેલ',
      category: 'oil',
      currentStockKg: 11.0,
      unit: 'liter',
      minimumThreshold: 5.0,
      dailyConsumption: 0.9,
      lastUpdated: 'Today, 08:20 AM',
      batchNumber: 'OIL-GUJ-24-99',
      expiryDate: '2027-08-20'
    },
    {
      id: 'inv_204',
      name: 'Tuver Dal',
      nameGu: 'તુવેર દાળ',
      category: 'pulse',
      currentStockKg: 14.5,
      unit: 'kg',
      minimumThreshold: 8.0,
      dailyConsumption: 2.0,
      lastUpdated: 'Today, 08:20 AM',
      batchNumber: 'DAL-TUVER-24-42',
      expiryDate: '2027-06-15'
    },
    {
      id: 'inv_205',
      name: 'Bal Shakti THR',
      nameGu: 'બાલ શક્તિ',
      category: 'thr',
      currentStockKg: 50,
      unit: 'packets',
      minimumThreshold: 20,
      dailyConsumption: 4,
      lastUpdated: 'Yesterday, 04:15 PM',
      batchNumber: 'AMUL-BS-OCT26-11',
      expiryDate: '2027-03-15'
    },
    {
      id: 'inv_206',
      name: 'Matru Shakti THR',
      nameGu: 'માતૃ શક્તિ',
      category: 'thr',
      currentStockKg: 22,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:15 PM',
      batchNumber: 'AMUL-MS-OCT26-05',
      expiryDate: '2027-03-15'
    },
    {
      id: 'inv_207',
      name: 'Purna Shakti THR',
      nameGu: 'પૂર્ણા શક્તિ',
      category: 'thr',
      currentStockKg: 18,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:15 PM',
      batchNumber: 'AMUL-PS-OCT26-04',
      expiryDate: '2027-02-15'
    }
  ],
  awc_awvad05: [
    {
      id: 'inv_301',
      name: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      category: 'grain',
      currentStockKg: 22.0,
      unit: 'kg',
      minimumThreshold: 15.0,
      dailyConsumption: 3.0,
      lastUpdated: 'Today, 08:15 AM',
      batchNumber: 'GSCSC-RICE-24-B11',
      expiryDate: '2027-04-20'
    },
    {
      id: 'inv_302',
      name: 'Wheat Atta',
      nameGu: 'ઘઉંનો લોટ',
      category: 'grain',
      currentStockKg: 15.0,
      unit: 'kg',
      minimumThreshold: 12.0,
      dailyConsumption: 2.0,
      lastUpdated: 'Today, 08:15 AM',
      batchNumber: 'GSCSC-ATTA-24-A06',
      expiryDate: '2027-03-01'
    },
    {
      id: 'inv_303',
      name: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ તેલ',
      category: 'oil',
      currentStockKg: 6.0,
      unit: 'liter',
      minimumThreshold: 5.0,
      dailyConsumption: 0.7,
      lastUpdated: 'Today, 08:15 AM',
      batchNumber: 'OIL-GUJ-24-91',
      expiryDate: '2027-07-25'
    },
    {
      id: 'inv_304',
      name: 'Tuver Dal',
      nameGu: 'તુવેર દાળ',
      category: 'pulse',
      currentStockKg: 7.0, // Low stock alert
      unit: 'kg',
      minimumThreshold: 8.0,
      dailyConsumption: 1.6,
      lastUpdated: 'Today, 08:15 AM',
      batchNumber: 'DAL-TUVER-24-38',
      expiryDate: '2027-05-25'
    },
    {
      id: 'inv_305',
      name: 'Bal Shakti THR',
      nameGu: 'બાલ શક્તિ',
      category: 'thr',
      currentStockKg: 28,
      unit: 'packets',
      minimumThreshold: 20,
      dailyConsumption: 3,
      lastUpdated: 'Yesterday, 04:30 PM',
      batchNumber: 'AMUL-BS-OCT26-06',
      expiryDate: '2027-02-15'
    },
    {
      id: 'inv_306',
      name: 'Matru Shakti THR',
      nameGu: 'માતૃ શક્તિ',
      category: 'thr',
      currentStockKg: 12,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:30 PM',
      batchNumber: 'AMUL-MS-OCT26-02',
      expiryDate: '2027-02-15'
    },
    {
      id: 'inv_307',
      name: 'Purna Shakti THR',
      nameGu: 'પૂર્ણા શક્તિ',
      category: 'thr',
      currentStockKg: 10,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Yesterday, 04:30 PM',
      batchNumber: 'AMUL-PS-OCT26-01',
      expiryDate: '2027-01-31'
    }
  ],
  awc_10103: [
    {
      id: 'inv_401',
      name: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      category: 'grain',
      currentStockKg: 30.0,
      unit: 'kg',
      minimumThreshold: 15.0,
      dailyConsumption: 3.5,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'GSCSC-RICE-24-K01',
      expiryDate: '2027-06-30'
    },
    {
      id: 'inv_402',
      name: 'Wheat Atta',
      nameGu: 'ઘઉંનો લોટ',
      category: 'grain',
      currentStockKg: 25.0,
      unit: 'kg',
      minimumThreshold: 12.0,
      dailyConsumption: 2.5,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'GSCSC-ATTA-24-K02',
      expiryDate: '2027-05-15'
    },
    {
      id: 'inv_403',
      name: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ તેલ',
      category: 'oil',
      currentStockKg: 10.0,
      unit: 'liter',
      minimumThreshold: 5.0,
      dailyConsumption: 0.8,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'OIL-GUJ-24-K03',
      expiryDate: '2027-09-01'
    },
    {
      id: 'inv_404',
      name: 'Tuver Dal',
      nameGu: 'તુવેર દાળ',
      category: 'pulse',
      currentStockKg: 15.0,
      unit: 'kg',
      minimumThreshold: 8.0,
      dailyConsumption: 1.8,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'DAL-TUVER-24-K04',
      expiryDate: '2027-07-20'
    },
    {
      id: 'inv_405',
      name: 'Bal Shakti THR',
      nameGu: 'બાલ શક્તિ',
      category: 'thr',
      currentStockKg: 40,
      unit: 'packets',
      minimumThreshold: 20,
      dailyConsumption: 4,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'AMUL-BS-OCT26-K05',
      expiryDate: '2027-03-31'
    },
    {
      id: 'inv_406',
      name: 'Matru Shakti THR',
      nameGu: 'માતૃ શક્તિ',
      category: 'thr',
      currentStockKg: 18,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'AMUL-MS-OCT26-K06',
      expiryDate: '2027-03-31'
    },
    {
      id: 'inv_407',
      name: 'Purna Shakti THR',
      nameGu: 'પૂર્ણા શક્તિ',
      category: 'thr',
      currentStockKg: 12,
      unit: 'packets',
      minimumThreshold: 10,
      dailyConsumption: 2,
      lastUpdated: 'Today, 09:00 AM',
      batchNumber: 'AMUL-PS-OCT26-K07',
      expiryDate: '2027-02-28'
    }
  ]
};

export const INITIAL_INWARD_CHALLANS: Record<AwcId, InwardChallan[]> = {
  awc_awvad04: [
    {
      id: 'chl_001',
      challanNumber: 'GSCSC-AND-2026-8812',
      sourceSupplier: 'Gujarat State Civil Supplies Corporation Godown, Anand',
      date: '2026-10-18',
      receivedBy: 'Smt. BhavnaBen Patel (AWW)',
      vehicleNumber: 'GJ-23-AX-4819',
      verifiedBySupervisor: true,
      items: [
        {
          itemName: 'Fortified Rice (Grade A)',
          quantity: 50.0,
          unit: 'kg',
          batchNumber: 'GSCSC-RICE-24-B12',
          mfgDate: '2026-09-01',
          expiryDate: '2027-04-30'
        },
        {
          itemName: 'Tuver Dal',
          quantity: 25.0,
          unit: 'kg',
          batchNumber: 'DAL-TUVER-24-41',
          mfgDate: '2026-09-10',
          expiryDate: '2027-06-10'
        },
        {
          itemName: 'Fortified Palmolein Oil',
          quantity: 15.0,
          unit: 'liter',
          batchNumber: 'OIL-GUJ-24-99',
          mfgDate: '2026-09-15',
          expiryDate: '2027-08-20'
        }
      ]
    },
    {
      id: 'chl_002',
      challanNumber: 'AMUL-THR-AND-4402',
      sourceSupplier: 'Amul Fed Dairy Nutritional Plant, Mogar (THR Supply)',
      date: '2026-10-10',
      receivedBy: 'Smt. BhavnaBen Patel (AWW)',
      vehicleNumber: 'GJ-23-Y-1084',
      verifiedBySupervisor: true,
      items: [
        {
          itemName: 'Bal Shakti Packets (500g)',
          quantity: 60,
          unit: 'packets',
          batchNumber: 'AMUL-BS-OCT26-09',
          mfgDate: '2026-10-01',
          expiryDate: '2027-02-28'
        },
        {
          itemName: 'Matru Shakti Packets (1kg)',
          quantity: 25,
          unit: 'packets',
          batchNumber: 'AMUL-MS-OCT26-04',
          mfgDate: '2026-10-01',
          expiryDate: '2027-02-28'
        },
        {
          itemName: 'Purna Shakti Packets (1kg)',
          quantity: 20,
          unit: 'packets',
          batchNumber: 'AMUL-PS-OCT26-02',
          mfgDate: '2026-09-20',
          expiryDate: '2027-01-31'
        }
      ]
    }
  ],
  awc_awvad02: [
    {
      id: 'chl_101',
      challanNumber: 'GSCSC-AND-2026-8790',
      sourceSupplier: 'GSCSC Taluka Godown Anand',
      date: '2026-10-15',
      receivedBy: 'Smt. Kokilaben Vankar',
      verifiedBySupervisor: true,
      items: [
        {
          itemName: 'Wheat Atta',
          quantity: 40.0,
          unit: 'kg',
          batchNumber: 'GSCSC-ATTA-24-A07',
          mfgDate: '2026-09-01',
          expiryDate: '2027-03-10'
        }
      ]
    }
  ],
  awc_awvad03: [
    {
      id: 'chl_201',
      challanNumber: 'GSCSC-AND-2026-8805',
      sourceSupplier: 'GSCSC Taluka Godown Anand',
      date: '2026-10-16',
      receivedBy: 'Smt. Hansaben Solanki',
      verifiedBySupervisor: true,
      items: [
        {
          itemName: 'Fortified Rice',
          quantity: 50.0,
          unit: 'kg',
          batchNumber: 'GSCSC-RICE-24-B15',
          mfgDate: '2026-09-05',
          expiryDate: '2027-05-10'
        }
      ]
    }
  ],
  awc_awvad05: [
    {
      id: 'chl_301',
      challanNumber: 'GSCSC-AND-2026-8810',
      sourceSupplier: 'GSCSC Taluka Godown Anand',
      date: '2026-10-17',
      receivedBy: 'Smt. Daxaben Parmar',
      verifiedBySupervisor: false,
      items: [
        {
          itemName: 'Fortified Rice',
          quantity: 35.0,
          unit: 'kg',
          batchNumber: 'GSCSC-RICE-24-B11',
          mfgDate: '2026-09-02',
          expiryDate: '2027-04-20'
        }
      ]
    }
  ],
  awc_10103: [
    {
      id: 'chl_401',
      challanNumber: 'INW-2026-1044',
      sourceSupplier: 'District Food & Civil Supplies Godown, Anand',
      date: '2026-10-21',
      receivedBy: 'Anita Sharma (AWW)',
      verifiedBySupervisor: true,
      items: [
        {
          itemName: 'Fortified Rice',
          quantity: 25.0,
          unit: 'kg',
          batchNumber: 'RIC-VAD-26-04',
          mfgDate: '2026-09-01',
          expiryDate: '2027-12-31'
        },
        {
          itemName: 'Whole Wheat Atta',
          quantity: 20.0,
          unit: 'kg',
          batchNumber: 'ATT-VAD-26-11',
          mfgDate: '2026-09-01',
          expiryDate: '2027-04-30'
        },
        {
          itemName: 'Fortified Edible Oil',
          quantity: 10.0,
          unit: 'liter',
          batchNumber: 'OIL-VAD-26-09',
          mfgDate: '2026-09-01',
          expiryDate: '2027-08-31'
        },
        {
          itemName: 'Bal Shakti Premix',
          quantity: 15,
          unit: 'packets',
          batchNumber: 'BAL-VAD-26-22',
          mfgDate: '2026-09-01',
          expiryDate: '2027-06-30'
        }
      ]
    }
  ]
};

export const INITIAL_MEAL_ENTRIES: Record<AwcId, MealEntry[]> = {
  awc_awvad04: [
    {
      id: 'meal_vadtal_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Paushtik Vegetable Khichdi & Tuver Dal with Spinach',
      menuNameGu: 'પૌષ્ટિક શાકભાજી વાળી ખીચડી અને પાલક તુવેર દાળ',
      plannedCount: 42,
      actualServedCount: 39,
      itemsUsed: [
        { itemName: 'Fortified Rice', quantityKg: 3.2 },
        { itemName: 'Tuver Dal', quantityKg: 1.6 },
        { itemName: 'Fortified Oil', quantityKg: 0.6 }
      ],
      servedAt: '12:15 PM',
      supervisorVerified: true,
      supervisorComment: 'Inspected meal quality, hot temperature & good hygiene maintained by Bhavnaben.',
      verifiedAt: '2026-10-22T12:45:00'
    },
    {
      id: 'meal_vadtal_today_snack',
      date: '2026-10-22',
      mealType: 'morning_snack',
      menuName: 'Fortified Wheat Halwa (Sheera) with Crushed Nuts',
      menuNameGu: 'ફોર્ટિફાઇડ ઘઉંનો શીરો (હલવો) બદામ સાથે',
      plannedCount: 40,
      actualServedCount: 38,
      itemsUsed: [
        { itemName: 'Wheat Atta', quantityKg: 2.2 },
        { itemName: 'Fortified Oil', quantityKg: 0.5 }
      ],
      servedAt: '09:30 AM',
      supervisorVerified: true,
      supervisorComment: 'Children actively participated; served warm on time.',
      verifiedAt: '2026-10-22T10:15:00'
    }
  ],
  awc_awvad02: [
    {
      id: 'meal_mogri_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Vegetable Pulao & Methi Kadhi',
      menuNameGu: 'વેજીટેબલ પુલાવ અને મેથી કઢી',
      plannedCount: 36,
      actualServedCount: 34,
      itemsUsed: [
        { itemName: 'Fortified Rice', quantityKg: 2.8 },
        { itemName: 'Fortified Oil', quantityKg: 0.5 }
      ],
      servedAt: '12:30 PM',
      supervisorVerified: false
    }
  ],
  awc_awvad03: [
    {
      id: 'meal_krm_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Nutritious Khichdi & Moong Soup',
      menuNameGu: 'પૌષ્ટિક ખીચડી અને મગ સૂપ',
      plannedCount: 45,
      actualServedCount: 43,
      itemsUsed: [
        { itemName: 'Fortified Rice', quantityKg: 3.5 },
        { itemName: 'Tuver Dal', quantityKg: 1.8 }
      ],
      servedAt: '12:20 PM',
      supervisorVerified: true,
      supervisorComment: 'Approved via remote geotag.',
      verifiedAt: '2026-10-22T12:50:00'
    }
  ],
  awc_awvad05: [
    {
      id: 'meal_smk_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Dal Dhokli with Green Vegetables',
      menuNameGu: 'દાળ ઢોકળી શાકભાજી સાથે',
      plannedCount: 35,
      actualServedCount: 32,
      itemsUsed: [
        { itemName: 'Wheat Atta', quantityKg: 2.0 },
        { itemName: 'Tuver Dal', quantityKg: 1.5 }
      ],
      servedAt: '12:10 PM',
      supervisorVerified: false
    }
  ],
  awc_10103: [
    {
      id: 'meal_kalyan_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Nutritious Dal-Rice & Fresh Green Vegetables',
      menuNameGu: 'પૌષ્ટિક દાળ-ભાત અને લીલા શાકભાજી',
      plannedCount: 40,
      actualServedCount: 38,
      itemsUsed: [
        { itemName: 'Fortified Rice', quantityKg: 3.0 },
        { itemName: 'Tuver Dal', quantityKg: 1.5 }
      ],
      servedAt: '12:20 PM',
      supervisorVerified: true,
      supervisorComment: 'Verified as per Poshan guidelines',
      verifiedAt: '2026-10-22T12:45:00'
    }
  ]
};

export const INITIAL_MEAL_PHOTOS: Record<AwcId, MealPhoto[]> = {
  awc_awvad04: [
    {
      id: 'photo_vad_01',
      mealEntryId: 'meal_vadtal_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Paushtik Vegetable Khichdi & Tuver Dal',
      imageUrl: '/src/assets/images/meal_hot_khichdi_1792658595128.jpg',
      capturedAt: 'Today, 12:18 PM',
      awwName: 'Smt. BhavnaBen Patel',
      latitude: 22.58512,
      longitude: 72.93245,
      locationAccuracyMeters: 4.2,
      addressText: 'AWC 04, Swaminarayan Temple Road, Vadtal, Anand Dist.',
      childrenCountVisible: 39,
      verified: true,
      verificationBadge: 'VERIFIED_ON_PREMISES',
      inspectionNotes: 'Food temperature steaming hot, hygiene verified, matches attendance mark.'
    },
    {
      id: 'photo_vad_02',
      mealEntryId: 'meal_vadtal_today_snack',
      date: '2026-10-22',
      mealType: 'morning_snack',
      menuName: 'Wheat Halwa / Fortified Sheera with Dry Fruits',
      imageUrl: '/src/assets/images/meal_hot_sheera_1792658627996.jpg',
      capturedAt: 'Today, 09:34 AM',
      awwName: 'Smt. BhavnaBen Patel',
      latitude: 22.58509,
      longitude: 72.93241,
      locationAccuracyMeters: 3.8,
      addressText: 'AWC 04, Swaminarayan Temple Road, Vadtal, Anand Dist.',
      childrenCountVisible: 38,
      verified: true,
      verificationBadge: 'VERIFIED_ON_PREMISES',
      inspectionNotes: 'Morning snack served within designated schedule window.'
    }
  ],
  awc_awvad02: [
    {
      id: 'photo_mog_01',
      mealEntryId: 'meal_mogri_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Vegetable Pulao & Kadhi',
      imageUrl: '/src/assets/images/meal_hot_khichdi_1792658595128.jpg',
      capturedAt: 'Today, 12:35 PM',
      awwName: 'Smt. Kokilaben Vankar',
      latitude: 22.54825,
      longitude: 72.91572,
      locationAccuracyMeters: 5.1,
      addressText: 'AWC 02, Bus Stand Faliya, Mogri, Anand Dist.',
      childrenCountVisible: 34,
      verified: false
    }
  ],
  awc_awvad03: [
    {
      id: 'photo_krm_01',
      mealEntryId: 'meal_krm_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Nutritious Khichdi & Moong Soup',
      imageUrl: '/src/assets/images/meal_hot_khichdi_1792658595128.jpg',
      capturedAt: 'Today, 12:22 PM',
      awwName: 'Smt. Hansaben Solanki',
      latitude: 22.55164,
      longitude: 72.89815,
      locationAccuracyMeters: 4.6,
      addressText: 'AWC 03, Sardar Patel Memorial Ward, Karamsad, Anand Dist.',
      childrenCountVisible: 43,
      verified: true,
      verificationBadge: 'VERIFIED_ON_PREMISES',
      inspectionNotes: 'Compliant with prescribed ICDS portion standards.'
    }
  ],
  awc_awvad05: [
    {
      id: 'photo_smk_01',
      mealEntryId: 'meal_smk_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Dal Dhokli with Green Vegetables',
      imageUrl: '/src/assets/images/meal_hot_khichdi_1792658595128.jpg',
      capturedAt: 'Today, 12:12 PM',
      awwName: 'Smt. Daxaben Parmar',
      latitude: 22.60252,
      longitude: 72.97341,
      locationAccuracyMeters: 6.0,
      addressText: 'AWC 05, Primary School Compound, Samarkha, Anand Dist.',
      childrenCountVisible: 32,
      verified: false
    }
  ],
  awc_10103: [
    {
      id: 'photo_kalyan_01',
      mealEntryId: 'meal_kalyan_today_lunch',
      date: '2026-10-22',
      mealType: 'hot_cooked_lunch',
      menuName: 'Nutritious Dal-Rice & Fresh Green Vegetables',
      imageUrl: '/src/assets/images/meal_hot_khichdi_1792658595128.jpg',
      capturedAt: 'Today, 12:25 PM',
      awwName: 'Anita Sharma',
      latitude: 22.56012,
      longitude: 72.92881,
      locationAccuracyMeters: 4.5,
      addressText: 'AWC 10103, Kalyan Community Hall, Anand Dist.',
      childrenCountVisible: 38,
      verified: true,
      verificationBadge: 'VERIFIED_ON_PREMISES',
      inspectionNotes: 'Food hot & hygienic, matching attendance mark.'
    }
  ]
};

export const INITIAL_BILLS: BillUpload[] = [
  {
    id: 'bill_vad_01',
    invoiceNumber: 'INV-SRV-2026-487',
    vendorName: 'Shri Ram Vegetable Mart, Subzi Mandi',
    vendorCategory: 'Vegetables',
    billDate: '2026-10-21',
    uploadedAt: 'Yesterday, 02:45 PM',
    amount: 295.0,
    workerRemark: 'Purchased fresh spinach, tomatoes, potatoes, onions and green chillies for weekly hot meals.',
    imageUrl: '/src/assets/images/bill_vegetable_slip_1792658596503.jpg',
    awcId: 'awc_awvad04',
    awcName: '04-Vadtal Anganwadi Centre',
    status: 'pending_review',
    supervisorNote: ''
  },
  {
    id: 'bill_vad_02',
    invoiceNumber: 'GAS-IND-451029',
    vendorName: 'Shri Vinayak Indane Gas Agency, Anand',
    vendorCategory: 'LPG Cylinder',
    billDate: '2026-10-19',
    uploadedAt: '19 Oct 2026, 04:10 PM',
    amount: 1128.0,
    workerRemark: '14.2 kg domestic LPG cylinder refill for Anganwadi cooking stove.',
    imageUrl: '/src/assets/images/bill_lpg_cylinder_1792658628512.jpg',
    awcId: 'awc_awvad04',
    awcName: '04-Vadtal Anganwadi Centre',
    status: 'approved_dbt',
    supervisorNote: 'Verified receipt against LPG agency counterfoil. Approved for DBT transfer.',
    approvedAt: '2026-10-20T11:30:00',
    dbtReferenceNumber: 'DBT-WCD-GJ-98214'
  },
  {
    id: 'bill_mog_01',
    invoiceNumber: 'MOG-SPICE-104',
    vendorName: 'Ambe Kirana Stores, Mogri Gam',
    vendorCategory: 'Spices & Condiments',
    billDate: '2026-10-20',
    uploadedAt: '20 Oct 2026, 05:20 PM',
    amount: 430.0,
    workerRemark: 'Mustard seeds, turmeric powder, cumin, and iodized salt for October cooking.',
    imageUrl: '/src/assets/images/bill_vegetable_slip_1792658596503.jpg',
    awcId: 'awc_awvad02',
    awcName: '02-Mogri Anganwadi Centre',
    status: 'pending_review',
    supervisorNote: ''
  },
  {
    id: 'bill_krm_01',
    invoiceNumber: 'KRM-SAN-881',
    vendorName: 'Mahadev General Stores, Karamsad',
    vendorCategory: 'Sanitization & Cleaning',
    billDate: '2026-10-18',
    uploadedAt: '18 Oct 2026, 03:00 PM',
    amount: 320.0,
    workerRemark: 'Handwash soap bottles, dishwashing detergent, and floor disinfectant.',
    imageUrl: '/src/assets/images/bill_vegetable_slip_1792658596503.jpg',
    awcId: 'awc_awvad03',
    awcName: '03-Karamsad Anganwadi Centre',
    status: 'disbursed',
    supervisorNote: 'Disbursed directly to worker A/C No: ****4918 via PFMS portal.',
    approvedAt: '2026-10-19T10:00:00',
    dbtReferenceNumber: 'PFMS-CR-AND-441029'
  },
  {
    id: 'bill_smk_01',
    invoiceNumber: 'SMK-VEG-092',
    vendorName: 'Kisan Mandi Samarkha',
    vendorCategory: 'Vegetables',
    billDate: '2026-10-21',
    uploadedAt: 'Yesterday, 06:10 PM',
    amount: 280.0,
    workerRemark: 'Bottlegourd, carrots and coriander for vegetable khichdi.',
    imageUrl: '/src/assets/images/bill_vegetable_slip_1792658596503.jpg',
    awcId: 'awc_awvad05',
    awcName: '05-Samarkha Anganwadi Centre',
    status: 'pending_review',
    supervisorNote: ''
  }
];

export const INITIAL_TRANSFERS: SetuShareTransfer[] = [
  {
    id: 'trf_001',
    timestamp: '2026-10-21T14:30:00',
    date: '2026-10-21',
    fromAwcId: 'awc_awvad04',
    fromAwcName: '04-Vadtal Anganwadi Centre',
    toAwcId: 'awc_awvad02',
    toAwcName: '02-Mogri Anganwadi Centre',
    commodityName: 'Fortified Rice',
    quantity: 5.0,
    unit: 'kg',
    otpCode: '#8491',
    status: 'transferred',
    reason: 'Mogri godown delivery was delayed by 1 day; borrowed 5 kg rice for children hot lunch.',
    initiatedBy: 'Smt. Kokilaben Vankar (Borrower)'
  },
  {
    id: 'trf_002',
    timestamp: '2026-10-18T10:15:00',
    date: '2026-10-18',
    fromAwcId: 'awc_awvad03',
    fromAwcName: '03-Karamsad Anganwadi Centre',
    toAwcId: 'awc_awvad04',
    toAwcName: '04-Vadtal Anganwadi Centre',
    commodityName: 'Fortified Edible Oil',
    quantity: 2.0,
    unit: 'liter',
    otpCode: '#6210',
    status: 'returned_settled',
    reason: 'Emergency requirement during Saturday community nutrition fair.',
    initiatedBy: 'Smt. BhavnaBen Patel (Borrower)',
    settledDate: '2026-10-20'
  },
  {
    id: 'trf_003',
    timestamp: '2026-10-20T16:00:00',
    date: '2026-10-20',
    fromAwcId: 'awc_awvad04',
    fromAwcName: '04-Vadtal Anganwadi Centre',
    toAwcId: 'awc_awvad05',
    toAwcName: '05-Samarkha Anganwadi Centre',
    commodityName: 'Bal Shakti THR Packets',
    quantity: 4,
    unit: 'packets',
    otpCode: '#3902',
    status: 'transferred',
    reason: 'Two new twin infants enrolled suddenly; need instant THR supply before monthly challan.',
    initiatedBy: 'Smt. Daxaben Parmar (Borrower)'
  }
];

export const INITIAL_ATTENDANCE: Record<AwcId, ChildAttendance> = {
  awc_awvad04: {
    date: '2026-10-22',
    enrolled: 48,
    present: 41,
    boysPresent: 20,
    girlsPresent: 21,
    morningSnackCount: 38,
    lunchCount: 39
  },
  awc_awvad02: {
    date: '2026-10-22',
    enrolled: 42,
    present: 35,
    boysPresent: 18,
    girlsPresent: 17,
    morningSnackCount: 34,
    lunchCount: 34
  },
  awc_awvad03: {
    date: '2026-10-22',
    enrolled: 52,
    present: 46,
    boysPresent: 22,
    girlsPresent: 24,
    morningSnackCount: 44,
    lunchCount: 43
  },
  awc_awvad05: {
    date: '2026-10-22',
    enrolled: 40,
    present: 33,
    boysPresent: 16,
    girlsPresent: 17,
    morningSnackCount: 32,
    lunchCount: 32
  },
  awc_10103: {
    date: '2026-10-22',
    enrolled: 45,
    present: 38,
    boysPresent: 19,
    girlsPresent: 19,
    morningSnackCount: 38,
    lunchCount: 38
  }
};
