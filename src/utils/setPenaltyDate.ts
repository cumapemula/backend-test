export function setPenalty(days: number) {
  const today = new Date();
  const penaltyDate = new Date(today.setDate(today.getDate() + days));
  return penaltyDate;
}
