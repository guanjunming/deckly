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

export const formatDecimal = (value: number, precision: number = 2) => {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(precision);
};

export const formatTime = (seconds: number) => {
  if (seconds < secondsInMinute) {
    return `<${Math.ceil(seconds)}s`;
  } else if (seconds < secondsInHour) {
    const minutes = seconds / secondsInMinute;
    return `${minutes < 20 ? "<" : ""}${Math.ceil(minutes)}m`;
  } else if (seconds < secondsInDay) {
    const hours = seconds / secondsInHour;
    return `${formatDecimal(hours, 1)}h`;
  } else if (seconds < secondsInMonth) {
    const days = seconds / secondsInDay;
    return `${formatDecimal(days, 1)}d`;
  } else if (seconds < secondsInYear) {
    const months = seconds / secondsInMonth;
    return `${formatDecimal(months, 1)}mo`;
  } else {
    const years = seconds / secondsInYear;
    return `${formatDecimal(years, 1)}y`;
  }
};

export const formatTimeForStats = (
  milliseconds: number,
  short: boolean = false,
) => {
  if (milliseconds < millisecondsInMinute) {
    const seconds = milliseconds / millisecondsInSecond;
    return `${formatDecimal(seconds)} ${short ? "s" : "seconds"}`;
  } else if (milliseconds < millisecondsInHour) {
    const minutes = milliseconds / millisecondsInMinute;
    return `${formatDecimal(minutes)} ${short ? "m" : "minutes"}`;
  } else {
    const hours = milliseconds / millisecondsInHour;
    return `${formatDecimal(hours)} ${short ? "h" : "hours"}`;
  }
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const appendS = (text: string, value: number) => {
  return text + (value === 1 ? "" : "s");
};
