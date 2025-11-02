import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types';
import { preloadedRecipes } from '../data/preloadedRecipes';

interface RecipesState {
  recipes: Recipe[];
  filters: {
    difficulty: string[];
    sortBy: 'totalTimeMinutes';
    sortOrder: 'asc' | 'desc';
  };
}

const getInitialRecipes = () => {
  const stored = localStorage.getItem('recipes:v1');
  if (stored) {
    const parsedRecipes = JSON.parse(stored);
    // Merge preloaded recipes with stored ones, avoiding duplicates
    const existingIds = parsedRecipes.map((r: any) => r.id);
    const newPreloaded = preloadedRecipes.filter(r => !existingIds.includes(r.id));
    return [...parsedRecipes, ...newPreloaded];
  }
  return preloadedRecipes;
};

const initialState: RecipesState = {
  recipes: getInitialRecipes(),
  filters: {
    difficulty: [],
    sortBy: 'totalTimeMinutes',
    sortOrder: 'asc',
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
      localStorage.setItem('recipes:v1', JSON.stringify(state.recipes));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const recipe = state.recipes.find(r => r.id === action.payload);
      if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        localStorage.setItem('recipes:v1', JSON.stringify(state.recipes));
      }
    },
    setDifficultyFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.difficulty = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sortOrder = action.payload;
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(r => r.id !== action.payload);
      localStorage.setItem('recipes:v1', JSON.stringify(state.recipes));
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        localStorage.setItem('recipes:v1', JSON.stringify(state.recipes));
      }
    },
  },
});

export const { addRecipe, toggleFavorite, setDifficultyFilter, setSortOrder, deleteRecipe, updateRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;