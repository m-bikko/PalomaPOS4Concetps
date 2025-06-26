# PalomaPOS - Point of Sale System

A modern, dark-themed Point of Sale (POS) system built with React, featuring 4 different UI concepts optimized for 1280x800px resolution.

## Features

✨ **Complete POS Functionality**
- Real-time cart management with quantity controls
- Product categorization and search
- Dynamic pricing with discount support
- Product options and customizations
- Order notes and modifications
- Live time display in header

🎨 **4 Unique UI Concepts**
1. **Classic Layout** - Traditional side-by-side grid with category tabs
2. **Modern Split** - Vertical split design with enhanced search
3. **Mobile-First** - Tab navigation with touch-friendly interface
4. **Dashboard Style** - Widget-based layout with analytics focus

🛍️ **Product Management**
- Category-based organization (Beverages, Food, Desserts, Snacks)
- Out-of-stock handling with visual indicators
- Product images or letter placeholders
- Search functionality across all products
- Quick add to cart functionality

💰 **Cart & Checkout**
- Item quantity management (+/- controls)
- Individual item discounts
- Product notes and options
- Real-time total calculation
- Receipt, Payment, and Scan buttons

🎯 **Technical Features**
- Dark theme without gradients
- Responsive design optimized for 1280x800px
- React Router for navigation between concepts
- Custom hooks for state management
- Lucide React icons throughout
- Real-time clock display

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm start
```

3. **Open in Browser**
Navigate to `http://localhost:3000` to view the concept selector.

## Project Structure

```
src/
├── components/
│   ├── ConceptOne.js       # Classic Layout
│   ├── ConceptTwo.js       # Modern Split
│   ├── ConceptThree.js     # Mobile-First
│   ├── ConceptFour.js      # Dashboard Style
│   └── ConceptSelector.js  # Concept chooser
├── data/
│   └── mockData.js         # Products, categories, cart data
├── hooks/
│   └── usePOS.js          # POS state management
├── App.js                 # Main app with routing
├── index.js              # React entry point
└── index.css             # Global styles
```

## UI Concepts Overview

### Concept 1: Classic Layout
- Traditional POS interface
- Side-by-side product grid and cart
- Category tabs for easy navigation
- Dropdown menus for settings

### Concept 2: Modern Split
- Vertical split design
- Enhanced search with filters
- User profile and notifications
- Card-based product display

### Concept 3: Mobile-First
- Tab-based navigation
- Touch-friendly controls
- Grid/list view toggle
- Mobile menu overlay

### Concept 4: Dashboard Style
- Widget-based layout
- Analytics and statistics
- Compact grid design
- Quick action buttons

## Data Structure

### Products
- Name, price, description
- Category association
- Stock status
- Optional product images

### Cart Items
- Product reference
- Quantity controls
- Selected options
- Notes and discounts

### Categories
- Beverages 🥤
- Food 🍔
- Desserts 🍰
- Snacks 🍿

## Color Scheme

The application uses a dark theme with the following color variables:
- Primary: `#1a1a1a`
- Secondary: `#2a2a2a`
- Accent: `#4a9eff`
- Success: `#10b981`
- Warning: `#f59e0b`
- Danger: `#ef4444`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Build & Deploy

```bash
# Create production build
npm run build

# The build folder contains optimized files ready for deployment
```

## Technologies Used

- **React 18** - UI framework
- **React Router 6** - Navigation
- **Lucide React** - Icon library
- **CSS Variables** - Theming system
- **JavaScript ES6+** - Modern syntax

## License

This project is built as a demonstration of modern POS UI concepts. All rights reserved. 