import { Recipe } from '../types';

export const preloadedRecipes: Recipe[] = [
  {
    id: 'instant-noodles-1',
    title: 'Instant Noodles',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=200&fit=crop',
    ingredients: [
      { id: 'noodles-pack', name: 'Instant Noodles Pack', quantity: 1, unit: 'pcs' },
      { id: 'noodles-water', name: 'Water', quantity: 250, unit: 'ml' }
    ],
    steps: [
      {
        id: 'noodles-step1',
        description: 'Boil water and add noodles with seasoning',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 100,
        speed: 3
      }
    ],
    totalTimeMinutes: 3,
    totalIngredients: 2,
    complexityScore: 5,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'maggi-1',
    title: 'Quick Masala Maggi',
    difficulty: 'Easy',
    image: 'https://vegecravings.com/wp-content/uploads/2020/01/Street-Style-Maggi-Recipe-Step-By-Step-Instructions-10-scaled.jpg',
    ingredients: [
      { id: 'maggi-noodles', name: 'Maggi Noodles', quantity: 1, unit: 'pcs' },
      { id: 'maggi-water', name: 'Water', quantity: 150, unit: 'ml' },
      { id: 'maggi-masala', name: 'Masala Packet', quantity: 1, unit: 'pcs' },
      { id: 'maggi-onion', name: 'Onion', quantity: 1, unit: 'pcs' }
    ],
    steps: [
      {
        id: 'maggi-step1',
        description: 'Chop onion finely',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['maggi-onion']
      },
      {
        id: 'maggi-step2',
        description: 'Boil water with noodles and masala',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 100,
        speed: 4
      }
    ],
    totalTimeMinutes: 3,
    totalIngredients: 4,
    complexityScore: 8,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'maggi-simple-1',
    title: 'Maggi',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop',
    ingredients: [
      { id: 'maggi-pack', name: 'Maggi Pack', quantity: 1, unit: 'pcs' },
      { id: 'maggi-water-simple', name: 'Water', quantity: 200, unit: 'ml' }
    ],
    steps: [
      {
        id: 'maggi-simple-step1',
        description: 'Boil water and add maggi with masala',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 100,
        speed: 3
      }
    ],
    totalTimeMinutes: 3,
    totalIngredients: 2,
    complexityScore: 6,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'omelette-1',
    title: 'Simple Omelette',
    difficulty: 'Easy',
    image: 'https://www.australianeggs.org.au/assets/recipes/omelettes-22.jpg',
    ingredients: [
      { id: 'egg-1', name: 'Eggs', quantity: 2, unit: 'pcs' },
      { id: 'egg-salt', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: 'egg-oil', name: 'Oil', quantity: 1, unit: 'tbsp' },
      { id: 'egg-onion', name: 'Onion', quantity: 1, unit: 'pcs' }
    ],
    steps: [
      {
        id: 'egg-step1',
        description: 'Beat eggs with salt',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['egg-1', 'egg-salt']
      },
      {
        id: 'egg-step2',
        description: 'Chop onion finely',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['egg-onion']
      },
      {
        id: 'egg-step3',
        description: 'Heat oil in pan',
        type: 'cooking',
        durationMinutes: 1,
        temperature: 120,
        speed: 2
      },
      {
        id: 'egg-step4',
        description: 'Pour egg mixture and cook',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 80,
        speed: 1
      }
    ],
    totalTimeMinutes: 6,
    totalIngredients: 4,
    complexityScore: 12,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'toast-1',
    title: 'Butter Toast',
    difficulty: 'Easy',
    image: 'https://enjoyinfourseason.com/wp-content/uploads/2022/05/Fourseason-BUTTER-TOAST.jpg',
    ingredients: [
      { id: 'toast-bread', name: 'Bread Slices', quantity: 2, unit: 'pcs' },
      { id: 'toast-butter', name: 'Butter', quantity: 2, unit: 'tbsp' }
    ],
    steps: [
      {
        id: 'toast-step1',
        description: 'Apply butter on bread',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['toast-bread', 'toast-butter']
      },
      {
        id: 'toast-step2',
        description: 'Toast bread until golden',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 150,
        speed: 2
      }
    ],
    totalTimeMinutes: 4,
    totalIngredients: 2,
    complexityScore: 6,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'pasta-1',
    title: 'Garlic Pasta',
    difficulty: 'Medium',
    image: 'https://www.allrecipes.com/thmb/QiGptPjQB5mqSXGVxE4sLPMJs_4%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/AR-269500-creamy-garlic-pasta-Beauties-2x1-bcd9cb83138849e4b17104a1cd51d063.jpg',
    ingredients: [
      { id: 'pasta-noodles', name: 'Pasta', quantity: 200, unit: 'g' },
      { id: 'pasta-garlic', name: 'Garlic', quantity: 4, unit: 'pcs' },
      { id: 'pasta-oil', name: 'Olive Oil', quantity: 3, unit: 'tbsp' },
      { id: 'pasta-salt', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: 'pasta-cheese', name: 'Parmesan', quantity: 50, unit: 'g' }
    ],
    steps: [
      {
        id: 'pasta-step1',
        description: 'Boil pasta with salt',
        type: 'cooking',
        durationMinutes: 8,
        temperature: 100,
        speed: 3
      },
      {
        id: 'pasta-step2',
        description: 'Mince garlic cloves',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['pasta-garlic']
      },
      {
        id: 'pasta-step3',
        description: 'Heat oil and sauté garlic',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 80,
        speed: 2
      },
      {
        id: 'pasta-step4',
        description: 'Mix pasta with garlic oil and cheese',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['pasta-noodles', 'pasta-cheese']
      }
    ],
    totalTimeMinutes: 14,
    totalIngredients: 5,
    complexityScore: 20,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sandwich-1',
    title: 'Grilled Cheese Sandwich',
    difficulty: 'Easy',
    image: 'https://www.allrecipes.com/thmb/pnEUcAXDg5GUJ77fUDzZp41NWkE%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/AR-238891-Grilled-Cheese-Sandwich-beauty-4x3-362f705972e64a948b7ec547f7b2a831.jpg',
    ingredients: [
      { id: 'sand-bread', name: 'Bread Slices', quantity: 2, unit: 'pcs' },
      { id: 'sand-cheese', name: 'Cheese Slice', quantity: 2, unit: 'pcs' },
      { id: 'sand-butter', name: 'Butter', quantity: 1, unit: 'tbsp' }
    ],
    steps: [
      {
        id: 'sand-step1',
        description: 'Place cheese between bread slices',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['sand-bread', 'sand-cheese']
      },
      {
        id: 'sand-step2',
        description: 'Apply butter on outside',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['sand-butter']
      },
      {
        id: 'sand-step3',
        description: 'Grill sandwich until golden',
        type: 'cooking',
        durationMinutes: 4,
        temperature: 120,
        speed: 2
      }
    ],
    totalTimeMinutes: 6,
    totalIngredients: 3,
    complexityScore: 9,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'smoothie-1',
    title: 'Banana Smoothie',
    difficulty: 'Easy',
    image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/06/Banana-Smoothie-5.jpg',
    ingredients: [
      { id: 'smooth-banana', name: 'Banana', quantity: 2, unit: 'pcs' },
      { id: 'smooth-milk', name: 'Milk', quantity: 200, unit: 'ml' },
      { id: 'smooth-honey', name: 'Honey', quantity: 1, unit: 'tbsp' },
      { id: 'smooth-ice', name: 'Ice Cubes', quantity: 4, unit: 'pcs' }
    ],
    steps: [
      {
        id: 'smooth-step1',
        description: 'Peel and slice bananas',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['smooth-banana']
      },
      {
        id: 'smooth-step2',
        description: 'Blend all ingredients until smooth',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 50,
        speed: 5
      }
    ],
    totalTimeMinutes: 3,
    totalIngredients: 4,
    complexityScore: 8,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'coffee-1',
    title: 'Instant Coffee',
    difficulty: 'Easy',
    image: 'https://assets.epicurious.com/photos/5dc5e2b1eb95990008987b67/1%3A1/w_2696%2Ch_2696%2Cc_limit/InstantCoffee_HERO_103019_5361.jpg',
    ingredients: [
      { id: 'coffee-powder', name: 'Coffee Powder', quantity: 2, unit: 'tsp' },
      { id: 'coffee-sugar', name: 'Sugar', quantity: 2, unit: 'tsp' },
      { id: 'coffee-milk', name: 'Hot Milk', quantity: 200, unit: 'ml' }
    ],
    steps: [
      {
        id: 'coffee-step1',
        description: 'Mix coffee powder and sugar',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['coffee-powder', 'coffee-sugar']
      },
      {
        id: 'coffee-step2',
        description: 'Add hot milk and stir well',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['coffee-milk']
      }
    ],
    totalTimeMinutes: 2,
    totalIngredients: 3,
    complexityScore: 6,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'salad-1',
    title: 'Quick Garden Salad',
    difficulty: 'Easy',
    image: 'https://www.recipetineats.com/uploads/2021/08/Garden-Salad_47.jpg',
    ingredients: [
      { id: 'salad-lettuce', name: 'Lettuce', quantity: 100, unit: 'g' },
      { id: 'salad-tomato', name: 'Tomato', quantity: 1, unit: 'pcs' },
      { id: 'salad-cucumber', name: 'Cucumber', quantity: 1, unit: 'pcs' },
      { id: 'salad-oil', name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      { id: 'salad-salt', name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'salad-step1',
        description: 'Wash and chop lettuce',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['salad-lettuce']
      },
      {
        id: 'salad-step2',
        description: 'Dice tomato and cucumber',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['salad-tomato', 'salad-cucumber']
      },
      {
        id: 'salad-step3',
        description: 'Mix vegetables with oil and salt',
        type: 'instruction',
        durationMinutes: 1,
        ingredientIds: ['salad-oil', 'salad-salt']
      }
    ],
    totalTimeMinutes: 5,
    totalIngredients: 5,
    complexityScore: 10,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },

  {
    id: 'poha-1',
    title: 'Poha',
    difficulty: 'Easy',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/01/poha-500x500.jpg',
    ingredients: [
      { id: 'poha-flakes', name: 'Poha Flakes', quantity: 200, unit: 'g' },
      { id: 'poha-onion', name: 'Onion', quantity: 1, unit: 'pcs' },
      { id: 'poha-oil', name: 'Oil', quantity: 2, unit: 'tbsp' },
      { id: 'poha-turmeric', name: 'Turmeric', quantity: 1, unit: 'tsp' },
      { id: 'poha-salt', name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'poha-step1',
        description: 'Wash and soak poha for 2 minutes',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['poha-flakes']
      },
      {
        id: 'poha-step2',
        description: 'Chop onions finely',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['poha-onion']
      },
      {
        id: 'poha-step3',
        description: 'Heat oil and sauté onions',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 120,
        speed: 3
      },
      {
        id: 'poha-step4',
        description: 'Add turmeric, salt and poha, mix well',
        type: 'instruction',
        durationMinutes: 3,
        ingredientIds: ['poha-turmeric', 'poha-salt', 'poha-flakes']
      }
    ],
    totalTimeMinutes: 10,
    totalIngredients: 5,
    complexityScore: 15,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'upma-1',
    title: 'Rava Upma',
    difficulty: 'Easy',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/upma-recipe.jpg',
    ingredients: [
      { id: 'upma-rava', name: 'Rava/Semolina', quantity: 150, unit: 'g' },
      { id: 'upma-water', name: 'Water', quantity: 300, unit: 'ml' },
      { id: 'upma-onion', name: 'Onion', quantity: 1, unit: 'pcs' },
      { id: 'upma-oil', name: 'Oil', quantity: 2, unit: 'tbsp' },
      { id: 'upma-salt', name: 'Salt', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'upma-step1',
        description: 'Dry roast rava until aromatic',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 100,
        speed: 2
      },
      {
        id: 'upma-step2',
        description: 'Chop onions and boil water with salt',
        type: 'instruction',
        durationMinutes: 3,
        ingredientIds: ['upma-onion', 'upma-water', 'upma-salt']
      },
      {
        id: 'upma-step3',
        description: 'Heat oil, sauté onions',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 120,
        speed: 3
      },
      {
        id: 'upma-step4',
        description: 'Add rava to boiling water, stir continuously',
        type: 'cooking',
        durationMinutes: 5,
        temperature: 80,
        speed: 4
      }
    ],
    totalTimeMinutes: 13,
    totalIngredients: 5,
    complexityScore: 20,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dosa-1',
    title: 'Instant Dosa',
    difficulty: 'Medium',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/05/rava-dosa-recipe.jpg',
    ingredients: [
      { id: 'dosa-batter', name: 'Dosa Batter', quantity: 200, unit: 'ml' },
      { id: 'dosa-oil', name: 'Oil', quantity: 2, unit: 'tbsp' },
      { id: 'dosa-potato', name: 'Boiled Potato', quantity: 2, unit: 'pcs' },
      { id: 'dosa-onion', name: 'Onion', quantity: 1, unit: 'pcs' }
    ],
    steps: [
      {
        id: 'dosa-step1',
        description: 'Mash potatoes and chop onions',
        type: 'instruction',
        durationMinutes: 3,
        ingredientIds: ['dosa-potato', 'dosa-onion']
      },
      {
        id: 'dosa-step2',
        description: 'Heat pan and spread batter thin',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 150,
        speed: 2
      },
      {
        id: 'dosa-step3',
        description: 'Add filling and fold dosa',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['dosa-potato', 'dosa-onion']
      },
      {
        id: 'dosa-step4',
        description: 'Cook until golden and crispy',
        type: 'cooking',
        durationMinutes: 3,
        temperature: 140,
        speed: 1
      }
    ],
    totalTimeMinutes: 10,
    totalIngredients: 4,
    complexityScore: 16,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'paratha-1',
    title: 'Aloo Paratha',
    difficulty: 'Medium',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArlckgC1fBe7iBZVZQw7oV2MsPeEED53z5g&s',
    ingredients: [
      { id: 'paratha-flour', name: 'Wheat Flour', quantity: 200, unit: 'g' },
      { id: 'paratha-potato', name: 'Boiled Potato', quantity: 3, unit: 'pcs' },
      { id: 'paratha-oil', name: 'Oil', quantity: 3, unit: 'tbsp' },
      { id: 'paratha-salt', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: 'paratha-spices', name: 'Spice Powder', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'paratha-step1',
        description: 'Make dough with flour and water',
        type: 'instruction',
        durationMinutes: 5,
        ingredientIds: ['paratha-flour']
      },
      {
        id: 'paratha-step2',
        description: 'Mash potatoes with salt and spices',
        type: 'instruction',
        durationMinutes: 3,
        ingredientIds: ['paratha-potato', 'paratha-salt', 'paratha-spices']
      },
      {
        id: 'paratha-step3',
        description: 'Roll dough, add filling, seal edges',
        type: 'instruction',
        durationMinutes: 4,
        ingredientIds: ['paratha-flour', 'paratha-potato']
      },
      {
        id: 'paratha-step4',
        description: 'Cook on hot tawa with oil until golden',
        type: 'cooking',
        durationMinutes: 6,
        temperature: 160,
        speed: 2
      }
    ],
    totalTimeMinutes: 18,
    totalIngredients: 5,
    complexityScore: 24,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'dal-1',
    title: 'Simple Dal',
    difficulty: 'Easy',
    image: 'https://www.whiskaffair.com/wp-content/uploads/2020/04/North-Indian-Homestyle-Toor-Dal-2-3.jpg',
    ingredients: [
      { id: 'dal-lentils', name: 'Toor Dal', quantity: 150, unit: 'g' },
      { id: 'dal-water', name: 'Water', quantity: 400, unit: 'ml' },
      { id: 'dal-turmeric', name: 'Turmeric', quantity: 1, unit: 'tsp' },
      { id: 'dal-salt', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: 'dal-oil', name: 'Oil', quantity: 1, unit: 'tbsp' }
    ],
    steps: [
      {
        id: 'dal-step1',
        description: 'Wash dal and add water, turmeric',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['dal-lentils', 'dal-water', 'dal-turmeric']
      },
      {
        id: 'dal-step2',
        description: 'Pressure cook dal until soft',
        type: 'cooking',
        durationMinutes: 15,
        temperature: 120,
        speed: 3
      },
      {
        id: 'dal-step3',
        description: 'Add salt and simmer',
        type: 'instruction',
        durationMinutes: 2,
        ingredientIds: ['dal-salt']
      },
      {
        id: 'dal-step4',
        description: 'Heat oil for tempering',
        type: 'cooking',
        durationMinutes: 1,
        temperature: 150,
        speed: 2
      }
    ],
    totalTimeMinutes: 20,
    totalIngredients: 5,
    complexityScore: 15,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'roti-1',
    title: 'Chapati/Roti',
    difficulty: 'Easy',
    image: 'https://www.werecipes.com/app/uploads/2015/04/phulka-roti-phulka-on-flame.jpg',
    ingredients: [
      { id: 'roti-flour', name: 'Wheat Flour', quantity: 200, unit: 'g' },
      { id: 'roti-water', name: 'Water', quantity: 120, unit: 'ml' },
      { id: 'roti-salt', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: 'roti-oil', name: 'Oil', quantity: 1, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'roti-step1',
        description: 'Mix flour, salt, oil and water to make dough',
        type: 'instruction',
        durationMinutes: 5,
        ingredientIds: ['roti-flour', 'roti-water', 'roti-salt', 'roti-oil']
      },
      {
        id: 'roti-step2',
        description: 'Rest dough for 15 minutes',
        type: 'instruction',
        durationMinutes: 15,
        ingredientIds: ['roti-flour']
      },
      {
        id: 'roti-step3',
        description: 'Roll into thin circles',
        type: 'instruction',
        durationMinutes: 3,
        ingredientIds: ['roti-flour']
      },
      {
        id: 'roti-step4',
        description: 'Cook on hot tawa until puffed',
        type: 'cooking',
        durationMinutes: 2,
        temperature: 180,
        speed: 2
      }
    ],
    totalTimeMinutes: 25,
    totalIngredients: 4,
    complexityScore: 12,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'biryani-1',
    title: 'Chicken Biryani',
    difficulty: 'Hard',
    image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2020/09/Chicken-Biryani-Recipe-01-1.jpg',
    ingredients: [
      { id: 'biryani-rice', name: 'Basmati Rice', quantity: 500, unit: 'g' },
      { id: 'biryani-chicken', name: 'Chicken', quantity: 750, unit: 'g' },
      { id: 'biryani-yogurt', name: 'Yogurt', quantity: 200, unit: 'ml' },
      { id: 'biryani-onion', name: 'Onions', quantity: 3, unit: 'pcs' },
      { id: 'biryani-spices', name: 'Biryani Spices', quantity: 2, unit: 'tbsp' },
      { id: 'biryani-oil', name: 'Oil', quantity: 4, unit: 'tbsp' },
      { id: 'biryani-mint', name: 'Mint Leaves', quantity: 50, unit: 'g' }
    ],
    steps: [
      {
        id: 'biryani-step1',
        description: 'Marinate chicken with yogurt and spices',
        type: 'instruction',
        durationMinutes: 30,
        ingredientIds: ['biryani-chicken', 'biryani-yogurt', 'biryani-spices']
      },
      {
        id: 'biryani-step2',
        description: 'Soak rice for 30 minutes',
        type: 'instruction',
        durationMinutes: 30,
        ingredientIds: ['biryani-rice']
      },
      {
        id: 'biryani-step3',
        description: 'Deep fry onions until golden',
        type: 'cooking',
        durationMinutes: 10,
        temperature: 180,
        speed: 3
      },
      {
        id: 'biryani-step4',
        description: 'Cook marinated chicken',
        type: 'cooking',
        durationMinutes: 20,
        temperature: 160,
        speed: 2
      },
      {
        id: 'biryani-step5',
        description: 'Boil rice until 70% cooked',
        type: 'cooking',
        durationMinutes: 8,
        temperature: 100,
        speed: 3
      },
      {
        id: 'biryani-step6',
        description: 'Layer rice and chicken with mint',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['biryani-rice', 'biryani-chicken', 'biryani-mint']
      },
      {
        id: 'biryani-step7',
        description: 'Dum cook on low heat',
        type: 'cooking',
        durationMinutes: 45,
        temperature: 60,
        speed: 1
      }
    ],
    totalTimeMinutes: 153,
    totalIngredients: 7,
    complexityScore: 63,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'pizza-1',
    title: 'Homemade Pizza',
    difficulty: 'Hard',
    image: '',
    ingredients: [
      { id: 'pizza-flour', name: 'All Purpose Flour', quantity: 300, unit: 'g' },
      { id: 'pizza-yeast', name: 'Active Yeast', quantity: 7, unit: 'g' },
      { id: 'pizza-sauce', name: 'Tomato Sauce', quantity: 150, unit: 'ml' },
      { id: 'pizza-cheese', name: 'Mozzarella', quantity: 200, unit: 'g' },
      { id: 'pizza-toppings', name: 'Mixed Toppings', quantity: 150, unit: 'g' },
      { id: 'pizza-oil', name: 'Olive Oil', quantity: 2, unit: 'tbsp' }
    ],
    steps: [
      {
        id: 'pizza-step1',
        description: 'Activate yeast in warm water',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['pizza-yeast']
      },
      {
        id: 'pizza-step2',
        description: 'Make dough with flour and yeast',
        type: 'instruction',
        durationMinutes: 15,
        ingredientIds: ['pizza-flour', 'pizza-yeast', 'pizza-oil']
      },
      {
        id: 'pizza-step3',
        description: 'Knead dough until smooth',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['pizza-flour']
      },
      {
        id: 'pizza-step4',
        description: 'Let dough rise for 1 hour',
        type: 'instruction',
        durationMinutes: 60,
        ingredientIds: ['pizza-flour']
      },
      {
        id: 'pizza-step5',
        description: 'Roll dough and add sauce',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['pizza-flour', 'pizza-sauce']
      },
      {
        id: 'pizza-step6',
        description: 'Add cheese and toppings',
        type: 'instruction',
        durationMinutes: 5,
        ingredientIds: ['pizza-cheese', 'pizza-toppings']
      },
      {
        id: 'pizza-step7',
        description: 'Bake in preheated oven',
        type: 'cooking',
        durationMinutes: 15,
        temperature: 200,
        speed: 2
      }
    ],
    totalTimeMinutes: 125,
    totalIngredients: 6,
    complexityScore: 54,
    isFavorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cake-1',
    title: 'Chocolate Cake',
    difficulty: 'Hard',
    image: '',
    ingredients: [
      { id: 'cake-flour', name: 'All Purpose Flour', quantity: 200, unit: 'g' },
      { id: 'cake-cocoa', name: 'Cocoa Powder', quantity: 50, unit: 'g' },
      { id: 'cake-sugar', name: 'Sugar', quantity: 150, unit: 'g' },
      { id: 'cake-eggs', name: 'Eggs', quantity: 3, unit: 'pcs' },
      { id: 'cake-butter', name: 'Butter', quantity: 100, unit: 'g' },
      { id: 'cake-milk', name: 'Milk', quantity: 120, unit: 'ml' },
      { id: 'cake-baking', name: 'Baking Powder', quantity: 2, unit: 'tsp' }
    ],
    steps: [
      {
        id: 'cake-step1',
        description: 'Preheat oven and prepare pan',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['cake-butter']
      },
      {
        id: 'cake-step2',
        description: 'Cream butter and sugar',
        type: 'instruction',
        durationMinutes: 8,
        ingredientIds: ['cake-butter', 'cake-sugar']
      },
      {
        id: 'cake-step3',
        description: 'Add eggs one by one',
        type: 'instruction',
        durationMinutes: 5,
        ingredientIds: ['cake-eggs']
      },
      {
        id: 'cake-step4',
        description: 'Mix dry ingredients separately',
        type: 'instruction',
        durationMinutes: 5,
        ingredientIds: ['cake-flour', 'cake-cocoa', 'cake-baking']
      },
      {
        id: 'cake-step5',
        description: 'Alternate adding dry ingredients and milk',
        type: 'instruction',
        durationMinutes: 10,
        ingredientIds: ['cake-flour', 'cake-milk']
      },
      {
        id: 'cake-step6',
        description: 'Pour batter and bake',
        type: 'cooking',
        durationMinutes: 35,
        temperature: 180,
        speed: 1
      },
      {
        id: 'cake-step7',
        description: 'Cool completely before frosting',
        type: 'instruction',
        durationMinutes: 30,
        ingredientIds: ['cake-flour']
      }
    ],
    totalTimeMinutes: 103,
    totalIngredients: 7,
    complexityScore: 49,
    isFavorite: false,
    createdAt: new Date().toISOString()
  }
];