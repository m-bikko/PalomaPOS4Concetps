import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home, Menu,
  Grid, List, X, Package, Calendar, TrendingUp
} from 'lucide-react';

const ConceptThree = () => {
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

  const [activeTab, setActiveTab] = useState('products');
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

  const TabButton = ({ id, label, icon: Icon, badge }) => (
    <button
      className={`flex-1 flex flex-col items-center py-3 px-4 transition-all ${
        activeTab === id ? 'text-accent bg-bg-secondary border-t-2 border-accent' : 'text-secondary hover:text-primary'
      }`}
      onClick={() => setActiveTab(id)}
    >
      <div className="relative">
        <Icon size={20} />
        {badge && (
          <span className="badge badge-sm absolute -top-2 -right-2">{badge}</span>
        )}
      </div>
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );

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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary"
                onClick={() => setSearchTerm('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Tab Content */}
      <div className="flex-1 overflow-hidden">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="h-full flex flex-col">
            {/* Enhanced Category Pills & View Toggle */}
            <div className="p-4 bg-bg-card border-b border-border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold mb-1">
                    {searchTerm ? 'Search Results' : categories.find(cat => cat.id === selectedCategory)?.name}
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
                  className={`btn btn-sm whitespace-nowrap ${!searchTerm ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSearchTerm('')}
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
            </div>
          </div>
        )}

        {/* Enhanced Cart Tab */}
        {activeTab === 'cart' && (
          <div className="h-full flex flex-col">
            {/* Enhanced Cart Header */}
            <div className="p-6 bg-gradient-to-r from-bg-card to-bg-secondary border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <ShoppingCart size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Current Order</h2>
                    <p className="text-sm text-secondary">{cartTotals.itemCount} items • {formatCurrency(cartTotals.total)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Cart Items */}
            <div className="flex-1 p-4 scrollable">
              {cartItems.length === 0 ? (
                <div className="text-center text-muted py-20">
                  <div className="w-20 h-20 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={40} className="opacity-30" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Your cart is empty</h3>
                  <p className="text-sm mb-6">Browse products and add items to your cart</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('products')}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((cartItem) => {
                    const details = getCartItemDetails(cartItem);
                    if (!details) return null;

                    return (
                      <div key={cartItem.id} className="cart-item">
                        <div className="flex gap-4 mb-4">
                          <div className="w-16 h-16 bg-bg-tertiary rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0">
                            {details.product.name.charAt(0)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1">{details.product.name}</h3>
                            <p className="text-sm text-secondary mb-2">
                              {formatCurrency(details.itemPrice)} each
                            </p>
                            
                            {/* Enhanced Additional Info */}
                            {details.selectedOptionDetails.length > 0 && (
                              <div className="text-sm text-accent mb-2">
                                <strong>Extras:</strong> {details.selectedOptionDetails.map(opt => opt.name).join(', ')}
                              </div>
                            )}
                            {cartItem.note && (
                              <div className="text-sm text-warning mb-2">
                                <strong>Note:</strong> {cartItem.note}
                              </div>
                            )}
                            {cartItem.discount > 0 && (
                              <div className="text-sm text-success mb-2">
                                <strong>Discount:</strong> {cartItem.discount}% off
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold mb-2">{formatCurrency(details.finalPrice)}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              className="btn btn-sm w-10 h-10 p-0"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{cartItem.quantity}</span>
                            <button
                              className="btn btn-sm w-10 h-10 p-0"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="flex gap-3">
                            <button className="btn btn-sm btn-secondary">
                              <Edit size={16} />
                              Edit
                            </button>
                            <button 
                              className={`btn btn-sm ${cartItem.discount > 0 ? 'btn-success' : 'btn-secondary'}`}
                              onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 20)}
                            >
                              <Percent size={16} />
                              {cartItem.discount > 0 ? `${cartItem.discount}%` : 'Discount'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Enhanced Cart Actions */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-bg-secondary border-t border-border">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-base">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(cartTotals.subtotal)}</span>
                  </div>
                  {cartTotals.totalDiscount > 0 && (
                    <div className="flex justify-between text-base text-success">
                      <span>Total Savings:</span>
                      <span className="font-semibold">-{formatCurrency(cartTotals.totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold pt-4 border-t border-border">
                    <span>Total:</span>
                    <span className="text-accent">{formatCurrency(cartTotals.total)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="btn btn-success w-full btn-lg text-lg py-4">
                    <CreditCard size={20} />
                    Complete Payment • {formatCurrency(cartTotals.total)}
                  </button>
                  <div className="grid grid-2 gap-4">
                    <button className="btn btn-secondary py-3">
                      <Receipt size={16} />
                      Print Receipt
                    </button>
                    <button className="btn btn-warning py-3">
                      <Scan size={16} />
                      Scan QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Menu Tab */}
        {activeTab === 'menu' && (
          <div className="h-full p-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Settings & Menu</h2>
              
              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-3">
                    <Package className="text-accent" size={20} />
                    Store Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary">Store ID:</span>
                      <span className="font-medium">POS-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Terminal:</span>
                      <span className="font-medium">Main Counter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Shift:</span>
                      <span className="font-medium">Morning</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-3">
                    <TrendingUp className="text-success" size={20} />
                    Today's Summary
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary">Sales:</span>
                      <span className="font-medium text-success">$2,847.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Orders:</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Avg Order:</span>
                      <span className="font-medium">$18.75</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="btn btn-secondary w-full justify-start">
                    <Receipt size={16} />
                    Print Daily Report
                  </button>
                  <button className="btn btn-secondary w-full justify-start">
                    <Calendar size={16} />
                    Schedule Management
                  </button>
                  <button className="btn btn-warning w-full justify-start">
                    <Package size={16} />
                    Inventory Check
                  </button>
                  <button className="btn btn-danger w-full justify-start">
                    <X size={16} />
                    Close Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="bg-bg-card border-t border-border">
        <div className="flex">
          <TabButton 
            id="products" 
            label="Products" 
            icon={Grid}
          />
          <TabButton 
            id="cart" 
            label="Cart" 
            icon={ShoppingCart}
            badge={cartTotals.itemCount > 0 ? cartTotals.itemCount : null}
          />
          <TabButton 
            id="menu" 
            label="Menu" 
            icon={Menu}
          />
        </div>
      </div>
    </div>
  );
};

export default ConceptThree; 