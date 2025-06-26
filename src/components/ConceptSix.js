import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  CreditCard, 
  Plus, Minus, Home,
  Tag, FileText, CheckCircle
} from 'lucide-react';

const ConceptSix = () => {
  const {
    categories,
    products,
    cartItems,
    cartTotals,
    currentTime,
    addToCart,
    getCartItemDetails,
    formatCurrency,
    formatTime,
  } = usePOS();

  const [view, setView] = useState({ type: 'categories' }); // categories, products, productDetail
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setView({ type: 'products', categoryId: category.id });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setView({ type: 'productDetail', productId: product.id });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct.id, quantity);
    setView({ type: 'products', categoryId: selectedCategory.id });
  };

  const getProductImage = (product) => {
    if (product.image) return product.image;
    return product.name.charAt(0).toUpperCase();
  };

  const Breadcrumbs = () => (
    <div className="breadcrumb px-6">
      <button className="breadcrumb-item" onClick={() => setView({ type: 'categories' })}>Kitchen</button>
      <span className="breadcrumb-separator">›</span>
      {selectedCategory && (
        <>
          <button 
            className={`breadcrumb-item ${view.type === 'products' ? 'active' : ''}`}
            onClick={() => handleCategoryClick(selectedCategory)}
          >
            {selectedCategory.name}
          </button>
          <span className="breadcrumb-separator">›</span>
        </>
      )}
      {selectedProduct && view.type === 'productDetail' && (
        <span className="breadcrumb-item active">{selectedProduct.name}</span>
      )}
    </div>
  );

  return (
    <div className="container h-full flex flex-col">
      {/* Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="btn btn-sm"><Home size={16} />Home</Link>
          <div className="text-2xl font-bold text-accent">PalomaPOS 0.3.170.067234687234</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="status-indicator status-online"></div>
          <div className="text-secondary font-medium">{formatTime(currentTime)}</div>
        </div>
      </header>

      <Breadcrumbs />

      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0 bg-bg-card border border-border rounded-xl shadow-lg p-6">
          {view.type === 'categories' && (
            <>
              <h2 className="text-xl font-bold mb-4">Select a Category</h2>
              <div className="grid grid-4 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="card card-interactive text-center" onClick={() => handleCategoryClick(category)}>
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                ))}
              </div>
            </>
          )}

          {view.type === 'products' && (
            <>
              <h2 className="text-xl font-bold mb-4">{selectedCategory.name}</h2>
              <div className="flex-1 scrollable pr-4">
                <div className="grid grid-3 gap-4">
                  {products.filter(p => p.categoryId === view.categoryId).map(product => (
                    <div key={product.id} className={`product-card ${!product.inStock ? 'opacity-50' : ''}`} onClick={() => product.inStock && handleProductClick(product)}>
                      <div className="product-image h-24">{getProductImage(product)}</div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-secondary text-sm">{product.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-lg text-accent">{formatCurrency(product.price)}</span>
                        {!product.inStock && <span className="badge badge-danger">Out of Stock</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {view.type === 'productDetail' && selectedProduct && (
            <div className="flex gap-8">
              <div className="w-one-third">
                <div className="product-image h-48 text-5xl mb-4">{getProductImage(selectedProduct)}</div>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="text-secondary mb-4">{selectedProduct.description}</p>
              </div>
              <div className="w-two-thirds">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Tag size={18}/>Pricing</h3>
                    <div className="text-4xl font-bold text-accent mb-4">{formatCurrency(selectedProduct.price)}</div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><FileText size={18}/>Options</h3>
                    <div className="space-y-2">
                      {selectedProduct.options?.map(opt => (
                        <div key={opt.id} className="flex items-center gap-2 p-3 bg-bg-secondary rounded-lg">
                          <CheckCircle size={16} className="text-success"/>
                          <span>{opt.name} (+{formatCurrency(opt.price)})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Plus size={18}/>Quantity</h3>
                    <div className="flex items-center gap-4">
                      <button className="btn btn-lg" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={20}/></button>
                      <span className="text-4xl font-bold w-20 text-center">{quantity}</span>
                      <button className="btn btn-lg" onClick={() => setQuantity(q => q + 1)}><Plus size={20}/></button>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg w-full mt-6" onClick={handleAddToCart}>
                    Add {quantity} to Cart • {formatCurrency(selectedProduct.price * quantity)}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Cart */}
        <div className="w-96 flex flex-col bg-bg-card border border-border rounded-xl shadow-lg">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Current Order ({cartTotals.itemCount})</h2>
          </div>
          <div className="flex-1 p-6 scrollable">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-16">
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => {
                  const details = getCartItemDetails(cartItem);
                  if (!details) return null;
                  return (
                    <div key={cartItem.id} className="cart-item p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="font-semibold">{details.product.name}</p>
                          <p className="text-sm text-secondary">Qty: {cartItem.quantity}</p>
                        </div>
                        <p className="font-bold">{formatCurrency(details.finalPrice)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-border bg-bg-secondary rounded-b-xl space-y-4">
            <div className="flex justify-between font-bold text-xl">
              <span>Total:</span>
              <span>{formatCurrency(cartTotals.total)}</span>
            </div>
            <button className="btn btn-success w-full btn-lg">
              <CreditCard size={18}/>
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSix; 