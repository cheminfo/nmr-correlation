import lodash from 'lodash';

import { Correlation, Link, Spectrum2D, Values } from '../types/types';

function getAtomCounts(mf: string): {[atomType: string]: number} {
  const elements: Array<string> | null = mf ? mf.match(/[A-Z][a-z]{0,1}/g) : [];
  const counts: {[atomType: string]: number} = {};

  if(elements){
    elements.forEach((elem) => {
      const regex = new RegExp(`(${elem}\\d+)`, 'g');
      const match = mf.match(regex);
      let count = 1;
      if (match) {
        count = Number(match[0].split(elem)[1]);
      }
      counts[elem] = count;
    });
  }
  
  return counts;
}

function getLabel (correlations: Values, correlation: Correlation): string {
  const label = Object.keys(correlation.attachment)
    .map((otherAtomType) =>
      correlation
        .attachment
        // eslint-disable-next-line no-unexpected-multiline
        [otherAtomType].map((index) =>
          correlation.label[correlations[index].label['origin']],
        )
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

function sortLabels (labels: Array<string>): Array<string> {
  return labels.sort((a, b) =>
    Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) < 0
      ? -1
      : Number(a.split(/[a-z]+/i)[1]) - Number(b.split(/[a-z]+/i)[1]) === 0 &&
        a.split(/\d+/)[1] < b.split(/\d+/)[1]
      ? -1
      : 1,
  );
}

function getLabels (correlations: Values, correlation: Correlation, experimentType: string): Array<string> {
  const labels = correlation
    .link
    .filter((link) => link.experimentType === experimentType)
    .map((link) =>
      link
        .match
        .map((match) => {
          const matchingCorrelation = correlations[match];
          return getLabel(correlations, matchingCorrelation);
        })
        .flat(),
    )
    .flat()
    .filter((label, i, a) => label.length > 0 && a.indexOf(label) === i);

  return sortLabels(labels);
}

function checkSignalMatch (signalDelta1: number, signalDelta2: number, tolerance: number): boolean {
  return signalDelta1 - tolerance <= signalDelta2 && signalDelta2 <= signalDelta1 + tolerance;
}

const letters = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

function getLetter (number: number): string {
  return letters[number];
}

function getCorrelationsByAtomType (correlations: Values, atomType: string): Values {
  return correlations
    ? correlations.filter(
        (correlation) => correlation.atomType === atomType,
      )
    : [];
}

function isEditedHSQC (experiment: Spectrum2D): boolean {
  // detection whether experiment is an edited HSQC
  return experiment.info.pulseSequence.includes('hsqced')
}

function getCorrelationIndex (correlations: Values, correlation: Correlation): number {
  return correlations.findIndex(
    (_correlation) => _correlation.id === correlation.id,
  );
}

function containsLink (correlation: Correlation, link: Link): boolean {
  return correlation
    .link
    .some(
      (_link) =>
        _link.experimentType === link.experimentType &&
        _link.experimentID === link.experimentID &&
        lodash.isEqual(_link.atomType, link.atomType) &&
        _link.signal.id === link.signal.id &&
        _link.axis === link.axis,
    );
}

export {
  checkSignalMatch,
  containsLink,
  getAtomCounts,
  getCorrelationsByAtomType,
  getCorrelationIndex,
  getLabel,
  getLabels,
  getLetter,
  isEditedHSQC,
};
