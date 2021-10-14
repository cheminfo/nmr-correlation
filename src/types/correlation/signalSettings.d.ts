export interface signalSettings {
  signalID: string;
  axis: string;
  equivalence: number;
  hybridization: string;
  protonsCount: number[];
  edited: {
    [key: string]: boolean;
  };
}
