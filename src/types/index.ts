export interface Substance {
  id: string;
  name: string;
  category: 'medication' | 'supplement' | 'other';
  dosageUnit: string;
  maxDailyDose: number;
  minInterval: number; // in minutes
  lastIntake?: Date;
  dailyTotal: number;
}

export interface IntakeLog {
  id: string;
  substanceId: string;
  timestamp: Date;
  quantity: number;
  notes?: string;
  mood?: 'good' | 'neutral' | 'bad';
}

export type SafetyStatus = 'safe' | 'warning' | 'danger';