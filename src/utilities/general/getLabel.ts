import type { Correlation } from '../../types/correlation/correlation';
import type { Values } from '../../types/correlation/values';

export function getLabel(
  correlations: Values,
  correlation: Correlation,
): string {
  const label = Object.keys(correlation.attachment)
    .flatMap((otherAtomType) =>
      correlation.attachment[otherAtomType]
        .map((index) =>
          correlations[index]?.label
            ? correlation.label[correlations[index].label.origin]
            : '',
        )
        .filter((_label) => _label && _label.length > 0),
    )
    .filter((_label, i, a) => a.indexOf(_label) === i)
    .sort((a, b) =>
      Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) < 0
        ? -1
        : Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) === 0 &&
            a.split(/\d+/)[1] < b.split(/\d+/)[1]
          ? -1
          : 1,
    )
    .join('/');

  if (label.length > 0) {
    return label;
  }

  return correlation.label.origin;
}
