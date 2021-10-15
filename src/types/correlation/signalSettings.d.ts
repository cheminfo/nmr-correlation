export interface signalSettings {
  signalID: string;
  axis: string | undefined;
  equivalence: number;
  hybridization: string;
  protonsCount: number[];
  edited: {
    [key: string]: boolean;
  };
}
