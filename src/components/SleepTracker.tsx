import React, { useState, useEffect, useMemo } from 'react';
import { SleepLog, AgeGroupId } from '../types';
import {
  Moon,
  Sun,
  Bed,
  Sparkles,
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
  Info,
  RotateCcw,
  Bot,
  Zap,
} from 'lucide-react';

interface SleepTrackerProps {
  currentAge: AgeGroupId;
  onOpenCompanionWithContext?: (contextPrompt: string) => void;
}

const STORAGE_KEY_SLEEP = 'healthpulse_sleep_logs';

const SLEEP_DISRUPTIONS = [
  'Screen time within 60m of bed',
  'Late caffeinated tea / soda',
  'Nasal congestion / allergic wheeze',
  'Heavy or late dinner',
  'Room too warm / poor air',
  'Exam stress / study anxiety',
  'Noisy surroundings',
  'Irregular weekend shift',
];

// Target sleep hours by age bracket (American Academy of Sleep Medicine / Indian Academy of Pediatrics)
function getTargetSleepRange(age: AgeGroupId): { min: number; max: number; label: string } {
  switch (age) {
    case '5-9':
      return { min: 9, max: 12, label: '9–12 hours' };
    case '10-14':
      return { min: 9, max: 11, label: '9–11 hours' };
    case '14-18':
      return { min: 8, max: 10, label: '8–10 hours' };
    case '18-25':
    case '26-35':
    case '36-44':
      return { min: 7, max: 9, label: '7–9 hours' };
    case '50+':
      return { min: 7, max: 8.5, label: '7–8.5 hours' };
    default:
      return { min: 8, max: 10, label: '8–10 hours' };
  }
}

