import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import stateReducer from './reducers/state';

const store = configureStore({
  reducer: {
    auth: authReducer,
    state: stateReducer,
  },
});

export default store;
