export function mensureReadingTimeInMin(text: string) {
  const wordsPerMinute = 170;
  const numberOfWords = text.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
}
