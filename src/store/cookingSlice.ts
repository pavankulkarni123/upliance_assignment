import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CookingSession } from '../types';

interface CookingState {
  activeSession: CookingSession | null;
}

const initialState: CookingState = {
  activeSession: null,
};

const cookingSlice = createSlice({
  name: 'cooking',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<string>) => {
      const now = Date.now();
      state.activeSession = {
        recipeId: action.payload,
        currentStepIndex: 0,
        status: 'running',
        startTime: now,
        pausedTime: 0,
        stepStartTime: now,
        stepElapsedTime: 0,
      };
    },
    pauseSession: (state) => {
      if (state.activeSession && state.activeSession.status === 'running') {
        state.activeSession.status = 'paused';
        state.activeSession.pausedTime = Date.now();
      }
    },
    resumeSession: (state) => {
      if (state.activeSession && state.activeSession.status === 'paused') {
        const pauseDuration = Date.now() - state.activeSession.pausedTime;
        state.activeSession.status = 'running';
        state.activeSession.stepStartTime += pauseDuration;
        state.activeSession.pausedTime = 0;
      }
    },
    nextStep: (state) => {
      if (state.activeSession) {
        state.activeSession.currentStepIndex += 1;
        state.activeSession.stepStartTime = Date.now();
        state.activeSession.stepElapsedTime = 0;
      }
    },
    stopSession: (state) => {
      state.activeSession = null;
    },
    updateStepProgress: (state, action: PayloadAction<number>) => {
      if (state.activeSession) {
        state.activeSession.stepElapsedTime = action.payload;
      }
    },
  },
});

export const { 
  startSession, 
  pauseSession, 
  resumeSession, 
  nextStep, 
  stopSession, 
  updateStepProgress 
} = cookingSlice.actions;
export default cookingSlice.reducer;