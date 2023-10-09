import { PayloadAction } from '@reduxjs/toolkit';

import { MessageStatus } from '@/enums/common';

import { State, initialState } from './appSlice';

const reducers = {
  resetApp() {
    return initialState;
  },

  resetFlashMessage(state: State) {
    state.flashMessage = {
      message: '',
    };
  },

  setFlashMessage(
    state: State,
    action: PayloadAction<{
      message: string;
      status: MessageStatus;
    }>,
  ) {
    state.flashMessage = action.payload;
  },
};

export default reducers;
