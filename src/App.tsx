import React, { useState } from 'react';
import IOSHeader from './components/IOSHeader';
import IOSTabBar from './components/IOSTabBar';
import IOSSubstanceCard from './components/IOSSubstanceCard';
import IOSSafetyIndicator from './components/IOSSafetyIndicator';
import type { Substance, SafetyStatus } from './types';

function App() {
  const [substances] = useState<Substance[]>([
    {
      id: '1',
      name: 'Ibuprofen',
      category: 'medication',
      dosageUnit: 'mg',
      maxDailyDose: 1200,
      minInterval: 240,
      lastIntake: new Date(Date.now() - 1000 * 60 * 180),
      dailyTotal: 800
    },
    {
      id: '2',
      name: 'Vitamin D3',
      category: 'supplement',
      dosageUnit: 'IU',
      maxDailyDose: 4000,
      minInterval: 1440,
      lastIntake: new Date(Date.now() - 1000 * 60 * 60 * 12),
      dailyTotal: 2000
    }
  ]);

  const handleLogIntake = (id: string) => {
    console.log('Logging intake for substance:', id);
  };

  const getOverallSafetyStatus = (): { status: SafetyStatus; message: string } => {
    const hasReachedLimit = substances.some(s => s.dailyTotal >= s.maxDailyDose);
    if (hasReachedLimit) {
      return { status: 'danger', message: 'Daily limit reached for one or more substances' };
    }

    const hasRecentIntake = substances.some(s => {
      if (!s.lastIntake) return false;
      const minutesSinceLastIntake = (new Date().getTime() - s.lastIntake.getTime()) / (1000 * 60);
      return minutesSinceLastIntake < s.minInterval;
    });

    if (hasRecentIntake) {
      return { status: 'warning', message: 'Minimum interval not met for some substances' };
    }

    return { status: 'safe', message: 'All substances within safe limits' };
  };

  const safetyStatus = getOverallSafetyStatus();

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20">
      <IOSHeader />
      
      <main className="px-4 py-4 space-y-6">
        <IOSSafetyIndicator status={safetyStatus.status} message={safetyStatus.message} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black px-1">Quick Add</h2>
          <div className="space-y-4">
            {substances.map(substance => (
              <IOSSubstanceCard
                key={substance.id}
                substance={substance}
                onLogIntake={handleLogIntake}
              />
            ))}
          </div>
        </div>

        <div className="ios-card p-4 space-y-4">
          <h2 className="text-xl font-semibold text-black">Today's Summary</h2>
          <div className="divide-y divide-gray-100">
            {substances.map(substance => (
              <div key={substance.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-black">{substance.name}</h3>
                    <p className="text-sm text-[#8E8E93]">{substance.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">
                      {substance.dailyTotal} / {substance.maxDailyDose} {substance.dosageUnit}
                    </p>
                    <p className="text-sm text-[#8E8E93]">
                      {substance.lastIntake
                        ? `Last taken ${new Date(substance.lastIntake).toLocaleTimeString()}`
                        : 'No intake today'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <IOSTabBar />
    </div>
  );
}

export default App;