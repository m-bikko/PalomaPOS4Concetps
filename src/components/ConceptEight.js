import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home, X, 
  Grid, List, Package, Coffee, Utensils, Cake, Pizza,
  MoreHorizontal
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

  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const getProductImage = (product) => {
    return product.name.charAt(0).toUpperCase();
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      1: Coffee,
      2: Utensils,
      3: Cake,
      4: Pizza
    };
    return icons[categoryId] || Package;
  };

  const displayProducts = searchTerm ? allFilteredProducts : filteredProducts;

  return (
    <div className="container h-full flex flex-col bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Home size={18} />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div>
              <h1 className="text-2xl font-light text-gray-900">POS</h1>
              <p className="text-xs text-gray-400 font-mono">v0.3.170.067234687234</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-mono text-gray-600">{formatTime(currentTime)}</div>
              <div className="text-xs text-gray-400">Live Session</div>
            </div>
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {cartTotals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                  {cartTotals.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Cart Sidebar - Left Side */}
        {showCart && (
          <div className="w-96 border-r border-gray-100 bg-white flex flex-col">
            {/* Cart Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-light text-gray-900">Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {cartTotals.itemCount} items • {formatCurrency(cartTotals.total)}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-6 scrollable">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={24} className="text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Empty cart</h3>
                  <p className="text-sm text-gray-500">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((cartItem) => {
                    const details = getCartItemDetails(cartItem);
                    if (!details) return null;

                    return (
                      <div key={cartItem.id} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{details.product.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(details.itemPrice)} each</p>
                            
                            {details.selectedOptionDetails.length > 0 && (
                              <div className="text-xs text-gray-600 mt-1">
                                + {details.selectedOptionDetails.map(opt => opt.name).join(', ')}
                              </div>
                            )}
                            {cartItem.note && (
                              <div className="text-xs text-gray-600 mt-1">Note: {cartItem.note}</div>
                            )}
                            {cartItem.discount > 0 && (
                              <div className="text-xs text-green-600 mt-1">{cartItem.discount}% off</div>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(details.finalPrice)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            >
                              <Minus size={14} className="text-gray-600" />
                            </button>
                            <span className="text-sm font-medium text-gray-900 w-8 text-center">{cartItem.quantity}</span>
                            <button
                              className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            >
                              <Plus size={14} className="text-gray-600" />
                            </button>
                          </div>

                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <Edit size={14} className="text-gray-400" />
                            </button>
                            <button 
                              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 15)}
                            >
                              <Percent size={14} className={cartItem.discount > 0 ? 'text-green-600' : 'text-gray-400'} />
                            </button>
                            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              <MoreHorizontal size={14} className="text-gray-400" />
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
              <div className="p-6 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(cartTotals.subtotal)}</span>
                    </div>
                    {cartTotals.totalDiscount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-green-600">-{formatCurrency(cartTotals.totalDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-medium border-t border-gray-100 pt-2">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(cartTotals.total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <CreditCard size={18} />
                      Pay {formatCurrency(cartTotals.total)}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        <Receipt size={16} />
                        Receipt
                      </button>
                      <button className="py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        <Scan size={16} />
                        Scan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search */}
          <div className="p-8 border-b border-gray-100">
            <div className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-200 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Categories */}
          {!searchTerm && (
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-1">
                <button
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                    !selectedCategory 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((category) => {
                  const IconComponent = getCategoryIcon(category.id);
                  return (
                    <button
                      key={category.id}
                      className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory === category.id 
                          ? 'bg-black text-white' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <IconComponent size={16} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-light text-gray-900">
                  {searchTerm ? 'Search Results' : selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {displayProducts.length} items available
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Product Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group cursor-pointer ${!product.inStock ? 'opacity-50' : ''}`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-4xl font-light text-gray-400 group-hover:bg-gray-100 transition-colors">
                      {getProductImage(product)}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-light text-gray-900">{formatCurrency(product.price)}</span>
                        {!product.inStock ? (
                          <span className="text-xs text-gray-400">Out of stock</span>
                        ) : (
                          <button 
                            className="w-8 h-8 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.id);
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors cursor-pointer ${
                      !product.inStock ? 'opacity-50' : ''
                    }`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-xl font-light text-gray-400 group-hover:bg-gray-100 transition-colors flex-shrink-0">
                      {getProductImage(product)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-light text-gray-900">{formatCurrency(product.price)}</span>
                        {!product.inStock && (
                          <span className="text-xs text-gray-400">Out of stock</span>
                        )}
                      </div>
                    </div>
                    {product.inStock && (
                      <button 
                        className="w-10 h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        <Plus size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {displayProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? `No results for "${searchTerm}"` : 'No products in this category'}
                </p>
                {searchTerm && (
                  <button 
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptEight; 