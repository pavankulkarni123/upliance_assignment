import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import cookingReducer from './cookingSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    cooking: cookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;