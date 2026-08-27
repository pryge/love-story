import { ImportantDate } from './kittyOurDates.constants';

export interface CalculatedDateInfo {
  id: string;
  title: string;
  dayStr: string;
  monthStr: string;
  daysRemaining: number;
  countdownText: string;
  isFavorite: boolean;
  category: string;
}

const MONTH_NAMES_SHORT: Record<number, string> = {
  0: 'СІЧ',
  1: 'ЛЮТ',
  2: 'БЕР',
  3: 'КВІ',
  4: 'ТРА',
  5: 'ЧЕР',
  6: 'ЛИП',
  7: 'СЕР',
  8: 'ВЕР',
  9: 'ЖОВ',
  10: 'ЛИС',
  11: 'ГРУ',
};

export function getUpcomingDateInfo(item: ImportantDate): CalculatedDateInfo {
  const now = new Date();
  const [monthStrRaw, dayStrRaw] = item.monthDay.split('-');
  const monthIdx = parseInt(monthStrRaw, 10) - 1;
  const dayNum = parseInt(dayStrRaw, 10);

  const currentYear = now.getFullYear();
  let targetDate = new Date(currentYear, monthIdx, dayNum);

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (targetDate < todayStart) {
    targetDate = new Date(currentYear + 1, monthIdx, dayNum);
  }

  const diffMs = targetDate.getTime() - todayStart.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let countdownText = '';
  if (daysRemaining === 0) {
    countdownText = 'Сьогодні! 🎉';
  } else if (daysRemaining === 1) {
    countdownText = 'Завтра! ✨';
  } else {
    countdownText = `Через ${daysRemaining} днів`;
  }

  return {
    id: item.id,
    title: item.title,
    dayStr: String(dayNum).padStart(2, '0'),
    monthStr: MONTH_NAMES_SHORT[monthIdx] || 'ЖОВ',
    daysRemaining,
    countdownText,
    isFavorite: !!item.isFavorite,
    category: item.category || 'Подія',
  };
}

export function getAllCalculatedDates(items: ImportantDate[]): CalculatedDateInfo[] {
  return items
    .map(getUpcomingDateInfo)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);
}
