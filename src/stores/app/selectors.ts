import { createSelector } from '@reduxjs/toolkit';

import { State } from './appSlice';
import { RootState } from '..';

const appSelector = (state: RootState): State => state.app;

export const flashMessageSelector = createSelector(
  [appSelector],
  (state: State) => state.flashMessage,
);
