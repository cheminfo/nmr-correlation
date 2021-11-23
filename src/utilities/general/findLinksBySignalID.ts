import { Link, Values } from '../../types';

export function findLinksBySignalID(
  correlations: Values,
  signalID: string,
): Link[] {
  let links: Link[] = [];
  correlations.forEach((_correlation) => {
    links = links.concat(
      _correlation.link.filter((_link) => _link.signal.id === signalID),
    );
  });

  return links;
}
