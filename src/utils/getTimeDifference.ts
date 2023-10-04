export function getTimeDifference(return_date: Date, borrowing_date: Date) {
  const date1: any = new Date(return_date);
  const date2: any = new Date(borrowing_date);

  const diffDays = new Date(date1 - date2);

  const day = diffDays.getDate();
  const month = diffDays.getMonth();
  const year = diffDays.getFullYear() - 1970;
  return {
    day,
    month,
    year,
  };
}
