// random select x images
export function randomSelectImages(images: string[], x: number): string[] {
    const shuffled = images.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, x);
}

// split images into x groups
export function splitImagesIntoGroups(images: string[], x: number): string[][] {
  const result: string[][] = [];
  const len = images.length;
  const minSize = Math.floor(len / x);
  let remainder = len % x;
  let start = 0;

  for (let i = 0; i < x; i++) {
    const extra = remainder > 0 ? 1 : 0;
    const end = start + minSize + extra;
    result.push(images.slice(start, end));
    start = end;
    remainder--;
  }
  return result;
}