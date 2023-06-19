export function formatDate(date: Date): string {
  const formattedHours = addLeadingZero(date.getHours());
  const formattedMinutes = addLeadingZero(date.getMinutes());
  const formattedDays = addLeadingZero(date.getDate());
  const formattedMonths = addLeadingZero(date.getMonth() + 1);
  const formattedYear = date.getFullYear();

  return `${formattedHours}:${formattedMinutes} ${formattedDays}.${formattedMonths}.${formattedYear}`;
}

export function addLeadingZero(value: number): string {
  return value.toString().padStart(2, "0");
}
