export function sortLabels(labels: Array<string>): Array<string> {
  return labels.sort((a, b) =>
    Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) < 0
      ? -1
      : Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) === 0 &&
          a.split(/\d+/)[1] < b.split(/\d+/)[1]
        ? -1
        : 1,
  );
}
