import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Box, IconButton, Chip, Snackbar, Alert, Grid, Card, CardContent,
  Divider, Stack, Avatar, Fab
} from '@mui/material';
import { Add, Delete, DragIndicator, Restaurant, Timer, LocalFireDepartment, ArrowBack } from '@mui/icons-material';
import { addRecipe } from '../store/recipesSlice';
import { Recipe, Ingredient, Step, Difficulty } from '../types';

const RecipeBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const addIngredient = () => {
    setIngredients([...ingredients, {
      id: Date.now().toString(),
      name: '',
      quantity: '',
      unit: ''
    }]);
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const addStep = () => {
    setSteps([...steps, {
      id: Date.now().toString(),
      description: '',
      type: 'instruction',
      durationMinutes: 1,
      ingredientIds: []
    }]);
  };

  const updateStep = (id: string, field: keyof Step, value: any) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < steps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const calculateDerivedFields = () => {
    const totalTimeMinutes = steps.reduce((sum, step) => sum + step.durationMinutes, 0);
    const totalIngredients = ingredients.length;
    const complexityScore = 
      (difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3) * 
      (steps.length + ingredients.length);
    
    return { totalTimeMinutes, totalIngredients, complexityScore };
  };

  const validateRecipe = () => {
    if (title.length < 3) return 'Title must be at least 3 characters';
    if (ingredients.length === 0) return 'At least 1 ingredient required';
    if (steps.length === 0) return 'At least 1 step required';
    
    for (const ing of ingredients) {
      if (!ing.name.trim()) return 'All ingredients must have a name';
      if (!ing.unit) return 'All ingredients must have a unit';
      if (!ing.quantity || Number(ing.quantity) <= 0) return 'Ingredient quantities must be > 0';
    }
    
    for (const step of steps) {
      if (!step.description.trim()) return 'All steps must have a description';
      if (step.durationMinutes <= 0) return 'Step duration must be > 0';
      if (step.type === 'cooking') {
        if (!step.temperature || step.temperature < 40 || step.temperature > 200) {
          return 'Cooking steps need temperature 40-200°C';
        }
        if (!step.speed || step.speed < 1 || step.speed > 5) {
          return 'Cooking steps need speed 1-5';
        }
      }
      if (step.type === 'instruction') {
        if (!step.ingredientIds || step.ingredientIds.length === 0) {
          return 'Instruction steps need at least 1 ingredient';
        }
      }
    }
    
    return null;
  };

  const saveRecipe = () => {
    const error = validateRecipe();
    if (error) {
      setSnackbar({ open: true, message: error });
      return;
    }

    const { totalTimeMinutes, totalIngredients, complexityScore } = calculateDerivedFields();
    
    const recipe: Recipe = {
      id: Date.now().toString(),
      title,
      difficulty,
      ingredients,
      steps,
      totalTimeMinutes,
      totalIngredients,
      complexityScore,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
    };

    dispatch(addRecipe(recipe));
    setSnackbar({ open: true, message: 'Recipe saved successfully!' });
    setTimeout(() => navigate('/recipes'), 1500);
  };

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ position: 'relative', textAlign: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => navigate('/recipes')}
            sx={{ 
              position: 'absolute',
              left: 0,
              top: 20,
              bgcolor: '#f3f4f6', 
              '&:hover': { bgcolor: '#e5e7eb' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Avatar sx={{ 
            width: 80, height: 80, 
            bgcolor: '#ff6b35', 
            mx: 'auto', 
            mb: 2,
            fontSize: '2rem'
          }}>
            <Restaurant fontSize="large" />
          </Avatar>
          <Typography variant="h3" sx={{ 
            fontWeight: 700,
            color: '#1e293b',
            mb: 1
          }}>Create New Recipe</Typography>
          <Typography variant="body1" color="text.secondary">
            Build your culinary masterpiece step by step
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Recipe Info */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Basic Info Card */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Recipe Details
                  </Typography>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Recipe Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      error={title.length > 0 && title.length < 3}
                      helperText={title.length > 0 && title.length < 3 ? 'Min 3 characters' : ''}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Difficulty Level</InputLabel>
                      <Select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="Easy">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                            Easy
                          </Box>
                        </MenuItem>
                        <MenuItem value="Medium">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                            Medium
                          </Box>
                        </MenuItem>
                        <MenuItem value="Hard">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                            Hard
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Button 
                      variant="contained" 
                      onClick={saveRecipe} 
                      size="large"
                      fullWidth
                      sx={{
                        bgcolor: '#10b981',
                        '&:hover': { bgcolor: '#059669' },
                        borderRadius: 2,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600
                      }}
                    >
                      Save Recipe
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => navigate('/recipes')} 
                      size="large"
                      fullWidth
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        borderColor: '#d1d5db',
                        color: '#6b7280'
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column - Ingredients & Steps */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>

              {/* Ingredients Section */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Restaurant color="primary" />
                      Ingredients ({ingredients.length})
                    </Typography>
                    <Fab 
                      size="small" 
                      onClick={addIngredient}
                      sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                    >
                      <Add />
                    </Fab>
                  </Box>
                  
                  {ingredients.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                      <Restaurant sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                      <Typography>No ingredients added yet</Typography>
                      <Typography variant="body2">Click the + button to add your first ingredient</Typography>
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      {ingredients.map((ingredient, index) => (
                        <Box key={ingredient.id} sx={{ 
                          p: 2, 
                          border: '2px solid #e5e7eb',
                          borderRadius: 2,
                          bgcolor: '#fefefe',
                          '&:hover': { borderColor: '#3b82f6', bgcolor: '#f8fafc' }
                        }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={1}>
                              <Typography variant="body2" sx={{ 
                                bgcolor: '#3b82f6', 
                                color: 'white', 
                                borderRadius: '50%', 
                                width: 24, 
                                height: 24, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 600
                              }}>
                                {index + 1}
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Ingredient"
                                value={ingredient.name}
                                onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                                placeholder="e.g. Tomatoes"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                fullWidth
                                size="small"
                                type="number"
                                label="Qty"
                                value={ingredient.quantity}
                                onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value ? Number(e.target.value) : '')}
                                placeholder="0"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Unit</InputLabel>
                                <Select
                                  value={ingredient.unit}
                                  onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                                  sx={{ borderRadius: 1.5 }}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value="pcs">pieces</MenuItem>
                                  <MenuItem value="g">grams</MenuItem>
                                  <MenuItem value="ml">ml</MenuItem>
                                  <MenuItem value="tsp">tsp</MenuItem>
                                  <MenuItem value="tbsp">tbsp</MenuItem>
                                  <MenuItem value="cup">cup</MenuItem>
                                  <MenuItem value="kg">kg</MenuItem>
                                  <MenuItem value="l">liter</MenuItem>
                                  <MenuItem value="pinch">pinch</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}>
                              <IconButton 
                                onClick={() => removeIngredient(ingredient.id)} 
                                size="small"
                                sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>

              {/* Steps Section */}
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Timer color="primary" />
                      Cooking Steps ({steps.length})
                    </Typography>
                    <Fab 
                      size="small" 
                      onClick={addStep}
                      sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
                    >
                      <Add />
                    </Fab>
                  </Box>
                  
                  {steps.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                      <Timer sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                      <Typography>No steps added yet</Typography>
                      <Typography variant="body2">Click the + button to add your first cooking step</Typography>
                    </Box>
                  ) : (
                    <Stack spacing={3}>
                      {steps.map((step, index) => (
                        <Card key={step.id} sx={{ 
                          border: step.type === 'cooking' ? '2px solid #f59e0b' : '2px solid #3b82f6',
                          borderRadius: 2,
                          bgcolor: step.type === 'cooking' ? '#fffbeb' : '#eff6ff'
                        }}>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ 
                                  bgcolor: step.type === 'cooking' ? '#f59e0b' : '#3b82f6',
                                  width: 32, height: 32,
                                  fontSize: '0.9rem'
                                }}>
                                  {step.type === 'cooking' ? <LocalFireDepartment /> : index + 1}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  Step {index + 1}
                                </Typography>
                                <Chip 
                                  label={step.type === 'cooking' ? 'Cooking' : 'Instruction'}
                                  size="small"
                                  sx={{ 
                                    bgcolor: step.type === 'cooking' ? '#f59e0b' : '#3b82f6',
                                    color: 'white',
                                    fontWeight: 600
                                  }}
                                />
                              </Box>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" sx={{ color: '#6b7280' }}>
                                  <DragIndicator />
                                </IconButton>
                                <IconButton 
                                  onClick={() => removeStep(step.id)} 
                                  size="small"
                                  sx={{ color: '#ef4444' }}
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </Box>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  label="Step Description"
                                  value={step.description}
                                  onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                                  placeholder="Describe what to do in this step..."
                                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                              </Grid>
                              
                              <Grid item xs={6} md={3}>
                                <FormControl fullWidth>
                                  <InputLabel>Step Type</InputLabel>
                                  <Select
                                    value={step.type}
                                    onChange={(e) => updateStep(step.id, 'type', e.target.value)}
                                    sx={{ borderRadius: 2 }}
                                  >
                                    <MenuItem value="instruction">Instruction</MenuItem>
                                    <MenuItem value="cooking">Cooking</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              
                              <Grid item xs={6} md={3}>
                                <TextField
                                  fullWidth
                                  type="number"
                                  label="Duration (min)"
                                  value={step.durationMinutes}
                                  onChange={(e) => updateStep(step.id, 'durationMinutes', Number(e.target.value))}
                                  inputProps={{ min: 1 }}
                                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                              </Grid>
                              
                              {step.type === 'cooking' && (
                                <>
                                  <Grid item xs={6} md={3}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      label="Temperature (°C)"
                                      value={step.temperature || ''}
                                      onChange={(e) => updateStep(step.id, 'temperature', Number(e.target.value))}
                                      inputProps={{ min: 40, max: 200 }}
                                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      label="Speed (1-5)"
                                      value={step.speed || ''}
                                      onChange={(e) => updateStep(step.id, 'speed', Number(e.target.value))}
                                      inputProps={{ min: 1, max: 5 }}
                                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                  </Grid>
                                </>
                              )}
                              
                              {step.type === 'instruction' && (
                                <Grid item xs={12}>
                                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Required Ingredients:</Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {ingredients.map((ing) => (
                                      <Chip
                                        key={ing.id}
                                        label={ing.name || 'Unnamed'}
                                        variant={step.ingredientIds?.includes(ing.id) ? 'filled' : 'outlined'}
                                        onClick={() => {
                                          const current = step.ingredientIds || [];
                                          const updated = current.includes(ing.id)
                                            ? current.filter(id => id !== ing.id)
                                            : [...current, ing.id];
                                          updateStep(step.id, 'ingredientIds', updated);
                                        }}
                                        sx={{ 
                                          '&:hover': { transform: 'scale(1.05)' },
                                          cursor: 'pointer'
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Grid>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.message.includes('success') ? 'success' : 'error'}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecipeBuilder;