import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper, Typography, Box, IconButton, CircularProgress, Chip
} from '@mui/material';
import { PlayArrow, Pause, Stop } from '@mui/icons-material';
import { RootState } from '../store';
import { pauseSession, resumeSession, stopSession } from '../store/cookingSlice';

const MiniPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeSession = useSelector((state: RootState) => state.cooking.activeSession);
  const recipe = useSelector((state: RootState) => 
    activeSession ? state.recipes.recipes.find(r => r.id === activeSession.recipeId) : null
  );

  // Don't show mini player on the cooking session page for the active recipe
  if (!activeSession || !recipe || location.pathname === `/cook/${activeSession.recipeId}`) {
    return null;
  }

  const currentStep = recipe.steps[activeSession.currentStepIndex];
  const stepProgress = currentStep 
    ? Math.min((activeSession.stepElapsedTime / (currentStep.durationMinutes * 60 * 1000)) * 100, 100)
    : 0;

  const handlePause = () => {
    dispatch(pauseSession());
  };

  const handleResume = () => {
    dispatch(resumeSession());
  };

  const handleStop = () => {
    dispatch(stopSession());
  };

  const handleClick = () => {
    navigate(`/cook/${activeSession.recipeId}`);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        zIndex: 1000,
        maxWidth: 600,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
      elevation={12}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={stepProgress}
          size={40}
          thickness={5}
          sx={{
            color: '#2563eb',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size={40}
          thickness={5}
          sx={{
            color: 'rgba(0,0,0,0.1)',
            position: 'absolute',
            left: 0,
            zIndex: -1
          }}
        />
        <Box sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Typography variant="caption" component="div" color="text.secondary" fontSize="10px">
            {activeSession.currentStepIndex + 1}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap>
          {recipe.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={activeSession.status}
            color={activeSession.status === 'running' ? 'success' : 'warning'}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            Step {activeSession.currentStepIndex + 1}: {currentStep?.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }} onClick={(e) => e.stopPropagation()}>
        {activeSession.status === 'running' ? (
          <IconButton size="small" onClick={handlePause}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={handleResume}>
            <PlayArrow />
          </IconButton>
        )}
        <IconButton size="small" onClick={handleStop} color="error">
          <Stop />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default MiniPlayer;