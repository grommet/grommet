export const setHoursWithOffset = (date) => {
  const newDate = new Date(date);

  if (date?.indexOf('T') === -1) {
    const offset = newDate.getTimezoneOffset();
    const hour = newDate.getHours();
    newDate.setHours(hour, offset < 0 ? -offset : offset);
  }

  return newDate;
};
