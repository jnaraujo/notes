export function dateToLocaleString(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function longDateFormat(date: Date) {
  if (!date) return null;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
