export interface TimeTogether {
  years: string;
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  formattedSummary: string;
}

export const DEFAULT_START_DATE = new Date("2023-01-15T00:00:00");

const padZero = (num: number): string => String(num).padStart(2, "0");

function formatPlural(
  num: number,
  one: string,
  few: string,
  many: string,
): string {
  const mod10 = num % 10;
  const mod100 = num % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${num} ${many}`;
  if (mod10 === 1) return `${num} ${one}`;
  if (mod10 >= 2 && mod10 <= 4) return `${num} ${few}`;
  return `${num} ${many}`;
}

export function calculateTimeTogether(
  startDate: Date = DEFAULT_START_DATE,
): TimeTogether {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const yearsStr = formatPlural(years, "рік", "роки", "років");
  const monthsStr = formatPlural(months, "місяць", "місяці", "місяців");
  const formattedSummary = `${yearsStr}, ${monthsStr}`;
  return {
    years: padZero(years),
    months: padZero(months),
    days: padZero(days),
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    formattedSummary,
  };
}
