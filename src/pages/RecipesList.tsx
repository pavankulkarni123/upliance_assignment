import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Card, CardContent, CardActions, Button, Chip, Box,
  FormControl, InputLabel, Select, MenuItem, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Paper, Avatar
} from '@mui/material';
import { Favorite, FavoriteBorder, Add, AccessTime, Delete, Edit, Restaurant, LocalDining, FavoriteOutlined } from '@mui/icons-material';
import { RootState } from '../store';
import { toggleFavorite, setDifficultyFilter, setSortOrder, deleteRecipe } from '../store/recipesSlice';
import { Recipe } from '../types';

const RecipesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes, filters } = useSelector((state: RootState) => state.recipes);
  const [deleteDialog, setDeleteDialog] = React.useState<{ open: boolean; recipeId: string; recipeName: string }>({ open: false, recipeId: '', recipeName: '' });

  // Separate preloaded and user-created recipes
  const preloadedRecipeIds = [
    'maggi-1', 'maggi-simple-1', 'scrambled-eggs-1', 'omelette-1', 'toast-1', 'pasta-1', 
    'sandwich-1', 'smoothie-1', 'coffee-1', 'salad-1', 'poha-1', 'upma-1', 'dosa-1', 
    'paratha-1', 'dal-1', 'roti-1', 'biryani-1', 'pizza-1', 'cake-1', 'instant-noodles-1'
  ];
  
  const preloadedRecipes = recipes.filter(recipe => preloadedRecipeIds.includes(recipe.id));
  const userRecipes = recipes.filter(recipe => !preloadedRecipeIds.includes(recipe.id));
  
  const filteredPreloaded = preloadedRecipes
    .filter(recipe => 
      filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty)
    )
    .sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      return (a.totalTimeMinutes - b.totalTimeMinutes) * multiplier;
    });
    
  const filteredUserRecipes = userRecipes
    .filter(recipe => 
      filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty)
    )
    .sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      return (a.totalTimeMinutes - b.totalTimeMinutes) * multiplier;
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleDeleteClick = (recipeId: string, recipeName: string) => {
    setDeleteDialog({ open: true, recipeId, recipeName });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteRecipe(deleteDialog.recipeId));
    setDeleteDialog({ open: false, recipeId: '', recipeName: '' });
  };

  const handleEditClick = (recipeId: string) => {
    navigate(`/edit/${recipeId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative' }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#667eea', width: 56, height: 56 }}>
                <Restaurant fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#1f2937', mb: 0.5 }}>
                  Recipe Hub
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#6b7280' }}>
                  Discover & Create Amazing Dishes
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FavoriteOutlined />}
                onClick={() => navigate('/wishlist')}
                size="large"
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  borderColor: '#ef4444',
                  color: '#ef4444',
                  '&:hover': { 
                    bgcolor: '#fef2f2',
                    borderColor: '#dc2626'
                  }
                }}
              >
                Wishlist
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/create')}
                size="large"
                sx={{ 
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  '&:hover': { 
                    background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Create Recipe
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Filters */}
        <Paper elevation={0} sx={{ 
          mb: 4,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalDining /> Filters & Sorting
            </Typography>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3
            }}>
              <FormControl fullWidth>
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                  value={filters.difficulty.length > 0 ? filters.difficulty[0] : ''}
                  onChange={(e) => dispatch(setDifficultyFilter(e.target.value ? [e.target.value as string] : []))}
                  label="Difficulty Level"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="Easy">🟢 Easy</MenuItem>
                  <MenuItem value="Medium">🟡 Medium</MenuItem>
                  <MenuItem value="Hard">🔴 Hard</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Sort by Time</InputLabel>
                <Select
                  value={filters.sortOrder}
                  onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
                  label="Sort by Time"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="asc">⚡ Quick First</MenuItem>
                  <MenuItem value="desc">🕐 Long First</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>

        {/* User Recipes Section - Only show when no difficulty filter */}
        {userRecipes.length > 0 && filters.difficulty.length === 0 && (
          <Paper elevation={0} sx={{ 
            mb: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
                👨‍🍳 Your Recipes ({userRecipes.length})
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 3 }}>
                {filteredUserRecipes.map((recipe: Recipe) => (
                  <Card key={recipe.id} sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    border: '2px solid #f59e0b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)'
                    }
                  }}>
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${recipe.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ 
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        p: 0.5
                      }}>
                        <IconButton
                          onClick={() => dispatch(toggleFavorite(recipe.id))}
                          size="small"
                          sx={{ color: recipe.isFavorite ? '#ef4444' : '#6b7280' }}
                        >
                          {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: getDifficultyColor(recipe.difficulty),
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {recipe.difficulty}
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1f2937' }}>
                        {recipe.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          icon={<AccessTime />}
                          label={`${recipe.totalTimeMinutes} min`}
                          size="small"
                          sx={{ 
                            background: 'rgba(245, 158, 11, 0.2)',
                            color: '#f59e0b',
                            border: 'none'
                          }}
                        />
                        <Chip
                          label={`${recipe.totalIngredients} ingredients`}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: '#f59e0b', color: '#f59e0b' }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {recipe.steps.length} steps • Complexity: {recipe.complexityScore}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/cook/${recipe.id}`)}
                        sx={{
                          flexGrow: 1,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #10b981, #059669)',
                          '&:hover': { background: 'linear-gradient(45deg, #059669, #047857)' }
                        }}
                      >
                        Start Cooking
                      </Button>
                      <IconButton
                        onClick={() => handleEditClick(recipe.id)}
                        sx={{ 
                          color: '#f59e0b',
                          '&:hover': { background: 'rgba(245, 158, 11, 0.1)' }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(recipe.id, recipe.title)}
                        sx={{ 
                          color: '#ef4444',
                          '&:hover': { background: 'rgba(239, 68, 68, 0.1)' }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Box>
          </Paper>
        )}

        {/* Recipe Content */}
        {filters.difficulty.length === 0 ? (
          <Paper elevation={0} sx={{ 
            textAlign: 'center', 
            py: 8,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea, #764ba2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              <Restaurant sx={{ fontSize: 60, color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 800, color: '#1f2937' }}>
              Select a difficulty level to view recipes
            </Typography>
            <Typography variant="h6" sx={{ color: '#6b7280', mb: 4, fontWeight: 400 }}>
              Choose Easy, Medium, or Hard from the filters above to discover amazing recipes!
            </Typography>
          </Paper>
        ) : filteredPreloaded.length === 0 ? (
          <Paper elevation={0} sx={{ 
            textAlign: 'center', 
            py: 8,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
              No recipes found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {recipes.length === 0 
                ? "Start your culinary journey by creating your first recipe!"
                : "Try adjusting your filters to find more recipes."
              }
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/create')}
              size="large"
              sx={{ 
                borderRadius: 3,
                px: 4,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                '&:hover': { background: 'linear-gradient(45deg, #5a67d8, #6b46c1)' }
              }}
            >
              Create Recipe
            </Button>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ 
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#374151', display: 'flex', alignItems: 'center', gap: 1 }}>
                🍳 Recipe Collection ({filteredPreloaded.length})
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 3 }}>
                {filteredPreloaded.map((recipe: Recipe) => (
                  <Card key={recipe.id} sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(102, 126, 234, 0.3)'
                    }
                  }}>
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${recipe.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ 
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        p: 0.5
                      }}>
                        <IconButton
                          onClick={() => dispatch(toggleFavorite(recipe.id))}
                          size="small"
                          sx={{ color: recipe.isFavorite ? '#ef4444' : '#6b7280' }}
                        >
                          {recipe.isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                      </Box>
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: getDifficultyColor(recipe.difficulty),
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {recipe.difficulty}
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1f2937' }}>
                        {recipe.title}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          icon={<AccessTime />}
                          label={`${recipe.totalTimeMinutes} min`}
                          size="small"
                          sx={{ 
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            border: 'none'
                          }}
                        />
                        <Chip
                          label={`${recipe.totalIngredients} ingredients`}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: '#e5e7eb' }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {recipe.steps.length} steps • Complexity: {recipe.complexityScore}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/cook/${recipe.id}`)}
                        sx={{
                          flexGrow: 1,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #10b981, #059669)',
                          '&:hover': { background: 'linear-gradient(45deg, #059669, #047857)' }
                        }}
                      >
                        Start Cooking
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Box>
          </Paper>
        )}
        
        <Dialog 
          open={deleteDialog.open} 
          onClose={() => setDeleteDialog({ open: false, recipeId: '', recipeName: '' })}
          PaperProps={{ sx: { borderRadius: 3 } }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Delete Recipe</DialogTitle>
          <DialogContent>
            Are you sure you want to delete "{deleteDialog.recipeName}"? This action cannot be undone.
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setDeleteDialog({ open: false, recipeId: '', recipeName: '' })}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default RecipesList;