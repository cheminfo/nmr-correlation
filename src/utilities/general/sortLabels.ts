export function sortLabels(labels: string[]): string[] {
  labels.sort((a, b) =>
    Number(a.split(/[a-z]+/i, 2)[1]) - Number(b.split(/[a-z]+/i, 2)[1]) < 0 ||
    (Number(a.split(/[a-z]+/i, 2)[1]) - Number(b.split(/[a-z]+/i, 2)[1]) ===
      0 &&
      a.split(/\d+/, 2)[1] < b.split(/\d+/, 2)[1])
      ? -1
      : 1,
  );
  return labels;
}
