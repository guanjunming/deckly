import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import {
  millisecondsInHour,
  millisecondsInMinute,
  millisecondsInSecond,
  secondsInDay,
  secondsInHour,
  secondsInMinute,
  secondsInMonth,
  secondsInYear,
} from "date-fns/constants";

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
  if (seconds < secondsInMinute) {
    return `<${Math.ceil(seconds)}s`;
  } else if (seconds < secondsInHour) {
    const minutes = seconds / secondsInMinute;
    return `${minutes < 20 ? "<" : ""}${Math.ceil(minutes)}m`;
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

export const formatTimeForStats = (
  milliseconds: number,
  short: boolean = false,
) => {
  if (milliseconds < millisecondsInMinute) {
    const seconds = milliseconds / millisecondsInSecond;
    return `${seconds.toFixed(seconds % 1 === 0 ? 0 : 2)} ${short ? "s" : "seconds"}`;
  } else if (milliseconds < millisecondsInHour) {
    const minutes = milliseconds / millisecondsInMinute;
    return `${minutes.toFixed(minutes % 1 === 0 ? 0 : 2)} ${short ? "m" : "minutes"}`;
  } else {
    const hours = milliseconds / millisecondsInHour;
    return `${hours.toFixed(hours % 1 === 0 ? 0 : 2)} ${short ? "h" : "hours"}`;
  }
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const appendS = (text: string, value: number) => {
  return text + (value === 1 ? "" : "s");
};
