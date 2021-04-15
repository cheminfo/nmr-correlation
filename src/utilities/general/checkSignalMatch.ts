function checkSignalMatch(
  signalDelta1: number,
  signalDelta2: number,
  tolerance: number,
): boolean {
  return (
    signalDelta1 - tolerance <= signalDelta2 &&
    signalDelta2 <= signalDelta1 + tolerance
  );
}

export default checkSignalMatch;
