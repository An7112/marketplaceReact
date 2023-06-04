import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import stateReducer from './reducers/state';
import authNodeReducer from './reducers/authNode'

const store = configureStore({
  reducer: {
    auth: authReducer,
    authNode: authNodeReducer,
    state: stateReducer,
  },
});

export default store;
