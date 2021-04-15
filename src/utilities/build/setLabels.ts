import { Values } from "../../types/primary";
import lodashGet from "lodash/get";

function setLabels(correlations: Values): void {
  const atomTypeCounts: { [atomType: string]: number } = {};
  correlations.forEach((correlation) => {
    if (!lodashGet(atomTypeCounts, correlation.atomType, false)) {
      atomTypeCounts[correlation.atomType] = 0;
    }
    atomTypeCounts[correlation.atomType]++;
    correlation.label['origin'] = `${correlation.atomType}${
      atomTypeCounts[correlation.atomType]
    }`;
  });
}

export default setLabels;