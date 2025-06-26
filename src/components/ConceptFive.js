import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Home, TerminalSquare,
  X, CornerDownLeft, Star, Clock
} from 'lucide-react';

const ConceptFive = () => {
  const {
    cartItems,
    allFilteredProducts,
    cartTotals,
    currentTime,
    searchTerm,
    setSearchTerm,
    addToCart,
    updateQuantity,
    getCartItemDetails,
    formatCurrency,
    formatTime,
    getProductById
  } = usePOS();

  const [command, setCommand] = useState('');
  const [showPalette, setShowPalette] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchTerm(command);
  }, [command, setSearchTerm]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette(true);
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowPalette(false);
      }
      if (showPalette) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => Math.min(prev + 1, allFilteredProducts.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => Math.max(prev - 1, 0));
        }
        if (e.key === 'Enter' && allFilteredProducts.length > 0) {
          e.preventDefault();
          const product = allFilteredProducts[activeIndex];
          if (product) {
            addToCart(product.id);
            setCommand('');
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPalette, activeIndex, allFilteredProducts, addToCart]);

  const getProductImage = (product) => {
    if (product.image) return product.image;
    return product.name.charAt(0).toUpperCase();
  };

  const commandResultText = searchTerm 
    ? `${allFilteredProducts.length} results for "${searchTerm}"` 
    : "Recently added items";

  const displayedProducts = searchTerm ? allFilteredProducts : cartItems.map(c => getProductById(c.productId)).filter(Boolean).slice(0, 5);

  return (
    <div className="container h-full flex flex-col bg-bg-tertiary">
      {/* Header */}
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
          <button className="btn btn-sm btn-primary" onClick={() => setShowPalette(true)}>
            <TerminalSquare size={16} />
            Command Palette (⌘K)
          </button>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        {/* Left Panel: Quick Info */}
        <div className="w-96 flex flex-col gap-6">
          <div className="card h-1/2">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-secondary">Quick Actions</h3>
            <div className="space-y-3">
              <button className="btn btn-secondary w-full justify-start"><CreditCard size={14}/>Process Payment</button>
              <button className="btn btn-secondary w-full justify-start"><Receipt size={14}/>Print Receipt</button>
              <button className="btn btn-secondary w-full justify-start"><Scan size={14}/>Scan Item</button>
            </div>
          </div>
          <div className="card h-1/2">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-secondary">System Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center"><span className="text-secondary">Clock</span> <Clock size={14} /></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Network</span> <div className="status-indicator status-online ml-0"></div></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Printer</span> <div className="status-indicator status-online ml-0"></div></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Scanner</span> <div className="status-indicator status-offline ml-0"></div></div>
            </div>
          </div>
        </div>

        {/* Right Panel: Cart */}
        <div className="flex-1 flex flex-col bg-bg-card border border-border rounded-xl shadow-lg">
          <div className="p-6 border-b border-border bg-gradient-to-r from-bg-secondary to-bg-tertiary rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-secondary rounded-lg flex items-center justify-center">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Current Order</h2>
                <p className="text-sm text-secondary">{cartTotals.itemCount} items</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 scrollable">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-16">
                <h3 className="font-semibold mb-2">Cart is Empty</h3>
                <p className="text-sm">Use the command palette (⌘K) to add products.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => {
                  const details = getCartItemDetails(cartItem);
                  if (!details) return null;
                  return (
                    <div key={cartItem.id} className="cart-item">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bg-tertiary rounded-lg flex items-center justify-center text-lg font-bold">
                          {getProductImage(details.product)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{details.product.name}</h4>
                          <p className="text-sm text-secondary">{formatCurrency(details.itemPrice)} each</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{formatCurrency(details.finalPrice)}</div>
                          <div className="flex items-center justify-end gap-3 mt-2">
                            <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} className="btn btn-sm w-8 h-8 p-0"><Minus size={14}/></button>
                            <span className="font-semibold">{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} className="btn btn-sm w-8 h-8 p-0"><Plus size={14}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-border bg-bg-secondary rounded-b-xl">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-accent">{formatCurrency(cartTotals.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette */}
      {showPalette && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-24" onClick={() => setShowPalette(false)}>
          <div className="w-full max-w-2xl bg-bg-card rounded-xl shadow-xl border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products to add to cart..."
                  className="input pl-12 text-base py-3 bg-transparent border-0"
                  value={command}
                  onChange={(e) => {
                    setCommand(e.target.value);
                    setActiveIndex(0);
                  }}
                  autoFocus
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary btn btn-sm" onClick={() => setShowPalette(false)}>
                  <X size={16} /> ESC
                </button>
              </div>
            </div>
            <div className="p-4 max-h-96 scrollable">
              <p className="text-xs text-secondary mb-3 px-2 uppercase font-semibold">{commandResultText}</p>
              {displayedProducts.length > 0 ? (
                <div className="space-y-2">
                  {displayedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`p-3 rounded-lg flex items-center gap-4 cursor-pointer transition-colors ${
                        index === activeIndex ? 'bg-accent/20 text-primary' : 'hover:bg-bg-hover'
                      }`}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => {
                        addToCart(product.id);
                        setCommand('');
                      }}
                    >
                      <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center text-lg font-bold">
                        {getProductImage(product)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-secondary">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">{formatCurrency(product.price)}</span>
                        {index === activeIndex && (
                          <span className="text-sm text-secondary flex items-center gap-1">
                            <CornerDownLeft size={14}/> Add
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted">
                  <p>No products found.</p>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border text-xs text-secondary flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span><Star size={12} className="inline-block mr-1" /> Add to cart</span>
              </div>
              <span>PalomaPOS Command Palette</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptFive; 