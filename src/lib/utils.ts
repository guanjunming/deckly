import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm");
};

export const formatDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const formatTime = (seconds: number) => {
  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 24 * 60 * 60;
  const secondsInMonth = 30 * 24 * 60 * 60;
  const secondsInYear = 365 * 24 * 60 * 60;

  if (seconds < secondsInMinute) {
    return `<${Math.round(seconds)}s`;
  } else if (seconds < secondsInHour) {
    const minutes = seconds / secondsInMinute;
    return `${minutes < 20 ? "<" : ""}${Math.round(minutes)}m`;
  } else if (seconds < secondsInDay) {
    const hours = seconds / secondsInHour;
    return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)}h`;
  } else if (seconds < secondsInMonth) {
    const days = seconds / secondsInDay;
    return `${days.toFixed(days % 1 === 0 ? 0 : 1)}d`;
  } else if (seconds < secondsInYear) {
    const months = seconds / secondsInMonth;
    return `${months.toFixed(months % 1 === 0 ? 0 : 1)}mo`;
  } else {
    const years = seconds / secondsInYear;
    return `${years.toFixed(years % 1 === 0 ? 0 : 1)}y`;
  }
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const appendS = (text: string, value: number) => {
  return text + (value === 1 ? "" : "s");
};
