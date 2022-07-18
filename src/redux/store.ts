import { configureStore } from '@reduxjs/toolkit';
import boxSlice from './slices/boxSlice';

const store = configureStore({
  reducer: {
    boxSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
