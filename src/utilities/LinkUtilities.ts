import { Link, LinkOptions } from '../types/types';
import generateID from './generateID';


function buildLink(options: LinkOptions): Link {
  return {
    id: options.id || generateID(),
    experimentType: options.experimentType,
    experimentID: options.experimentID,
    atomType: options.atomType,
    signal: options.signal,
    axis: options.axis,
    match: options.match || [],
    experimentLabel: options.experimentLabel || "",
    pseudo: options.pseudo || false,
  } as Link;
}

  function addMatch(link: Link, index: number): void {
    if (!link.match.includes(index)) {
      link.match.push(index);
    }
  }

  function removeMatch(link: Link, index: number): void {
    const indexOf = link.match.indexOf(index);
    if (indexOf >= 0) {
      link.match.splice(indexOf, 1);
    }
  }

  function removeMatches(link: Link): void {
    link.match = [];
  }


  export {addMatch, buildLink, removeMatch, removeMatches}
