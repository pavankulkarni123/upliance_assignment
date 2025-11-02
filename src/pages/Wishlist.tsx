import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Card, CardContent, CardActions, Button, Chip, Box,
  IconButton, Paper, Avatar
} from '@mui/material';
import { Favorite, AccessTime, ArrowBack, Restaurant } from '@mui/icons-material';
import { RootState } from '../store';
import { toggleFavorite } from '../store/recipesSlice';
import { Recipe } from '../types';

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes } = useSelector((state: RootState) => state.recipes);
  
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fef2f2 0%, #fce7e7 100%)' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigate('/recipes')}
              sx={{ 
                bgcolor: '#f3f4f6', 
                '&:hover': { bgcolor: '#e5e7eb' }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Avatar sx={{ bgcolor: '#ef4444', width: 56, height: 56 }}>
              <Favorite fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#1f2937', mb: 0.5 }}>
                My Wishlist
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#6b7280' }}>
                Your favorite recipes collection ({favoriteRecipes.length})
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Wishlist Content */}
        {favoriteRecipes.length === 0 ? (
          <Paper elevation={0} sx={{ 
            textAlign: 'center', 
            py: 8,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            <Favorite sx={{ fontSize: 80, color: '#ef4444', mb: 3, opacity: 0.3 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#374151' }}>
              No favorites yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Start adding recipes to your wishlist by clicking the heart icon!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Restaurant />}
              onClick={() => navigate('/recipes')}
              size="large"
              sx={{ 
                borderRadius: 3,
                px: 4,
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                '&:hover': { background: 'linear-gradient(45deg, #dc2626, #b91c1c)' }
              }}
            >
              Browse Recipes
            </Button>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ 
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 3 }}>
                {favoriteRecipes.map((recipe: Recipe) => (
                  <Card key={recipe.id} sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid #fecaca',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(239, 68, 68, 0.2)',
                      borderColor: '#ef4444'
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
                          sx={{ color: '#ef4444' }}
                        >
                          <Favorite />
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
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: 'none'
                          }}
                        />
                        <Chip
                          label={`${recipe.totalIngredients} ingredients`}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: '#fecaca', color: '#ef4444' }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {recipe.steps.length} steps • Complexity: {recipe.complexityScore}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/cook/${recipe.id}`)}
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                          '&:hover': { background: 'linear-gradient(45deg, #dc2626, #b91c1c)' }
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
      </Container>
    </Box>
  );
};

export default Wishlist;