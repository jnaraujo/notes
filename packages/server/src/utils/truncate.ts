export default function (text: string, max: number) {
  return text.slice(0, max).concat("...");
}
