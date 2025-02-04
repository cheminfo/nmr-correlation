import type { Signal1D, Signal2D } from './spectrum';

export interface CorrelationAndLinkFields {
  id: string;
  pseudo: boolean;
  edited: Record<string, boolean>;
}

export interface Link extends CorrelationAndLinkFields {
  atomType: string[];
  signal: Signal1D | Signal2D;
  axis: string | undefined;
  match: number[];
  experimentLabel: string;
  experimentType: string;
  experimentID: string;
}

export interface Correlation extends CorrelationAndLinkFields {
  atomType: string;
  label: Record<string, string>;
  link: Link[];
  equivalence: number;
  attachment: Record<string, number[]>;
  protonsCount: number[];
  hybridization: number[];
}

export interface CorrelationAndLinkOptions {
  id?: string;
  pseudo?: boolean;
  edited?: Record<string, boolean>;
}

export interface LinkOptions extends CorrelationAndLinkOptions {
  atomType?: string[];
  experimentType?: string;
  experimentID?: string;
  signal?: Signal1D | Signal2D;
  axis?: string;
  match?: number[];
  experimentLabel?: string;
}

export interface CorrelationData {
  values: Values;
  options: Options;
  state: State;
}

export interface CorrelationOptions extends CorrelationAndLinkOptions {
  atomType?: string;
  label?: Record<string, string>;
  link?: Link[];
  equivalence?: number;
  attachment?: Record<string, number[]>;
  protonsCount?: number[];
  hybridization?: number[];
}

export interface Options {
  tolerance: Tolerance;
  mf?: string;
  values?: Values;
  skipDataUpdate?: boolean;
}

export type State = Record<string, StateAtomType>;

export interface StateAtomType {
  current: number;
  total?: number;
  complete?: boolean;
  error?: StateAtomTypeError;
}

export type StateAtomTypeError = Record<string, boolean | number[]>;

export type Tolerance = Record<string, number>;

export type Values = Correlation[];
