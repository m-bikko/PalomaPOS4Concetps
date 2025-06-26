import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home, X, 
  Filter, Grid, List, Star, TrendingUp, Clock,
  Package, ArrowRight
} from 'lucide-react';

const ConceptEight = () => {
  const {
    categories,
    cartItems,
    filteredProducts,
    allFilteredProducts,
    cartTotals,
    currentTime,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm,
    addToCart,
    updateQuantity,
    updateDiscount,
    getCartItemDetails,
    formatCurrency,
    formatTime
  } = usePOS();

  const [viewMode, setViewMode] = useState('grid');

  const getProductImage = (product) => {
    if (product.image) return product.image;
    return product.name.charAt(0).toUpperCase();
  };

  const displayProducts = searchTerm ? allFilteredProducts : filteredProducts;

  return (
    <div className="container h-full flex flex-col bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary">
      {/* Modern Header */}
      <header className="bg-black-60 backdrop-blur-xl border-b border-white-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="btn btn-sm glass">
              <Home size={16} />
              Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                <Star size={16} className="text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">PalomaPOS</div>
                <div className="text-xs text-white-60">v0.3.170.067234687234</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass px-3 py-2 rounded-lg flex items-center gap-2">
              <Clock size={14} className="text-accent-primary" />
              <span className="text-sm font-mono text-white">{formatTime(currentTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="status-indicator status-online"></div>
              <span className="text-xs text-white-60">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout - Split Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Cart */}
        <div className="w-96 bg-black-60 backdrop-blur-xl border-r border-white-10 flex flex-col">
          {/* Cart Header */}
          <div className="p-6 border-b border-white-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
                  <ShoppingCart size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Current Order</h2>
                  <p className="text-sm text-white-60">{cartTotals.itemCount} items selected</p>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-3 gap-3">
              <div className="glass-strong p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-accent-primary">{cartTotals.itemCount}</div>
                <div className="text-xs text-white-60">Items</div>
              </div>
              <div className="glass-strong p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-success">{formatCurrency(cartTotals.subtotal)}</div>
                <div className="text-xs text-white-60">Subtotal</div>
              </div>
              <div className="glass-strong p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-warning">{formatCurrency(cartTotals.totalDiscount)}</div>
                <div className="text-xs text-white-60">Savings</div>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-4 scrollable">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={32} className="text-white-40" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cart is Empty</h3>
                <p className="text-sm text-white-60 mb-4">Add products from the menu to get started</p>
                <div className="glass px-4 py-2 rounded-lg">
                  <span className="text-xs text-white-60">Tip: Use search or browse categories →</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((cartItem) => {
                  const details = getCartItemDetails(cartItem);
                  if (!details) return null;

                  return (
                    <div key={cartItem.id} className="glass-strong rounded-xl p-4 transition-all hover:bg-white-10">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-bg-tertiary to-bg-hover rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {getProductImage(details.product)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm mb-1">{details.product.name}</h4>
                          <p className="text-xs text-white-60 mb-2">{formatCurrency(details.itemPrice)} each</p>
                          
                          {/* Additional Info */}
                          {details.selectedOptionDetails.length > 0 && (
                            <div className="text-xs text-accent-primary mb-1">
                              + {details.selectedOptionDetails.map(opt => opt.name).join(', ')}
                            </div>
                          )}
                          {cartItem.note && (
                            <div className="text-xs text-warning mb-1">📝 {cartItem.note}</div>
                          )}
                          {cartItem.discount > 0 && (
                            <div className="text-xs text-success mb-1">🏷️ {cartItem.discount}% off</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-white">{formatCurrency(details.finalPrice)}</div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white-10">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white-10"
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                          >
                            <Minus size={12} className="text-white" />
                          </button>
                          <span className="w-8 text-center font-semibold text-white">{cartItem.quantity}</span>
                          <button
                            className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white-10"
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                          >
                            <Plus size={12} className="text-white" />
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button className="btn btn-sm glass">
                            <Edit size={12} />
                          </button>
                          <button 
                            className={`btn btn-sm ${cartItem.discount > 0 ? 'btn-success' : 'glass'}`}
                            onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 15)}
                          >
                            <Percent size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white-10 bg-black-60">
              <div className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white-60">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(cartTotals.subtotal)}</span>
                  </div>
                  {cartTotals.totalDiscount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount:</span>
                      <span>-{formatCurrency(cartTotals.totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white-10">
                    <span>Total:</span>
                    <span>{formatCurrency(cartTotals.total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="btn btn-primary w-full btn-lg bg-gradient-to-r from-accent-primary to-accent-secondary">
                    <CreditCard size={16} />
                    Pay {formatCurrency(cartTotals.total)}
                    <ArrowRight size={16} />
                  </button>
                  <div className="grid grid-2 gap-2">
                    <button className="btn btn-sm glass">
                      <Receipt size={14} />
                      Receipt
                    </button>
                    <button className="btn btn-sm glass">
                      <Scan size={14} />
                      QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Products */}
        <div className="flex-1 flex flex-col">
          {/* Search & Filters */}
          <div className="p-6 bg-black-60 backdrop-blur-xl border-b border-white-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-half -translate-y-half text-white-60" size={18} />
                <input
                  type="text"
                  placeholder="Search products, categories, or scan barcode..."
                  className="w-full glass pl-12 pr-4 py-3 rounded-xl text-white placeholder-white-40 border-white-20 focus:border-accent-primary focus:bg-white-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-4 top-half -translate-y-half text-white-60 hover:text-white"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'glass'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={14} />
                </button>
                <button 
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'glass'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={14} />
                </button>
                <button className="btn btn-sm glass">
                  <Filter size={14} />
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-3 scrollable-horizontal">
              <button
                className={`btn btn-sm whitespace-nowrap ${!searchTerm ? 'btn-primary' : 'glass'}`}
                onClick={() => setSearchTerm('')}
              >
                <Star size={14} />
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn btn-sm whitespace-nowrap ${
                    selectedCategory === category.id && !searchTerm ? 'btn-primary' : 'glass'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSearchTerm('');
                  }}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Header */}
          <div className="px-6 py-4 bg-white-5 border-b border-white-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {searchTerm ? `Search Results` : categories.find(cat => cat.id === selectedCategory)?.name || 'All Products'}
                </h2>
                <p className="text-sm text-white-60">
                  {displayProducts.length} products • {displayProducts.filter(p => p.inStock).length} available
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
                  <TrendingUp size={14} className="text-success" />
                  <span className="text-sm text-white">Popular</span>
                </div>
                <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg">
                  <Package size={14} className="text-accent-primary" />
                  <span className="text-sm text-white">{displayProducts.filter(p => p.inStock).length} in stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 p-6 scrollable bg-gradient-to-b from-transparent to-white-5">
            {viewMode === 'grid' ? (
              <div className="grid grid-auto-fit-250 gap-4">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`glass-strong rounded-xl p-6 transition-all hover:scale-105 hover:bg-white-10 cursor-pointer ${
                      !product.inStock ? 'opacity-50' : ''
                    }`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="w-full h-20 bg-gradient-to-br from-bg-tertiary to-bg-hover rounded-lg mb-4 flex items-center justify-center text-2xl font-bold">
                      {getProductImage(product)}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-white mb-1">{product.name}</h3>
                        <p className="text-sm text-white-60 line-clamp-2">{product.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-accent-primary">
                          {formatCurrency(product.price)}
                        </span>
                        {!product.inStock ? (
                          <span className="badge badge-danger">Out of Stock</span>
                        ) : (
                          <button 
                            className="btn btn-sm btn-primary bg-gradient-to-r from-accent-primary to-accent-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.id);
                            }}
                          >
                            <Plus size={14} />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`glass-strong rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white-10 cursor-pointer ${
                      !product.inStock ? 'opacity-50' : ''
                    }`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-bg-tertiary to-bg-hover rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {getProductImage(product)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-sm text-white-60 truncate">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-bold text-accent-primary">
                          {formatCurrency(product.price)}
                        </span>
                        {!product.inStock && (
                          <span className="badge badge-danger text-xs">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    
                    {product.inStock && (
                      <button 
                        className="btn btn-primary bg-gradient-to-r from-accent-primary to-accent-secondary flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        <Plus size={16} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {displayProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-white-40" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Products Found</h3>
                <p className="text-sm text-white-60 mb-4">
                  {searchTerm ? `No results for "${searchTerm}"` : 'No products in this category'}
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSearchTerm('')}
                >
                  <Star size={14} />
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptEight; 