import type { Correlation, Values } from '../../types/correlation.js';

export function getLabel(
  correlations: Values,
  correlation: Correlation,
): string {
  const values = Object.keys(correlation.attachment)
    .flatMap((otherAtomType) =>
      correlation.attachment[otherAtomType]
        .map((index) =>
          correlations[index]?.label
            ? correlation.label[correlations[index].label.origin]
            : '',
        )
        .filter((_label) => _label && _label.length > 0),
    )
    .filter((_label, i, a) => a.indexOf(_label) === i);
  values.sort((a, b) =>
    Number(a.split(/[a-z]+/i, 2)[1]) - Number(b.split(/[a-z]+/i, 2)[1]) < 0 ||
    (Number(a.split(/[a-z]+/i, 2)[1]) - Number(b.split(/[a-z]+/i, 2)[1]) ===
      0 &&
      a.split(/\d+/, 2)[1] < b.split(/\d+/, 2)[1])
      ? -1
      : 1,
  );
  const label = values.join('/');

  if (label.length > 0) {
    return label;
  }

  return correlation.label.origin;
}
