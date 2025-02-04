import type { Link } from '../../types/correlation/link';
import type { Values } from '../../types/correlation/values';

export function findLinksBySignalID(
  correlations: Values,
  signalID: string,
): Link[] {
  let links: Link[] = [];
  for (const _correlation of correlations) {
    links = links.concat(
      _correlation.link.filter((_link) => _link.signal.id === signalID),
    );
  }

  return links;
}
