import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Home, Settings, 
  X, Percent, StickyNote,
  ChevronRight, Zap
} from 'lucide-react';

// Add these CSS variables at the top of the component
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

const ConceptSeven = () => {
  const {
    categories,
    filteredProducts,
    cartItems,
    cartTotals,
    currentTime,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm,
    addToCart,
    updateQuantity,
    updateNote,
    updateDiscount,
    getCartItemDetails,
    formatCurrency,
    formatTime,
  } = usePOS();

  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [swipeStart, setSwipeStart] = useState(null);

  const getProductImage = (product) => {
    if (product.image) return product.image;
    return product.name.charAt(0).toUpperCase();
  };

  const handleSwipeStart = (e) => {
    setSwipeStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleSwipeEnd = (e, action) => {
    if (!swipeStart) return;
    
    const deltaX = e.changedTouches[0].clientX - swipeStart.x;
    const deltaY = e.changedTouches[0].clientY - swipeStart.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        action('right');
      } else {
        action('left');
      }
    }
    setSwipeStart(null);
  };

  const handleProductSwipe = (direction, productId) => {
    if (direction === 'right') {
      addToCart(productId);
    }
  };

  const handleCartItemSwipe = (direction, itemId) => {
    if (direction === 'left') {
      updateQuantity(itemId, 0); // Remove item
    }
  };

  return (
    <div className="container h-full flex flex-col bg-gradient-to-br from-purple-900 via-bg-primary to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-float-delayed"></div>
      </div>

      {/* Floating Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xl">
        <div style={glassStyle} className="rounded-2xl px-8 py-4 mx-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="btn btn-sm bg-white/10 hover:bg-white/20 border-0 text-white">
                <Home size={14} />
              </Link>
              <div>
                <div className="text-xl font-light text-white">PalomaPOS</div>
                <div className="text-xs text-white/70 font-mono">0.3.170.067234687234</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <div className="status-indicator status-online"></div>
              <div className="font-mono text-sm">{formatTime(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-4">
        <button 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${showCart ? 'rotate-45' : ''}`}
          onClick={() => setShowCart(!showCart)}
          style={{ boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3)' }}
        >
          {showCart ? <X size={24} className="text-white" /> : <ShoppingCart size={24} className="text-white" />}
          {cartTotals.itemCount > 0 && !showCart && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-xl flex items-center justify-center text-sm text-white font-bold shadow-lg">
              {cartTotals.itemCount}
            </div>
          )}
        </button>
        <button 
          className={`w-14 h-14 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${showSearch ? 'rotate-45' : ''}`}
          onClick={() => setShowSearch(!showSearch)}
          style={glassStyle}
        >
          {showSearch ? <X size={20} className="text-white" /> : <Search size={20} className="text-white" />}
        </button>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-xl" style={glassStyle}>
            <div className="rounded-2xl p-8">
              <div className="relative mb-8">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-6 py-3 rounded-xl text-sm transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg' 
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-[480px] z-40 animate-slide-in-right" style={glassStyle}>
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-white">Your Order</h2>
                <span className="text-white/70 text-lg">{cartTotals.itemCount} items</span>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center text-white/70 py-16">
                  <ShoppingCart size={64} className="mx-auto mb-6 opacity-50" />
                  <p className="text-xl font-light mb-2">Your cart is empty</p>
                  <p className="text-sm">Swipe right on products to add them</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((cartItem) => {
                    const details = getCartItemDetails(cartItem);
                    if (!details) return null;
                    
                    return (
                      <div 
                        key={cartItem.id} 
                        className="group bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:bg-white/10"
                        onTouchStart={handleSwipeStart}
                        onTouchEnd={(e) => handleCartItemSwipe('left', cartItem.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                            {getProductImage(details.product)}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-white mb-1">{details.product.name}</h4>
                            <p className="text-sm text-white/70">{formatCurrency(details.itemPrice)} each</p>
                            {cartItem.note && (
                              <p className="text-xs text-white/60 mt-2 italic">"{cartItem.note}"</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-light text-white mb-3">{formatCurrency(details.finalPrice)}</div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-white font-medium w-8 text-center">{cartItem.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                          <button 
                            onClick={() => setEditingNote(cartItem.id)}
                            className="flex-1 btn btn-sm bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl"
                          >
                            <StickyNote size={14} />
                            Add Note
                          </button>
                          <button 
                            onClick={() => setEditingDiscount(cartItem.id)}
                            className="flex-1 btn btn-sm bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-xl"
                          >
                            <Percent size={14} />
                            Discount
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-8 border-t border-white/10">
                <div className="flex justify-between text-3xl font-light text-white mb-6">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotals.total)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="btn bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-xl py-4">
                    <Receipt size={20} />
                    Print Receipt
                  </button>
                  <button className="btn bg-gradient-to-br from-purple-500 to-blue-500 hover:opacity-90 border-0 text-white rounded-xl py-4 shadow-lg">
                    <CreditCard size={20} />
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 pt-32 px-8 pb-8">
        {/* Category Pills */}
        <div className="flex gap-3 mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="text-xl mr-3">{category.icon}</span>
              <span className="text-lg">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-auto-fit-300 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className={`group relative backdrop-blur-lg rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                !product.inStock ? 'opacity-50' : ''
              }`}
              onTouchStart={handleSwipeStart}
              onTouchEnd={(e) => handleSwipeEnd(e, (direction) => handleProductSwipe(direction, product.id))}
              onClick={() => product.inStock && addToCart(product.id)}
              style={glassStyle}
            >
              {/* Swipe Indicator */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white flex items-center gap-2 text-lg font-light">
                  <ChevronRight size={24} />
                  <span>Swipe to add</span>
                </div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-4xl font-bold text-white mb-6 mx-auto transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                  {getProductImage(product)}
                </div>
                
                <h3 className="text-xl font-medium text-white text-center mb-2">{product.name}</h3>
                <p className="text-sm text-white/70 text-center mb-6 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-light text-white">{formatCurrency(product.price)}</span>
                  {!product.inStock && (
                    <span className="text-sm bg-red-500/80 text-white px-3 py-1 rounded-lg">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                {product.inStock && (
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500">
                    <Plus size={20} className="inline mr-2" />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div style={glassStyle} className="rounded-2xl px-8 py-4">
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <Scan size={20} />
            </button>
            <button className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <Zap size={20} />
            </button>
            <button className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modals */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div style={glassStyle} className="w-full max-w-md rounded-2xl p-8">
            <h3 className="text-xl font-medium text-white mb-6">Add Note</h3>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 resize-none text-lg"
              rows="4"
              placeholder="Enter note..."
              defaultValue={cartItems.find(item => item.id === editingNote)?.note || ''}
              onBlur={(e) => {
                updateNote(editingNote, e.target.value);
                setEditingNote(null);
              }}
              autoFocus
            />
          </div>
        </div>
      )}

      {editingDiscount && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div style={glassStyle} className="w-full max-w-md rounded-2xl p-8">
            <h3 className="text-xl font-medium text-white mb-6">Set Discount</h3>
            <input
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 text-lg"
              placeholder="Discount %"
              min="0"
              max="100"
              defaultValue={cartItems.find(item => item.id === editingDiscount)?.discount || ''}
              onBlur={(e) => {
                updateDiscount(editingDiscount, parseInt(e.target.value) || 0);
                setEditingDiscount(null);
              }}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptSeven; 