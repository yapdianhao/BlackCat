import { monthNames } from "./MonthNames";

export const renderDate = (date: Date): number => {
  return date.getDate();
};

export const renderMonth = (date: Date): string => {
  return monthNames[date.getMonth()];
};

export const renderMonthNumeric = (date: Date): number => {
  return date.getMonth();
};

export const renderYear = (date: Date): number => {
  return date.getFullYear();
};

export const renderMinutes = (date: Date): number => {
  return date.getMinutes();
};

export const renderHour = (date: Date): number => {
  const hours = date.getHours();
  return hours > 12 ? hours - 12 : hours;
};

export const renderAmPm = (date: Date): string => {
  const hours = date.getHours();
  return hours >= 12 ? "pm" : "am";
};

export const getDayDiff = (date: Date | string): number => {
  const today = new Date();
  const postedDate: Date = new Date(date);
  const timeDiff = today.getDate() - postedDate.getDate();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayDiff;
};
