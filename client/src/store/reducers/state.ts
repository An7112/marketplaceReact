import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
 limit: number,
}

const initialState: State = {
  limit: 10,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    changeLimit: (state, action: PayloadAction<number>) => {
     state.limit = action.payload
    },
  },
});

export const { changeLimit} = stateSlice.actions;

export default stateSlice.reducer;
