import { useState, useEffect, useCallback } from 'react';
import type { StudentProgress, UnitProgress } from '../types';

const STORAGE_KEY = 'masterenglish_student_progress_v3';

const DEFAULT_UNIT_PROGRESS: UnitProgress = {
  readingCompleted: false,
  matchCompleted: false,
  spellingCompleted: false,
  quizBestScore: 0
};

export const useProgress = (currentUnitId: string) => {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    if (typeof window === 'undefined') {
      return { units: { [currentUnitId]: { ...DEFAULT_UNIT_PROGRESS } } };
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }

    return {
      units: { [currentUnitId]: { ...DEFAULT_UNIT_PROGRESS } }
    };
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  }, []);

  const currentUnitProgress = progress.units[currentUnitId] || { ...DEFAULT_UNIT_PROGRESS };

  const markReadingDone = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      units: {
        ...prev.units,
        [currentUnitId]: {
          ...(prev.units[currentUnitId] || DEFAULT_UNIT_PROGRESS),
          readingCompleted: true
        }
      }
    }));
    showNotification('تم تسجيل استيعاب الدرس بنجاح');
  }, [currentUnitId, showNotification]);

  const markMatchDone = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      units: {
        ...prev.units,
        [currentUnitId]: {
          ...(prev.units[currentUnitId] || DEFAULT_UNIT_PROGRESS),
          matchCompleted: true
        }
      }
    }));
    showNotification('اكتمل نشاط مطابقة الكلمات');
  }, [currentUnitId, showNotification]);

  const markSpellingDone = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      units: {
        ...prev.units,
        [currentUnitId]: {
          ...(prev.units[currentUnitId] || DEFAULT_UNIT_PROGRESS),
          spellingCompleted: true
        }
      }
    }));
    showNotification('اكتمل تدريب التهجئة');
  }, [currentUnitId, showNotification]);

  const recordQuizScore = useCallback((score: number) => {
    setProgress(prev => {
      const existing = prev.units[currentUnitId] || DEFAULT_UNIT_PROGRESS;
      return {
        ...prev,
        units: {
          ...prev.units,
          [currentUnitId]: {
            ...existing,
            quizBestScore: Math.max(existing.quizBestScore, score)
          }
        }
      };
    });
  }, [currentUnitId]);

  return {
    progress,
    currentUnitProgress,
    markReadingDone,
    markMatchDone,
    markSpellingDone,
    recordQuizScore,
    notification
  };
};
