export interface Ingredient {
  id: string;
  name: string;
  quantity: number | string;
  unit: 'g' | 'ml' | 'pcs' | 'tsp' | 'tbsp' | 'cup' | 'kg' | 'l' | 'pinch' | 'oz' | 'lb' | 'clove' | 'slice' | '';
}

export interface Step {
  id: string;
  description: string;
  type: 'cooking' | 'instruction';
  durationMinutes: number;
  temperature?: number; // 40-200°C for cooking steps
  speed?: number; // 1-5 for cooking steps
  ingredientIds?: string[]; // for instruction steps
}

export interface Recipe {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  steps: Step[];
  totalTimeMinutes: number;
  totalIngredients: number;
  complexityScore: number;
  isFavorite: boolean;
  createdAt: string;
  image?: string;
}

export interface CookingSession {
  recipeId: string;
  currentStepIndex: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  startTime: number;
  pausedTime: number;
  stepStartTime: number;
  stepElapsedTime: number;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type StepType = 'cooking' | 'instruction';
export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed';