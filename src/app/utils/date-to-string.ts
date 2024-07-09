export function convertDateToString(date: Date): string {
  if (!date) {
    return;
  }

  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  );
  newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
  return newDate.toISOString();
}
