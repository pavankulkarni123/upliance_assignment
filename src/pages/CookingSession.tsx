import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Paper, Typography, Button, Box, Chip, LinearProgress,
  CircularProgress, IconButton, Card, CardContent, Stepper, Step, StepLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar
} from '@mui/material';
import { PlayArrow, Pause, Stop, Favorite, FavoriteBorder, AccessTime, CheckCircle, Warning, ArrowBack } from '@mui/icons-material';
import { RootState } from '../store';
import { startSession, pauseSession, resumeSession, stopSession, nextStep, updateStepProgress } from '../store/cookingSlice';
import { toggleFavorite } from '../store/recipesSlice';

const CookingSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [completionDialog, setCompletionDialog] = useState(false);
  const [missingIngredientDialog, setMissingIngredientDialog] = useState(false);
  const [missingIngredient, setMissingIngredient] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const recipe = useSelector((state: RootState) => 
    state.recipes.recipes.find(r => r.id === id)
  );
  const activeSession = useSelector((state: RootState) => state.cooking.activeSession);

  useEffect(() => {
    if (!recipe) {
      setError('Recipe not found or failed to load');
      setShowErrorAlert(true);
      setTimeout(() => navigate('/recipes'), 3000);
      return;
    }

    // Check if there's already an active session for a different recipe
    if (activeSession && activeSession.recipeId !== id) {
      try {
        dispatch(stopSession());
      } catch (err) {
        setError('Failed to stop previous cooking session');
        setShowErrorAlert(true);
      }
    }
  }, [recipe, activeSession, id, dispatch, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeSession && activeSession.status === 'running') {
      interval = setInterval(() => {
        try {
          setCurrentTime(Date.now());
          
          const stepElapsed = Date.now() - activeSession.stepStartTime;
          dispatch(updateStepProgress(stepElapsed));
          
          // Auto-advance when step time is complete
          const currentStep = recipe?.steps[activeSession.currentStepIndex];
          if (currentStep && stepElapsed >= currentStep.durationMinutes * 60 * 1000) {
            if (activeSession.currentStepIndex < recipe.steps.length - 1) {
              dispatch(nextStep());
              // Voice announcement for next step
              setTimeout(() => {
                try {
                  const nextStepData = recipe.steps[activeSession.currentStepIndex + 1];
                  if (nextStepData && 'speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(
                      `Step ${activeSession.currentStepIndex + 2}: ${nextStepData.description}`
                    );
                    utterance.rate = 0.8;
                    speechSynthesis.speak(utterance);
                  }
                } catch (err) {
                  console.warn('Voice synthesis failed:', err);
                }
              }, 500);
            } else {
              dispatch(stopSession());
              setCompletionDialog(true);
              // Voice announcement for completion
              setTimeout(() => {
                try {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance('Recipe completed! Great job!');
                    utterance.rate = 0.8;
                    speechSynthesis.speak(utterance);
                  }
                } catch (err) {
                  console.warn('Voice synthesis failed:', err);
                }
              }, 500);
            }
          }
        } catch (err) {
          setError('Timer error occurred during cooking session');
          setShowErrorAlert(true);
          dispatch(pauseSession());
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession, recipe, dispatch]);

  if (!recipe) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5">Recipe not found</Typography>
      </Container>
    );
  }

  const handleStart = () => {
    try {
      // Validate recipe has steps
      if (!recipe.steps || recipe.steps.length === 0) {
        setError('Recipe has no cooking steps defined');
        setShowErrorAlert(true);
        return;
      }

      // Check for missing ingredients
      const currentStep = recipe.steps[0];
      if (currentStep.type === 'instruction' && currentStep.ingredientIds) {
        const missingIngredients = currentStep.ingredientIds.filter(ingId => {
          const ingredient = recipe.ingredients.find(i => i.id === ingId);
          return !ingredient || !ingredient.name;
        });
        
        if (missingIngredients.length > 0) {
          const ingredient = recipe.ingredients.find(i => i.id === missingIngredients[0]);
          setMissingIngredient(ingredient?.name || 'Unknown ingredient');
          setMissingIngredientDialog(true);
          return;
        }
      }
      
      dispatch(startSession(recipe.id));
      // Voice announcement for first step
      setTimeout(() => {
        try {
          if ('speechSynthesis' in window) {
            const firstStep = recipe.steps[0];
            const utterance = new SpeechSynthesisUtterance(
              `Starting ${recipe.title}. Step 1: ${firstStep.description}`
            );
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
          }
        } catch (err) {
          console.warn('Voice synthesis failed:', err);
        }
      }, 500);
    } catch (err) {
      setError('Failed to start cooking session');
      setShowErrorAlert(true);
    }
  };

  const handlePause = () => {
    try {
      dispatch(pauseSession());
    } catch (err) {
      setError('Failed to pause cooking session');
      setShowErrorAlert(true);
    }
  };

  const handleResume = () => {
    try {
      dispatch(resumeSession());
    } catch (err) {
      setError('Failed to resume cooking session');
      setShowErrorAlert(true);
    }
  };

  const handleStop = () => {
    try {
      if (activeSession && activeSession.currentStepIndex < recipe.steps.length - 1) {
        dispatch(nextStep());
        // Voice announcement for next step
        setTimeout(() => {
          try {
            const nextStepData = recipe.steps[activeSession.currentStepIndex + 1];
            if (nextStepData && 'speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(
                `Step ${activeSession.currentStepIndex + 2}: ${nextStepData.description}`
              );
              utterance.rate = 0.8;
              speechSynthesis.speak(utterance);
            }
          } catch (err) {
            console.warn('Voice synthesis failed:', err);
          }
        }, 500);
      } else {
        dispatch(stopSession());
        setCompletionDialog(true);
        setTimeout(() => {
          try {
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance('Recipe completed!');
              utterance.rate = 0.8;
              speechSynthesis.speak(utterance);
            }
          } catch (err) {
            console.warn('Voice synthesis failed:', err);
          }
        }, 500);
      }
    } catch (err) {
      setError('Failed to advance cooking step');
      setShowErrorAlert(true);
    }
  };

  const getOverallProgress = () => {
    if (!activeSession) return 0;
    
    const completedSteps = activeSession.currentStepIndex;
    const currentStepProgress = activeSession.stepElapsedTime / (recipe.steps[activeSession.currentStepIndex]?.durationMinutes * 60 * 1000 || 1);
    
    return ((completedSteps + Math.min(currentStepProgress, 1)) / recipe.steps.length) * 100;
  };

  const getRemainingTime = () => {
    if (!activeSession) return recipe.totalTimeMinutes * 60;
    
    const completedTime = recipe.steps
      .slice(0, activeSession.currentStepIndex)
      .reduce((sum, step) => sum + step.durationMinutes * 60, 0);
    
    const currentStepRemaining = Math.max(0, 
      (recipe.steps[activeSession.currentStepIndex]?.durationMinutes * 60 || 0) - 
      (activeSession.stepElapsedTime / 1000)
    );
    
    const upcomingTime = recipe.steps
      .slice(activeSession.currentStepIndex + 1)
      .reduce((sum, step) => sum + step.durationMinutes * 60, 0);
    
    return currentStepRemaining + upcomingTime;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStep = activeSession ? recipe.steps[activeSession.currentStepIndex] : null;
  const stepProgress = activeSession && currentStep 
    ? Math.min((activeSession.stepElapsedTime / (currentStep.durationMinutes * 60 * 1000)) * 100, 100)
    : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigate('/recipes')}
              sx={{ 
                bgcolor: '#f3f4f6', 
                '&:hover': { bgcolor: '#e5e7eb' },
                mr: 1
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip label={recipe.difficulty} color="primary" size="small" />
                <Chip 
                  icon={<AccessTime />} 
                  label={`${recipe.totalTimeMinutes} min`} 
                  variant="outlined" 
                  size="small" 
                />
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={() => dispatch(toggleFavorite(recipe.id))}
            color="secondary"
          >
            {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </Paper>

      {/* Controls */}
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {!activeSession ? (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleStart}
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #10b981, #059669)',
                '&:hover': { background: 'linear-gradient(45deg, #059669, #047857)' },
                px: 4,
                py: 1.5
              }}
            >
              Start Session
            </Button>
          ) : (
            <>
              {activeSession.status === 'running' ? (
                <Button
                  variant="outlined"
                  startIcon={<Pause />}
                  onClick={handlePause}
                  size="large"
                  sx={{ px: 3, py: 1.5 }}
                >
                  Pause
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handleResume}
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                    '&:hover': { background: 'linear-gradient(45deg, #1d4ed8, #2563eb)' },
                    px: 3,
                    py: 1.5
                  }}
                >
                  Resume
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<Stop />}
                onClick={handleStop}
                size="large"
                color="error"
              >
                STOP
              </Button>
            </>
          )}
        </Box>
      </Paper>

      {/* Active Step Panel */}
      {activeSession && currentStep && (
        <Paper sx={{ 
          p: 3, 
          mb: 3,
          background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
          border: '1px solid #0288d120',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            Step {activeSession.currentStepIndex + 1} of {recipe.steps.length}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mr: 3 }}>
              <CircularProgress
                variant="determinate"
                value={stepProgress}
                size={80}
                thickness={6}
                sx={{
                  color: '#10b981',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <CircularProgress
                variant="determinate"
                value={100}
                size={80}
                thickness={6}
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
                <Typography variant="caption" component="div" color="text.secondary">
                  {Math.round(stepProgress)}%
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {currentStep.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={currentStep.type} 
                  color={currentStep.type === 'cooking' ? 'warning' : 'info'} 
                  size="small" 
                />
                <Chip 
                  label={`${currentStep.durationMinutes} min`} 
                  variant="outlined" 
                  size="small" 
                />
                
                {currentStep.type === 'cooking' && (
                  <>
                    <Chip label={`${currentStep.temperature}°C`} variant="outlined" size="small" />
                    <Chip label={`Speed ${currentStep.speed}`} variant="outlined" size="small" />
                  </>
                )}
                
                {currentStep.type === 'instruction' && currentStep.ingredientIds && (
                  <>
                    {currentStep.ingredientIds.map(ingId => {
                      const ingredient = recipe.ingredients.find(i => i.id === ingId);
                      return ingredient ? (
                        <Chip 
                          key={ingId} 
                          label={`${ingredient.name} (${ingredient.quantity}${ingredient.unit})`}
                          variant="outlined" 
                          size="small" 
                        />
                      ) : null;
                    })}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Timeline */}
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
        border: '1px solid #a855f720'
      }}>
        <Typography variant="h6" gutterBottom>Timeline</Typography>
        <Stepper activeStep={activeSession?.currentStepIndex ?? -1} orientation="vertical">
          {recipe.steps.map((step, index) => (
            <Step key={step.id}>
              <StepLabel>
                <Box>
                  <Typography variant="body2">
                    Step {index + 1}: {step.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.type} • {step.durationMinutes} min
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Overall Progress */}
      <Paper sx={{ 
        p: 3,
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
        border: '1px solid #10b98120'
      }}>
        <Typography variant="h6" gutterBottom>Overall Progress</Typography>
        <LinearProgress 
          variant="determinate" 
          value={getOverallProgress()} 
          sx={{ 
            height: 12, 
            borderRadius: 6, 
            mb: 2,
            background: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(45deg, #10b981, #059669)',
              borderRadius: 6
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            {Math.round(getOverallProgress())}% Complete
          </Typography>
          <Typography variant="body2">
            {formatTime(getRemainingTime())} remaining
          </Typography>
        </Box>
      </Paper>

      {/* Completion Dialog */}
      <Dialog 
        open={completionDialog} 
        onClose={() => setCompletionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <CheckCircle sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
            🎉 Food is Ready!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Congratulations! Your {recipe.title} is now ready to serve.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enjoy your delicious homemade meal! 🍽️
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => {
              setCompletionDialog(false);
              setShowSuccessAlert(true);
              navigate('/recipes');
            }}
            sx={{ 
              bgcolor: '#10b981', 
              '&:hover': { bgcolor: '#059669' },
              px: 4,
              py: 1
            }}
          >
            Back to Recipes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Missing Ingredient Dialog */}
      <Dialog 
        open={missingIngredientDialog} 
        onClose={() => setMissingIngredientDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Warning sx={{ fontSize: 50, color: '#f59e0b', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Missing Ingredient
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            "{missingIngredient}" is not available or missing.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Should I proceed without this item?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => {
              setMissingIngredientDialog(false);
              navigate('/recipes');
            }}
            sx={{ px: 3 }}
          >
            No, Go Back
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setMissingIngredientDialog(false);
              dispatch(startSession(recipe.id));
            }}
            sx={{ 
              bgcolor: '#10b981', 
              '&:hover': { bgcolor: '#059669' },
              px: 3
            }}
          >
            Yes, Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ width: '100%', fontSize: '1.1rem' }}
          onClose={() => setShowSuccessAlert(false)}
        >
          🎉 Recipe completed successfully! Great cooking!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={6000}
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          sx={{ width: '100%', fontSize: '1.1rem' }}
          onClose={() => setShowErrorAlert(false)}
        >
          ⚠️ {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CookingSession;