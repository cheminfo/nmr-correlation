import type { Spectrum2D } from '../../types/spectrum.js';

export function isEditedHSQC(experiment: Spectrum2D): boolean {
  // detection whether experiment is an edited HSQC
  return experiment.info.pulseSequence.includes('hsqced');
}
