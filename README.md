# nmr-correlation

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

This package provides methods to build correlation data from NMR spectra.

Mainly, this is done by a grouping of signals with same nuclei between 1D and 2D or 2D and 2D NMR spectra. Each group is then represented by one single signal (correlation).

If a molecular formula is given, then missing correlations will be added as placeholder to complete the list.

Another feature is to determine the number of attached protons by using information from DEPT 90/135 or multiplicity-edited HSQC.

## Input

### Spectra

- array of 1D, 2D, DEPT 90/135 spectra
- each spectrum has to be in same format as from [nmr-parser](https://github.com/cheminfo/nmr-parser)

### Options

- tolerances (must be given for each occurring atom type in spectra)
- molecular formula (optional)

### Values

- optional, previously built correlations
- useful for keeping the following information if marked as "edited":
  - hybridization, equivalence, protonsCount

## Output

### State

- for each atom type with at least one correlation
- current number of correlations
- some error information according to a given molecular formula

### Values

An array of correlations with following content:

- link
  - signal, axis (2D signal and current axis which links to signals in another spectra)
  - match (indices of correlations with signal shift matches)
  - pseudo (whether this link is artificial)
  - some further meta information
- attachment (contains indices of each attached correlation/atom)
- protonsCount (array of possible numbers of attached protons)
- equivalence (number of equivalences, default is 1)
- hybridization (not set by default)
- pseudo (whether this is a placeholder, e.g. if molecular formula is given)
- some further meta information, e.g. the group representing signal

## Installation

`$ npm i nmr-correlation`

## Usage

```js
import { fromJCAMP } from 'nmr-parser';
import { CorrelationManager } from 'nmr-correlation';

// parse spectra (symbolic example)
const data1H = fromJCAMP('1h.dx');
const data13C = fromJCAMP('13C.dx');
const dataHSQC = fromJCAMP('hsqc.dx');
const dataHMBC = fromJCAMP('hmbc.dx');
const dataCOSY = fromJCAMP('cosy.dx');
const dataDEPT90 = fromJCAMP('dept90.dx');
const dataDEPT135 = fromJCAMP('dept135.dx');
// combine spectra into one array
const spectra = [
  data1H,
  data13C,
  dataHSQC,
  dataHMBC,
  dataCOSY,
  dataDEPT90,
  dataDEPT135,
];
// create options
const options = {
  tolerance: {
    C: 0.25,
    H: 0.02,
  },
  mf: 'C11H14N2O', // molecular formula
};
// build correlation data
const correlationData = CorrelationManager.build(spectra, options);
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/nmr-correlation.svg
[npm-url]: https://www.npmjs.com/package/nmr-correlation
[download-image]: https://img.shields.io/npm/dm/nmr-correlation.svg
[download-url]: https://www.npmjs.com/package/nmr-correlation
