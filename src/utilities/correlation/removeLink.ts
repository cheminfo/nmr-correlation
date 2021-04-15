import { Correlation } from '../../types/primary';

function removeLink(correlation: Correlation, id: string): Correlation {
  correlation.link = correlation.link.filter((_link) => _link.id !== id);

  return correlation;
}

export default removeLink;
