import { Correlation, Values } from '../../types/primary';

function getLabel(correlations: Values, correlation: Correlation): string {
  const label = Object.keys(correlation.attachment)
    .map((otherAtomType) =>
      correlation.attachment[otherAtomType] // eslint-disable-next-line no-unexpected-multiline
        .map((index) => correlation.label[correlations[index].label['origin']])
        .filter((_label) => _label),
    )
    .flat()
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

  return correlation.label['origin'];
}

export default getLabel;
