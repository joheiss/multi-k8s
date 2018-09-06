import {FibIndex} from './fibIndex';
import {FibValue} from './fibValue';

export interface State {
  seenIndexes: FibIndex[];
  values: FibValue[];
  currentIndex: string;
}

export const emptyState = {
  seenIndexes: [] as FibIndex[],
  values: [] as FibValue[],
  currentIndex: ''
};
