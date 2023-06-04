import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  status: boolean;
}

const initialState: AuthState = {
    status: false
};

const authNodeSlice = createSlice({
  name: 'authNode',
  initialState,
  reducers: {
    authStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { authStatus } = authNodeSlice.actions;

export default authNodeSlice.reducer;
