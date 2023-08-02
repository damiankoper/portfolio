export function randArray(length: number) {
  return new Array(length).fill(0).map(() => 2 * Math.random() - 1);
}
