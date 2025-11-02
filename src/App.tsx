import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import RecipesList from './pages/RecipesList';
import RecipeBuilder from './pages/RecipeBuilder';
import EditRecipe from './pages/EditRecipe';
import CookingSession from './pages/CookingSession';
import Wishlist from './pages/Wishlist';
import MiniPlayer from './components/MiniPlayer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Inter, sans-serif' }}>
            <Routes>
              <Route path="/" element={<RecipesList />} />
              <Route path="/recipes" element={<RecipesList />} />
              <Route path="/create" element={<RecipeBuilder />} />
              <Route path="/edit/:id" element={<EditRecipe />} />
              <Route path="/cook/:id" element={<CookingSession />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <MiniPlayer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;