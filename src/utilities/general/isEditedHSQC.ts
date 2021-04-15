import { Spectrum2D } from '../../types/primary';

function isEditedHSQC(experiment: Spectrum2D): boolean {
  // detection whether experiment is an edited HSQC
  return experiment.info.pulseSequence.includes('hsqced');
}

export default isEditedHSQC;
