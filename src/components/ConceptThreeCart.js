import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, 
  Plus, Minus, Edit, Percent, Home, ArrowLeft
} from 'lucide-react';

const ConceptThreeCart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartTotals,
    currentTime,
    updateQuantity,
    updateDiscount,
    getCartItemDetails,
    formatCurrency,
    formatTime
  } = usePOS();

  return (
    <div className="container h-full flex flex-col">
      {/* Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-sm"
            onClick={() => navigate('/concept3-products')}
          >
            <ArrowLeft size={16} />
            Back to Products
          </button>
          <Link to="/" className="btn btn-sm">
            <Home size={16} />
            Home
          </Link>
          <div className="text-xl font-bold text-accent">
            PalomaPOS 0.3.170.067234687234
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono text-sm">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <div className="flex-1 overflow-hidden">
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
                  onClick={() => navigate('/concept3-products')}
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
                <button 
                  className="btn btn-secondary w-full"
                  onClick={() => navigate('/concept3-products')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptThreeCart; 