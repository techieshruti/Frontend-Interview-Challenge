// Utility function to get the start of the week (Monday) for a given date
export function getWeekStart(date: Date): Date {
  const day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ...)
  const diff = (day === 0 ? -6 : 1) - day; // Calculate the difference to Monday
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() + diff);
  return weekStart;
}