import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Search, Plus, Home, Menu,
  Grid, List, X, Package, Calendar, TrendingUp
} from 'lucide-react';

const ConceptThreeProducts = () => {
  const navigate = useNavigate();
  const {
    categories,
    filteredProducts,
    allFilteredProducts,
    cartTotals,
    currentTime,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm,
    addToCart,
    formatCurrency,
    formatTime
  } = usePOS();

  const [viewMode, setViewMode] = useState('grid');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }
    return product.name.charAt(0).toUpperCase();
  };

  const displayProducts = searchTerm ? allFilteredProducts : filteredProducts;

  return (
    <div className="container h-full flex flex-col">
      {/* Enhanced Mobile Header */}
      <header className="header flex justify-between items-center relative">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-sm">
            <Home size={16} />
            Home
          </Link>
          <div className="text-xl font-bold text-accent">
            PalomaPOS 0.3.170.067234687234
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className={`btn btn-sm ${showSearch ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={16} />
          </button>
          <button 
            className="btn btn-sm btn-secondary relative"
            onClick={() => navigate('/concept3-cart')}
          >
            <ShoppingCart size={16} />
            {cartTotals.itemCount > 0 && (
              <span className="badge badge-sm absolute -top-2 -right-2">{cartTotals.itemCount}</span>
            )}
          </button>
          <button 
            className={`btn btn-sm ${showMobileMenu ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu size={16} />
          </button>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono text-sm">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-bg-card border border-border rounded-lg shadow-xl z-50 m-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <button 
                  className="btn btn-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-2 gap-4">
                <div className="card p-4 text-center">
                  <Package className="mx-auto mb-2 text-accent" size={24} />
                  <h4 className="font-semibold mb-1">Daily Sales</h4>
                  <p className="text-secondary text-sm">$2,847.50</p>
                </div>
                <div className="card p-4 text-center">
                  <Calendar className="mx-auto mb-2 text-success" size={24} />
                  <h4 className="font-semibold mb-1">Orders Today</h4>
                  <p className="text-secondary text-sm">47 orders</p>
                </div>
                <div className="card p-4 text-center">
                  <TrendingUp className="mx-auto mb-2 text-warning" size={24} />
                  <h4 className="font-semibold mb-1">Avg Order</h4>
                  <p className="text-secondary text-sm">$18.75</p>
                </div>
                <div className="card p-4 text-center">
                  <ShoppingCart className="mx-auto mb-2 text-accent-secondary" size={24} />
                  <h4 className="font-semibold mb-1">Current Cart</h4>
                  <p className="text-secondary text-sm">{formatCurrency(cartTotals.total)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Search Bar */}
      {showSearch && (
        <div className="p-4 bg-bg-card border-b border-border animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-half transform -translate-y-half text-muted" size={18} />
            <input
              type="text"
              placeholder="Search products, categories..."
              className="input pl-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button 
                className="absolute right-4 top-half transform -translate-y-half text-muted hover:text-primary"
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Products Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Enhanced Category Pills & View Toggle */}
          <div className="p-4 bg-bg-card border-b border-border">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold mb-1">
                  {searchTerm ? 'Search Results' : categories.find(cat => cat.id === selectedCategory)?.name || 'All Products'}
                </h2>
                <p className="text-sm text-secondary">
                  {displayProducts.length} products • {displayProducts.filter(p => p.inStock).length} in stock
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={14} />
                </button>
                <button 
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
            
            <div className="scrollable-horizontal flex gap-3 pb-2">
              <button
                className={`btn btn-sm whitespace-nowrap ${!selectedCategory && !searchTerm ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn btn-sm whitespace-nowrap ${
                    selectedCategory === category.id && !searchTerm ? 'btn-primary' : 'btn-secondary'
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
          
          {/* Enhanced Products Grid/List */}
          <div className="flex-1 p-4 scrollable">
            {viewMode === 'grid' ? (
              <div className="grid grid-2 gap-4">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`product-card ${!product.inStock ? 'opacity-50' : ''}`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="product-image h-24 mb-3">
                      {getProductImage(product)}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                        <p className="text-xs text-secondary line-clamp-2">{product.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-accent">
                          {formatCurrency(product.price)}
                        </span>
                        {!product.inStock ? (
                          <span className="badge badge-danger text-xs">Out</span>
                        ) : (
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.id);
                            }}
                          >
                            <Plus size={12} />
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
                    className={`cart-item flex items-center gap-4 ${!product.inStock ? 'opacity-50' : ''}`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="w-16 h-16 bg-bg-tertiary rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {getProductImage(product)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-secondary truncate">{product.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-base font-bold text-accent">
                          {formatCurrency(product.price)}
                        </span>
                        {!product.inStock && (
                          <span className="badge badge-danger text-xs">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    
                    {product.inStock && (
                      <button 
                        className="btn btn-sm btn-primary flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {displayProducts.length === 0 && (
              <div className="text-center text-muted py-20">
                <div className="w-20 h-20 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package size={40} className="opacity-30" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No products found</h3>
                <p className="text-sm mb-6">
                  {searchTerm ? `No results for "${searchTerm}"` : 'No products in this category'}
                </p>
                {searchTerm && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-bg-card border-t border-border p-4">
        <button 
          className="btn btn-success w-full btn-lg"
          onClick={() => navigate('/concept3-cart')}
        >
          <ShoppingCart size={20} />
          View Cart • {cartTotals.itemCount} items • {formatCurrency(cartTotals.total)}
        </button>
      </div>
    </div>
  );
};

export default ConceptThreeProducts; 