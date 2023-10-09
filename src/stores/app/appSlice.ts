import { createSlice } from '@reduxjs/toolkit';

import { MessageStatus } from '@/enums/common';

import reducers from './reducers';

export type State = {
  flashMessage: {
    message: string;
    status?: MessageStatus;
  };
};

export const initialState: State = {
  flashMessage: {
    message: '',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
});

export const { resetApp, resetFlashMessage, setFlashMessage } =
  appSlice.actions;

export default appSlice.reducer;
