import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home, Filter,
  User, Bell
} from 'lucide-react';

const ConceptTwo = () => {
  const {
    categories,
    products,
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

  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }
    return product.name.charAt(0).toUpperCase();
  };

  const displayProducts = searchTerm ? allFilteredProducts : filteredProducts;

  return (
    <div className="container h-full flex flex-col">
      {/* Enhanced Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="btn btn-sm">
            <Home size={16} />
            Home
          </Link>
          <div className="text-2xl font-bold text-accent">
            PalomaPOS 0.3.170.067234687234
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className={`btn btn-sm ${showNotifications ? 'btn-primary' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={16} />
              <span className="badge badge-sm absolute -top-1 -right-1">3</span>
            </button>
            {showNotifications && (
              <div className="dropdown-content animate-fade-in right-0 top-full">
                <div className="dropdown-item">
                  <Bell size={14} />
                  Low stock alert: Pepsi
                </div>
                <div className="dropdown-item">
                  <Bell size={14} />
                  New order received
                </div>
                <div className="dropdown-item">
                  <Bell size={14} />
                  Daily report ready
                </div>
              </div>
            )}
          </div>
          <button className="btn btn-sm btn-secondary">
            <User size={16} />
            <span className="font-medium">Admin</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Search Section */}
      <div className="p-6 bg-gradient-to-r from-bg-card to-bg-secondary border-b border-border">
        <div className="flex gap-4 items-center mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search for products, categories, or descriptions..."
              className="input pl-14 text-lg py-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className={`btn px-6 py-4 ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span className="font-medium">Filters</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="animate-fade-in">
            <div className="flex gap-3 flex-wrap">
              <button
                className={`btn btn-sm ${!searchTerm ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSearchTerm('')}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn btn-sm ${selectedCategory === category.id && !searchTerm ? 'btn-primary' : 'btn-secondary'}`}
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
        )}
      </div>

      {/* Main Content - Enhanced Vertical Split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Products Section - Left */}
        <div className="w-2/3 p-6 border-r border-border">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">
                  {searchTerm ? `Search Results` : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p className="text-secondary">
                  {displayProducts.length} products available
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>
              <div className="badge badge-lg">
                {displayProducts.filter(p => p.inStock).length} in stock
              </div>
            </div>
            
            <div className="flex-1 scrollable">
              <div className="grid grid-3 gap-6">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`product-card ${!product.inStock ? 'opacity-50' : ''}`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    {/* Enhanced Product Image/Initial */}
                    <div className="product-image h-28 mb-4">
                      {getProductImage(product)}
                    </div>
                    
                    {/* Enhanced Product Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                        <p className="text-sm text-secondary">{product.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-accent">
                          {formatCurrency(product.price)}
                        </span>
                        {!product.inStock ? (
                          <span className="badge badge-danger">Out of Stock</span>
                        ) : (
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product.id);
                            }}
                          >
                            <Plus size={14} />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Cart Section - Right */}
        <div className="w-1/3 flex flex-col bg-bg-card">
          {/* Enhanced Cart Header */}
          <div className="p-6 bg-gradient-to-r from-bg-secondary to-bg-tertiary border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Order Summary</h2>
                  <p className="text-sm text-secondary">Current order details</p>
                </div>
              </div>
              <div className="badge badge-lg">{cartTotals.itemCount}</div>
            </div>
          </div>

          {/* Enhanced Cart Items */}
          <div className="flex-1 p-6 scrollable">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-16">
                <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={32} className="opacity-30" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Empty Cart</h3>
                <p className="text-sm">Add items from the product catalog</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => {
                  const details = getCartItemDetails(cartItem);
                  if (!details) return null;

                  return (
                    <div key={cartItem.id} className="cart-item">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{details.product.name}</h4>
                          <div className="text-sm text-secondary">
                            {formatCurrency(details.itemPrice)} each
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{formatCurrency(details.finalPrice)}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-sm w-8 h-8 p-0"
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                          <button
                            className="btn btn-sm w-8 h-8 p-0"
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-secondary">
                            <Edit size={14} />
                          </button>
                          <button 
                            className={`btn btn-sm ${cartItem.discount > 0 ? 'btn-success' : 'btn-secondary'}`}
                            onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 15)}
                          >
                            <Percent size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Enhanced Additional Info */}
                      {details.selectedOptionDetails.length > 0 && (
                        <div className="text-sm text-accent mt-3">
                          <strong>Extras:</strong> {details.selectedOptionDetails.map(opt => opt.name).join(', ')}
                        </div>
                      )}
                      {cartItem.note && (
                        <div className="text-sm text-warning mt-2">
                          <strong>Note:</strong> {cartItem.note}
                        </div>
                      )}
                      {cartItem.discount > 0 && (
                        <div className="text-sm text-success mt-2">
                          <strong>Discount:</strong> {cartItem.discount}% off
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enhanced Cart Total & Actions */}
          <div className="p-6 bg-bg-secondary border-t border-border">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(cartTotals.subtotal)}</span>
              </div>
              {cartTotals.totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Total Savings:</span>
                  <span>-{formatCurrency(cartTotals.totalDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                <span>Total:</span>
                <span className="text-accent">{formatCurrency(cartTotals.total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="btn btn-success w-full btn-lg">
                <CreditCard size={18} />
                Process Payment • {formatCurrency(cartTotals.total)}
              </button>
              <div className="grid grid-2 gap-3">
                <button className="btn btn-secondary">
                  <Receipt size={14} />
                  Receipt
                </button>
                <button className="btn btn-warning">
                  <Scan size={14} />
                  Scan Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptTwo; 