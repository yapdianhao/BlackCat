export const dateIsToday = (inputDate: Date) => {
  const today = new Date();
  return (
    inputDate.getDate() == today.getDate() &&
    inputDate.getMonth() == today.getMonth() &&
    inputDate.getFullYear() == today.getFullYear()
  );
};

export const dateIsTomorrow = (inputDate: Date) => {
  const today = new Date();
  const date1UTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const date2UTC = Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const daysConverter = 1000 * 3600 * 24;
  return (date2UTC - date1UTC) / daysConverter === 1;
};

export const dateIsWithinWeek = (inputDate: Date) => {
  const today = new Date();
  const date1UTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const date2UTC = Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const daysConverter = 1000 * 3600 * 24;
  return (
    (date2UTC - date1UTC) / daysConverter <= 7 &&
    (date2UTC - date1UTC) / daysConverter >= 0
  );
};

export const dateIsWithinMonth = (inputDate: Date) => {
  const today = new Date();
  const date1UTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const date2UTC = Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const daysConverter = 1000 * 3600 * 24;
  return (
    (date2UTC - date1UTC) / daysConverter <= 30 &&
    (date2UTC - date1UTC) / daysConverter >= 0
  );
};
