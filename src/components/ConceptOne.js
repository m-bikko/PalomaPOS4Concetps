import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home,
  MoreHorizontal, Settings
} from 'lucide-react';

const ConceptOne = () => {
  const {
    categories,
    cartItems,
    filteredProducts,
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

  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }
    return product.name.charAt(0).toUpperCase();
  };

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All';

  return (
    <div className="container h-full flex flex-col">
      {/* Enhanced Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-sm">
            <Home size={16} />
            Home
          </Link>
          <div className="text-xl font-bold text-accent">
            PalomaPOS 0.3.170.067234687234
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="status-indicator status-online"></div>
          <div className="text-secondary font-medium">
            {formatTime(currentTime)}
          </div>
        </div>
      </header>

      {/* Enhanced Breadcrumb */}
      <div className="breadcrumb px-6">
        <span className="breadcrumb-item">POS System</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item">Classic Layout</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item">{selectedCategoryName}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
        {/* Left Side - Products */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Enhanced Controls */}
          <div className="flex gap-4 mb-6">
            {/* Dropdown 1 */}
            <div className="dropdown">
              <button 
                className="btn"
                onClick={() => setShowDropdown1(!showDropdown1)}
              >
                <Settings size={16} />
                Settings
              </button>
              {showDropdown1 && (
                <div className="dropdown-content animate-fade-in">
                  <div className="dropdown-item">
                    <Settings size={14} />
                    Print Settings
                  </div>
                  <div className="dropdown-item">
                    <Settings size={14} />
                    Display Options
                  </div>
                  <div className="dropdown-item">
                    <Settings size={14} />
                    User Preferences
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2 */}
            <div className="dropdown">
              <button 
                className="btn"
                onClick={() => setShowDropdown2(!showDropdown2)}
              >
                <MoreHorizontal size={16} />
                More
              </button>
              {showDropdown2 && (
                <div className="dropdown-content animate-fade-in">
                  <div className="dropdown-item">
                    <MoreHorizontal size={14} />
                    Reports
                  </div>
                  <div className="dropdown-item">
                    <MoreHorizontal size={14} />
                    Inventory
                  </div>
                  <div className="dropdown-item">
                    <MoreHorizontal size={14} />
                    Customers
                  </div>
                  <div className="dropdown-item">
                    <MoreHorizontal size={14} />
                    Help
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-half transform -translate-y-half text-muted" size={16} />
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="input pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Enhanced Category Tabs */}
          <div className="flex gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn px-6 py-3 ${selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Enhanced Products Grid */}
          <div className="flex-1 scrollable">
            <div className="grid grid-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`product-card ${!product.inStock ? 'opacity-50' : ''}`}
                  onClick={() => product.inStock && addToCart(product.id)}
                >
                  <div className="flex flex-col h-full">
                    {/* Enhanced Product Image/Initial */}
                    <div className="product-image">
                      {getProductImage(product)}
                    </div>
                    
                    {/* Enhanced Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-base">{product.name}</h3>
                      <p className="text-sm text-secondary mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-accent">{formatCurrency(product.price)}</span>
                        {!product.inStock && (
                          <span className="badge badge-danger">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Right Side - Cart */}
        <div className="w-96 flex flex-col bg-bg-card border border-border rounded-xl shadow-lg">
          {/* Enhanced Cart Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-t-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Current Order</h2>
                <p className="text-sm text-secondary">
                  {cartTotals.itemCount} item{cartTotals.itemCount !== 1 ? 's' : ''} • {formatCurrency(cartTotals.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Cart Items */}
          <div className="flex-1 p-6 scrollable">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-16">
                <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={24} className="opacity-50" />
                </div>
                <h3 className="font-semibold mb-2">Cart is Empty</h3>
                <p className="text-sm">Start adding products to create an order</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => {
                  const details = getCartItemDetails(cartItem);
                  if (!details) return null;

                  return (
                    <div key={cartItem.id} className="cart-item">
                      {/* Product Name & Price */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-base">{details.product.name}</h4>
                          <p className="text-sm text-secondary">{formatCurrency(details.itemPrice)} each</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{formatCurrency(details.finalPrice)}</div>
                        </div>
                      </div>
                      
                      {/* Quantity Controls & Actions */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
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
                            onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 10)}
                          >
                            <Percent size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Additional Details */}
                      {details.selectedOptionDetails.length > 0 && (
                        <div className="text-sm text-accent mb-2">
                          <strong>Extras:</strong> {details.selectedOptionDetails.map(option => option.name).join(', ')}
                        </div>
                      )}

                      {cartItem.note && (
                        <div className="text-sm text-warning mb-2">
                          <strong>Note:</strong> {cartItem.note}
                        </div>
                      )}

                      {cartItem.discount > 0 && (
                        <div className="text-sm text-success">
                          <strong>Discount:</strong> {cartItem.discount}% off (-{formatCurrency(details.discountAmount)})
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enhanced Cart Footer */}
          <div className="p-6 border-t border-border bg-bg-secondary rounded-b-xl">
            {/* Enhanced Total */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(cartTotals.subtotal)}</span>
              </div>
              {cartTotals.totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-success mb-2">
                  <span>Total Discount:</span>
                  <span>-{formatCurrency(cartTotals.totalDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                <span>Total:</span>
                <span className="text-accent">{formatCurrency(cartTotals.total)}</span>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="space-y-3">
              <button className="btn btn-success w-full btn-lg">
                <CreditCard size={18} />
                Process Payment
              </button>
              <div className="grid grid-2 gap-3">
                <button className="btn btn-secondary">
                  <Receipt size={16} />
                  Receipt
                </button>
                <button className="btn btn-warning">
                  <Scan size={16} />
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

export default ConceptOne; 