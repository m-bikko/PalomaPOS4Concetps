import { useState, useEffect, useMemo } from 'react';
import { categories, products, productOptions, defaultCartItems } from '../data/mockData';

export const usePOS = () => {
  const [cartItems, setCartItems] = useState(defaultCartItems);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get products for selected category
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product.categoryId === selectedCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  // Get all products for search (when no category filter)
  const allFilteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;

    cartItems.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      if (!product) return;

      let itemPrice = product.price * cartItem.quantity;
      
      // Add options price
      cartItem.selectedOptions.forEach(optionId => {
        const option = productOptions.find(o => o.id === optionId);
        if (option) {
          itemPrice += option.price * cartItem.quantity;
        }
      });

      subtotal += itemPrice;
      
      // Calculate discount
      if (cartItem.discount > 0) {
        const discountAmount = (itemPrice * cartItem.discount) / 100;
        totalDiscount += discountAmount;
      }
    });

    const total = subtotal - totalDiscount;

    return {
      subtotal,
      totalDiscount,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [cartItems]);

  // Add product to cart
  const addToCart = (productId, options = [], note = '') => {
    const existingItemIndex = cartItems.findIndex(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedOptions.sort()) === JSON.stringify(options.sort()) &&
      item.note === note
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      const newItem = {
        id: Date.now(),
        productId,
        quantity: 1,
        selectedOptions: options,
        note,
        discount: 0
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Update cart item quantity
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    setCartItems(cartItems.filter(item => item.id !== cartItemId));
  };

  // Update cart item note
  const updateNote = (cartItemId, note) => {
    setCartItems(cartItems.map(item =>
      item.id === cartItemId ? { ...item, note } : item
    ));
  };

  // Update cart item discount
  const updateDiscount = (cartItemId, discount) => {
    setCartItems(cartItems.map(item =>
      item.id === cartItemId ? { ...item, discount: Math.max(0, Math.min(100, discount)) } : item
    ));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get product details with options
  const getProductDetails = (productId) => {
    const product = products.find(p => p.id === productId);
    const options = productOptions.filter(option => option.productId === productId);
    return { product, options };
  };

  // Get cart item details
  const getCartItemDetails = (cartItem) => {
    const { product } = getProductDetails(cartItem.productId);
    if (!product) return null;

    const selectedOptionDetails = cartItem.selectedOptions.map(optionId =>
      productOptions.find(option => option.id === optionId)
    ).filter(Boolean);

    let itemPrice = product.price;
    selectedOptionDetails.forEach(option => {
      itemPrice += option.price;
    });

    const totalItemPrice = itemPrice * cartItem.quantity;
    const discountAmount = (totalItemPrice * cartItem.discount) / 100;
    const finalPrice = totalItemPrice - discountAmount;

    return {
      ...cartItem,
      product,
      selectedOptionDetails,
      itemPrice,
      totalItemPrice,
      discountAmount,
      finalPrice
    };
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return {
    // Data
    categories,
    products,
    productOptions,
    cartItems,
    filteredProducts,
    allFilteredProducts,
    cartTotals,
    currentTime,
    
    // State
    selectedCategory,
    searchTerm,
    
    // Actions
    setSelectedCategory,
    setSearchTerm,
    addToCart,
    updateQuantity,
    removeFromCart,
    updateNote,
    updateDiscount,
    clearCart,
    
    // Helpers
    getProductDetails,
    getCartItemDetails,
    formatCurrency,
    formatTime
  };
}; 