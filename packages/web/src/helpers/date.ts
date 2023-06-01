export function dateToLocaleString(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
