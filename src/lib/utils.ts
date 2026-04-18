/** Stima i minuti di lettura da un conteggio di parole (200 wpm). */
export function getReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200))
}
