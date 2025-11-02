import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem,
  Button, Box, IconButton, Chip, Snackbar, Alert, Grid, Card, CardContent
} from '@mui/material';
import { Add, Delete, ArrowUpward, ArrowDownward, ArrowBack } from '@mui/icons-material';
import { updateRecipe } from '../store/recipesSlice';
import { Recipe, Ingredient, Step, Difficulty } from '../types';
import { RootState } from '../store';

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state: RootState) => 
    state.recipes.recipes.find(r => r.id === id)
  );

  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDifficulty(recipe.difficulty);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
    } else {
      navigate('/recipes');
    }
  }, [recipe, navigate]);

  const addIngredient = () => {
    setIngredients([...ingredients, {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: 'g'
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
      if (ing.quantity <= 0) return 'Ingredient quantities must be > 0';
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
    
    const updatedRecipe: Recipe = {
      ...recipe!,
      title,
      difficulty,
      ingredients,
      steps,
      totalTimeMinutes,
      totalIngredients,
      complexityScore,
      image: recipe!.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
    };

    dispatch(updateRecipe(updatedRecipe));
    setSnackbar({ open: true, message: 'Recipe updated successfully!' });
    setTimeout(() => navigate('/recipes'), 1500);
  };

  if (!recipe) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: 4, 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton 
            onClick={() => navigate('/recipes')}
            sx={{ 
              bgcolor: '#f3f4f6', 
              '&:hover': { bgcolor: '#e5e7eb' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #2563eb, #7c3aed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}>Edit Recipe</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Recipe Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={title.length > 0 && title.length < 3}
              helperText={title.length > 0 && title.length < 3 ? 'Min 3 characters' : ''}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ingredients
            <Button startIcon={<Add />} onClick={addIngredient} sx={{ ml: 2 }}>
              Add Ingredient
            </Button>
          </Typography>
          
          {ingredients.map((ingredient) => (
            <Card key={ingredient.id} sx={{ 
              mb: 2,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              border: '1px solid #f59e0b20'
            }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => updateIngredient(ingredient.id, 'quantity', Number(e.target.value))}
                      inputProps={{ min: 0, step: 1 }}
                      placeholder="e.g. 400"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                      >
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
                        <MenuItem value="pcs">pcs</MenuItem>
                        <MenuItem value="tsp">tsp</MenuItem>
                        <MenuItem value="tbsp">tbsp</MenuItem>
                        <MenuItem value="cup">cup</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <IconButton onClick={() => removeIngredient(ingredient.id)} color="error">
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Steps
            <Button startIcon={<Add />} onClick={addStep} sx={{ ml: 2 }}>
              Add Step
            </Button>
          </Typography>
          
          {steps.map((step, index) => (
            <Card key={step.id} sx={{ 
              mb: 2,
              background: step.type === 'cooking' 
                ? 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)'
                : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              border: step.type === 'cooking' 
                ? '1px solid #ef444420'
                : '1px solid #3b82f620'
            }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography variant="subtitle1">Step {index + 1}</Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => moveStep(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => moveStep(index, 'down')}
                        disabled={index === steps.length - 1}
                      >
                        <ArrowDownward />
                      </IconButton>
                      <IconButton onClick={() => removeStep(step.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      value={step.description}
                      onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={step.type}
                        onChange={(e) => updateStep(step.id, 'type', e.target.value)}
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
                        />
                      </Grid>
                    </>
                  )}
                  
                  {step.type === 'instruction' && (
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>Required Ingredients:</Typography>
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
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={saveRecipe} 
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #10b981, #059669)',
              '&:hover': { background: 'linear-gradient(45deg, #059669, #047857)' },
              px: 4,
              py: 1.5
            }}
          >
            Update Recipe
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/recipes')} 
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.message.includes('success') ? 'success' : 'error'}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditRecipe;