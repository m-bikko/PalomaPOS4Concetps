export const categories = [
  {
    id: 1,
    name: 'Beverages',
    icon: '🥤'
  },
  {
    id: 2,
    name: 'Food',
    icon: '🍔'
  },
  {
    id: 3,
    name: 'Desserts',
    icon: '🍰'
  },
  {
    id: 4,
    name: 'Snacks',
    icon: '🍿'
  }
];

export const products = [
  // Beverages
  {
    id: 1,
    categoryId: 1,
    name: 'Coca Cola',
    price: 2.50,
    image: null,
    inStock: true,
    description: 'Classic Coca Cola'
  },
  {
    id: 2,
    categoryId: 1,
    name: 'Pepsi',
    price: 2.40,
    image: null,
    inStock: false,
    description: 'Pepsi Cola'
  },
  {
    id: 3,
    categoryId: 1,
    name: 'Orange Juice',
    price: 3.50,
    image: null,
    inStock: true,
    description: 'Fresh orange juice'
  },
  {
    id: 4,
    categoryId: 1,
    name: 'Water',
    price: 1.50,
    image: null,
    inStock: true,
    description: 'Mineral water'
  },
  {
    id: 5,
    categoryId: 1,
    name: 'Coffee',
    price: 4.00,
    image: null,
    inStock: true,
    description: 'Fresh brewed coffee'
  },
  {
    id: 6,
    categoryId: 1,
    name: 'Tea',
    price: 3.00,
    image: null,
    inStock: true,
    description: 'Hot tea'
  },
  
  // Food
  {
    id: 7,
    categoryId: 2,
    name: 'Hamburger',
    price: 12.99,
    image: null,
    inStock: true,
    description: 'Classic beef hamburger'
  },
  {
    id: 8,
    categoryId: 2,
    name: 'Pizza Margherita',
    price: 15.99,
    image: null,
    inStock: true,
    description: 'Classic pizza with tomato and mozzarella'
  },
  {
    id: 9,
    categoryId: 2,
    name: 'Caesar Salad',
    price: 9.99,
    image: null,
    inStock: false,
    description: 'Fresh caesar salad'
  },
  {
    id: 10,
    categoryId: 2,
    name: 'French Fries',
    price: 4.99,
    image: null,
    inStock: true,
    description: 'Crispy french fries'
  },
  {
    id: 11,
    categoryId: 2,
    name: 'Chicken Wings',
    price: 11.99,
    image: null,
    inStock: true,
    description: 'Spicy chicken wings'
  },
  {
    id: 12,
    categoryId: 2,
    name: 'Fish & Chips',
    price: 13.99,
    image: null,
    inStock: true,
    description: 'Traditional fish & chips'
  },
  
  // Desserts
  {
    id: 13,
    categoryId: 3,
    name: 'Chocolate Cake',
    price: 6.99,
    image: null,
    inStock: true,
    description: 'Rich chocolate cake'
  },
  {
    id: 14,
    categoryId: 3,
    name: 'Ice Cream',
    price: 4.99,
    image: null,
    inStock: true,
    description: 'Vanilla ice cream'
  },
  {
    id: 15,
    categoryId: 3,
    name: 'Apple Pie',
    price: 5.99,
    image: null,
    inStock: false,
    description: 'Traditional apple pie'
  },
  {
    id: 16,
    categoryId: 3,
    name: 'Cheesecake',
    price: 7.99,
    image: null,
    inStock: true,
    description: 'New York style cheesecake'
  },
  
  // Snacks
  {
    id: 17,
    categoryId: 4,
    name: 'Potato Chips',
    price: 2.99,
    image: null,
    inStock: true,
    description: 'Crispy potato chips'
  },
  {
    id: 18,
    categoryId: 4,
    name: 'Nachos',
    price: 5.99,
    image: null,
    inStock: true,
    description: 'Nachos with cheese'
  },
  {
    id: 19,
    categoryId: 4,
    name: 'Popcorn',
    price: 3.99,
    image: null,
    inStock: true,
    description: 'Buttered popcorn'
  },
  {
    id: 20,
    categoryId: 4,
    name: 'Pretzels',
    price: 3.49,
    image: null,
    inStock: false,
    description: 'Salted pretzels'
  }
];

export const productOptions = [
  {
    id: 1,
    productId: 7, // Hamburger
    name: 'Extra Cheese',
    price: 1.50
  },
  {
    id: 2,
    productId: 7,
    name: 'Extra Bacon',
    price: 2.00
  },
  {
    id: 3,
    productId: 8, // Pizza
    name: 'Extra Pepperoni',
    price: 2.50
  },
  {
    id: 4,
    productId: 5, // Coffee
    name: 'Extra Shot',
    price: 1.00
  },
  {
    id: 5,
    productId: 5,
    name: 'Oat Milk',
    price: 0.75
  }
];

export const defaultCartItems = [
  {
    id: 1,
    productId: 1,
    quantity: 2,
    note: 'No ice',
    selectedOptions: [],
    discount: 0
  },
  {
    id: 2,
    productId: 7,
    quantity: 1,
    note: 'Well done',
    selectedOptions: [1, 2], // Extra cheese and bacon
    discount: 10 // 10% discount
  },
  {
    id: 3,
    productId: 5,
    quantity: 1,
    note: '',
    selectedOptions: [4, 5], // Extra shot and oat milk
    discount: 0
  }
]; 