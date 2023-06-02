export function views(count: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(count);
}
