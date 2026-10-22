export type AwcId = 'awc_awvad04' | 'awc_awvad02' | 'awc_awvad03' | 'awc_awvad05' | 'awc_10103';

export interface AwcInfo {
  id: AwcId;
  code: string;
  name: string;
  nameGu: string;
  village: string;
  villageGu: string;
  taluka: string;
  district: string;
  workerName: string;
  workerPhone: string;
  helperName: string;
  enrolledChildren: number;
  pregnantLactatingMothers: number;
  adolescentGirls: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  nameGu: string;
  category: 'grain' | 'pulse' | 'oil' | 'thr';
  currentStockKg: number;
  unit: 'kg' | 'liter' | 'packets';
  minimumThreshold: number;
  dailyConsumption: number;
  lastUpdated: string;
  batchNumber?: string;
  expiryDate?: string;
}

export interface InwardChallan {
  id: string;
  challanNumber: string;
  sourceSupplier: string;
  date: string;
  receivedBy: string;
  items: {
    itemName: string;
    quantity: number;
    unit: string;
    batchNumber: string;
    mfgDate: string;
    expiryDate: string;
  }[];
  vehicleNumber?: string;
  verifiedBySupervisor?: boolean;
}

export interface MealEntry {
  id: string;
  date: string;
  mealType: 'morning_snack' | 'hot_cooked_lunch';
  menuName: string;
  menuNameGu: string;
  plannedCount: number;
  actualServedCount: number;
  itemsUsed: {
    itemName: string;
    quantityKg: number;
  }[];
  servedAt: string;
  supervisorVerified: boolean;
  supervisorComment?: string;
  verifiedAt?: string;
}

export interface MealPhoto {
  id: string;
  mealEntryId: string;
  date: string;
  mealType: 'morning_snack' | 'hot_cooked_lunch';
  menuName: string;
  imageUrl: string;
  capturedAt: string;
  awwName: string;
  latitude: number;
  longitude: number;
  locationAccuracyMeters: number;
  addressText: string;
  childrenCountVisible: number;
  verified: boolean;
  verificationBadge?: string;
  inspectionNotes?: string;
}

export interface ThrDistribution {
  id: string;
  date: string;
  beneficiaryType: 'infant_6m_3y' | 'pregnant_lactating' | 'adolescent_girl';
  packetType: 'Bal Shakti' | 'Matru Shakti' | 'Purna Shakti';
  packetsDistributed: number;
  beneficiariesCount: number;
  distributedBy: string;
}

export interface SetuShareTransfer {
  id: string;
  timestamp: string;
  date: string;
  fromAwcId: AwcId;
  fromAwcName: string;
  toAwcId: AwcId;
  toAwcName: string;
  commodityName: string;
  quantity: number;
  unit: string;
  otpCode: string; // e.g. "#8491"
  status: 'pending_approval' | 'transferred' | 'returned_settled';
  reason: string;
  initiatedBy: string;
  settledDate?: string;
}

export interface BillUpload {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorCategory: 'Vegetables' | 'Spices & Condiments' | 'LPG Cylinder' | 'Sanitization & Cleaning' | 'Water';
  billDate: string;
  uploadedAt: string;
  amount: number;
  workerRemark: string;
  imageUrl: string;
  awcId: AwcId;
  awcName: string;
  status: 'pending_review' | 'approved_dbt' | 'disbursed' | 'rejected_reupload';
  supervisorNote?: string;
  approvedAt?: string;
  dbtReferenceNumber?: string;
}

export interface ChildAttendance {
  date: string;
  enrolled: number;
  present: number;
  boysPresent: number;
  girlsPresent: number;
  morningSnackCount: number;
  lunchCount: number;
}

export type ViewTab = 
  | 'overview' 
  | 'inventory' 
  | 'meals' 
  | 'bills' 
  | 'transfers' 
  | 'report';

export type Language = 'en' | 'gu';
