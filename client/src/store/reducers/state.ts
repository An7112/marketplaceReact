import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  limit: number,
  countInCart: number,
}

const initialState: State = {
  limit: 10,
  countInCart: 0,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    changeLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setCountInCart: (state, action: PayloadAction<number>) => {
      state.countInCart = action.payload
    },
  },
});

export const { changeLimit, setCountInCart } = stateSlice.actions;

export default stateSlice.reducer;