export const SleepTracker: React.FC<SleepTrackerProps> = ({
  currentAge,
  onOpenCompanionWithContext,
}) => {
  const [logs, setLogs] = useState<SleepLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SLEEP);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Initial sample logs
    return [
      {
        id: 'slp-01',
        date: new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0],
        bedtime: '22:30',
        wakeTime: '06:45',
        durationMinutes: 495, // 8h 15m
        qualityRating: 4,
        awakeningsCount: 1,
        disruptions: ['Screen time within 60m of bed'],
        notes: 'Woke up feeling well rested.',
        ageGroup: currentAge === 'all' ? '10-14' : currentAge,
      },
      {
        id: 'slp-02',
        date: new Date(Date.now() - 48 * 3600 * 1000).toISOString().split('T')[0],
        bedtime: '23:45',
        wakeTime: '06:30',
        durationMinutes: 405, // 6h 45m
        qualityRating: 2,
        awakeningsCount: 2,
        disruptions: ['Nasal congestion / allergic wheeze', 'Exam stress / study anxiety'],
        notes: 'Allergy congestion made mouth breathing dry.',
        ageGroup: currentAge === 'all' ? '10-14' : currentAge,
      },
    ];
  });

  // Current inputs
  const [bedtime, setBedtime] = useState<string>('22:30');
  const [wakeTime, setWakeTime] = useState<string>('07:00');
  const [qualityRating, setQualityRating] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [awakeningsCount, setAwakeningsCount] = useState<number>(0);
  const [selectedDisruptions, setSelectedDisruptions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SLEEP, JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  const targetRange = getTargetSleepRange(currentAge);

  // Compute duration from bedtime to wake time
  const currentDurationMinutes = useMemo(() => {
    const [bH, bM] = bedtime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);

    if (isNaN(bH) || isNaN(bM) || isNaN(wH) || isNaN(wM)) return 480;

    let bedTotal = bH * 60 + bM;
    let wakeTotal = wH * 60 + wM;

    if (wakeTotal <= bedTotal) {
      // Overnight sleep
      wakeTotal += 24 * 60;
    }

    return wakeTotal - bedTotal;
  }, [bedtime, wakeTime]);

  const currentDurationHours = (currentDurationMinutes / 60).toFixed(1);

  // Status relative to age targets
  const currentSleepStatus = useMemo(() => {
    const hours = currentDurationMinutes / 60;
    if (hours < targetRange.min - 1.5) {
      return {
        label: 'Severe Sleep Deficit',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        description: `Below the recommended minimum of ${targetRange.min} hours for ${currentAge} yrs.`,
      };
    }
    if (hours < targetRange.min) {
      return {
        label: 'Mild Sleep Deficit',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        description: `Slightly below target (${targetRange.label}). Try advancing bedtime by 30 mins.`,
      };
    }
    if (hours <= targetRange.max) {
      return {
        label: 'Optimal Restorative Sleep',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        description: `Right within the clinical target of ${targetRange.label} for optimal cognitive and immune recovery.`,
      };
    }
    return {
      label: 'Extended Sleep Duration',
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      description: `Above typical range (${targetRange.label}). Common during recovery from viral illness or growth spurts.`,
    };
  }, [currentDurationMinutes, targetRange, currentAge]);

  const toggleDisruption = (item: string) => {
    setSelectedDisruptions((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    const newLog: SleepLog = {
      id: `slp-${Date.now()}`,
      date: today,
      bedtime,
      wakeTime,
      durationMinutes: currentDurationMinutes,
      qualityRating,
      awakeningsCount,
      disruptions: selectedDisruptions,
      notes: notes.trim() || undefined,
      ageGroup: currentAge === 'all' ? '10-14' : currentAge,
    };

    setLogs((prev) => [newLog, ...prev]);
    setNotes('');
    setSelectedDisruptions([]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  // Average weekly metrics
  const avgStats = useMemo(() => {
    if (!logs.length) return { avgHours: '0.0', avgQuality: '0.0', totalLogged: 0 };
    const totalMinutes = logs.reduce((acc, l) => acc + l.durationMinutes, 0);
    const avgMinutes = totalMinutes / logs.length;
    const avgQuality = (logs.reduce((acc, l) => acc + l.qualityRating, 0) / logs.length).toFixed(1);

    return {
      avgHours: (avgMinutes / 60).toFixed(1),
      avgQuality,
      totalLogged: logs.length,
    };
  }, [logs]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              <Moon className="w-4 h-4" />
              <span>Circadian Hygiene & Recovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              Youth & Family Sleep Quality Tracker
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Track bedtime regularity, nocturnal awakenings, and allergy-induced sleep interruptions against age-calibrated clinical standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenCompanionWithContext && (
              <button
                onClick={() => {
                  onOpenCompanionWithContext(
                    `Please evaluate my sleep patterns: Average sleep duration is ${avgStats.avgHours} hours with quality rating of ${avgStats.avgQuality}/5 for age group ${currentAge}. Common disruptions include screen time and allergic nasal congestion. What evidence-based sleep hygiene steps should we take?`
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors shadow-2xs"
              >
                <Bot className="w-4 h-4 text-indigo-200" />
                <span>Analyze Sleep with Companion AI</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Target Recommendation Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
              Recommended Target for {currentAge} Years
            </span>
            <div className="text-base font-bold text-slate-900 font-heading">
              {targetRange.label} of Uninterrupted Sleep
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 max-w-md leading-relaxed">
          Growth hormone secretion and cellular allergy repair peak during non-REM deep slow-wave sleep. Nightly sleep debt impairs immune vigilance and daytime focus.
        </div>
      </div>

      {/* Grid: Interactive Input on Left / History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Log Night Sleep</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Automatic Duration</span>
          </div>

          <form onSubmit={handleAddLog} className="space-y-4">
            {/* Bedtime & Wake Time Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Bedtime</span>
                </label>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Wake Time</span>
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                  required
                />
              </div>
            </div>

            {/* Calculated Sleep Metrics Display */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Sleep Duration
                </span>
                <span className="text-2xl font-black text-slate-900 font-heading tabular-nums">
                  {currentDurationHours} <span className="text-sm font-medium text-slate-500">hours</span>
                </span>
              </div>
              <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${currentSleepStatus.color}`}>
                {currentSleepStatus.label}
              </div>
            </div>

            {/* Quality Rating 1 to 5 Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Sleep Restfulness Rating
              </label>
              <div className="flex items-center gap-2">
                {([1, 2, 3, 4, 5] as const).map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setQualityRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    title={`${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= qualityRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-500 font-medium ml-2">
                  {qualityRating === 5
                    ? 'Deep & Refreshing'
                    : qualityRating === 4
                    ? 'Good Rest'
                    : qualityRating === 3
                    ? 'Fair / Average'
                    : qualityRating === 2
                    ? 'Fragmented'
                    : 'Poor / Restless'}
                </span>
              </div>
            </div>

            {/* Night Awakenings Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Night Awakenings / Interrupted Sleep
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((count) => (
                  <button
                    type="button"
                    key={count}
                    onClick={() => setAwakeningsCount(count)}
                    className={`py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                      awakeningsCount === count
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count === 3 ? '3+ times' : `${count} ${count === 1 ? 'time' : 'times'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Disruptions Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Pre-Bed Disruptions & Triggers
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SLEEP_DISRUPTIONS.map((disrupt) => {
                  const isSelected = selectedDisruptions.includes(disrupt);
                  return (
                    <button
                      type="button"
                      key={disrupt}
                      onClick={() => toggleDisruption(disrupt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-indigo-700 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected && '✓ '}
                      {disrupt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Morning Reflections & Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Woke up with dry mouth due to AC fan; refreshed after stretching..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Night Sleep Record</span>
            </button>
          </form>

          {/* Average Statistics */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Duration</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {avgStats.avgHours}h
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Quality</span>
              <span className="text-lg font-bold text-amber-600 tabular-nums">
                {avgStats.avgQuality} / 5
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged Nights</span>
              <span className="text-lg font-bold text-indigo-700 tabular-nums">
                {avgStats.totalLogged}
              </span>
            </div>
          </div>
        </div>

        {/* Right: History Log */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Sleep History Log ({logs.length})
              </h3>
            </div>
            {logs.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Clear sleep history logs?')) setLogs([]);
                }}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                <Moon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                No Sleep Records Logged
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Log your bedtime and morning wake time above to monitor sleep debt and identify allergy triggers that fragment night rest.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const hours = (log.durationMinutes / 60).toFixed(1);
                const isDeficit = log.durationMinutes / 60 < targetRange.min;

                return (
                  <div
                    key={log.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                          <Moon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-bold text-slate-900 font-heading tabular-nums">
                              {hours} hours
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              ({log.bedtime} → {log.wakeTime})
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                isDeficit
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {isDeficit ? 'Sleep Deficit' : 'Optimal Target'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <div className="flex items-center text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < log.qualityRating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>·</span>
                            <span>{log.awakeningsCount} awakenings</span>
                            <span>·</span>
                            <span>{log.date}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Disruptions */}
                    {log.disruptions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-slate-400 font-medium">Disruptors:</span>
                        {log.disruptions.map((dis) => (
                          <span
                            key={dis}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                          >
                            {dis}
                          </span>
                        ))}
                      </div>
                    )}

                    {log.notes && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                        <span className="font-semibold text-slate-700">Notes: </span>
                        {log.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
