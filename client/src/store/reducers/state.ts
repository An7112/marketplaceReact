import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  limit: number,
  countInCart: number,
  searchItem: string,
}

const initialState: State = {
  limit: 10,
  countInCart: 0,
  searchItem: '',
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
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchItem = action.payload
    }
  },
});

export const { changeLimit, setCountInCart, setSearchValue } = stateSlice.actions;

export default stateSlice.reducer;
