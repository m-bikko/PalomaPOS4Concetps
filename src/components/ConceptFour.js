import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePOS } from '../hooks/usePOS';
import { 
  ShoppingCart, Receipt, CreditCard, Scan, Search, 
  Plus, Minus, Edit, Percent, Home, TrendingUp,
  Users, DollarSign, Package, Calendar, Clock,
  Settings, Filter, BarChart3, Activity
} from 'lucide-react';

const ConceptFour = () => {
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

  const [showSearch, setShowSearch] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const getProductImage = (product) => {
    if (product.image) {
      return product.image;
    }
    return product.name.charAt(0).toUpperCase();
  };

  const displayProducts = searchTerm ? allFilteredProducts : filteredProducts;

  // Mock analytics data
  const analytics = {
    sales: { value: '$2,847.50', change: '+12.5%', trend: 'up' },
    orders: { value: '47', change: '+8.2%', trend: 'up' },
    customers: { value: '38', change: '+15.8%', trend: 'up' },
    avgOrder: { value: '$18.75', change: '-2.1%', trend: 'down' }
  };

  const topProducts = displayProducts.slice(0, 6).map((product, index) => ({
    ...product,
    sales: Math.floor(Math.random() * 50) + 10,
    rank: index + 1
  }));

  const Widget = ({ title, children, className = "", onClick }) => (
    <div 
      className={`card hover:shadow-lg transition-all cursor-pointer ${className} ${
        selectedWidget === title ? 'ring-2 ring-accent' : ''
      }`}
      onClick={() => onClick && onClick(title)}
    >
      <div className="p-6">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-secondary">{title}</h3>
        {children}
      </div>
    </div>
  );

  const AnalyticsCard = ({ icon: Icon, label, value, change, trend }) => (
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        trend === 'up' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-secondary">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-success' : 'text-warning'
          }`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container h-full flex flex-col">
      {/* Enhanced Dashboard Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="btn btn-sm">
            <Home size={16} />
            Home
          </Link>
          <div className="text-2xl font-bold text-accent">
            PalomaPOS 0.3.170.067234687234
          </div>
          <div className="badge badge-lg">
            <Activity size={14} className="mr-2" />
            Dashboard Mode
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className={`btn btn-sm ${showSearch ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={16} />
            Search
          </button>
          <button className="btn btn-sm btn-secondary">
            <Filter size={16} />
            Filters
          </button>
          <button className="btn btn-sm btn-secondary">
            <Settings size={16} />
            Settings
          </button>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Search Bar */}
      {showSearch && (
        <div className="p-4 bg-gradient-to-r from-bg-card to-bg-secondary border-b border-border animate-fade-in">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-half transform -translate-y-half text-muted" size={18} />
              <input
                type="text"
                placeholder="Search products, analyze data, find insights..."
                className="input pl-12 text-base py-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn btn-sm ${
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
        </div>
      )}

      {/* Enhanced Dashboard Grid */}
      <div className="flex-1 p-6 scrollable">
        <div className="grid grid-4 gap-6 h-full">
          {/* Analytics Widgets Row */}
          <Widget title="Daily Sales" className="hover:bg-gradient-to-br hover:from-bg-card hover:to-success/5">
            <AnalyticsCard 
              icon={DollarSign}
              label="Today's Revenue"
              value={analytics.sales.value}
              change={analytics.sales.change}
              trend={analytics.sales.trend}
            />
          </Widget>

          <Widget title="Orders Today" className="hover:bg-gradient-to-br hover:from-bg-card hover:to-accent/5">
            <AnalyticsCard 
              icon={Package}
              label="Completed Orders"
              value={analytics.orders.value}
              change={analytics.orders.change}
              trend={analytics.orders.trend}
            />
          </Widget>

          <Widget title="Active Customers" className="hover:bg-gradient-to-br hover:from-bg-card hover:to-accent-secondary/5">
            <AnalyticsCard 
              icon={Users}
              label="Unique Customers"
              value={analytics.customers.value}
              change={analytics.customers.change}
              trend={analytics.customers.trend}
            />
          </Widget>

          <Widget title="Average Order" className="hover:bg-gradient-to-br hover:from-bg-card hover:to-warning/5">
            <AnalyticsCard 
              icon={TrendingUp}
              label="Per Order Value"
              value={analytics.avgOrder.value}
              change={analytics.avgOrder.change}
              trend={analytics.avgOrder.trend}
            />
          </Widget>

          {/* Enhanced Top Products Widget */}
          <Widget title="Top Products" className="col-span-2 row-span-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-secondary">Best performing items today</p>
                <button className="btn btn-sm btn-secondary">
                  <BarChart3 size={14} />
                  View All
                </button>
              </div>
              <div className="space-y-3 max-h-64 scrollable">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-sm font-bold text-white">
                      {product.rank}
                    </div>
                    <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {getProductImage(product)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-secondary">{product.sales} sold • {formatCurrency(product.price)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-success">
                        +{formatCurrency(product.price * product.sales)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Widget>

          {/* Enhanced Quick Actions Widget */}
          <Widget title="Quick Actions" className="row-span-2">
            <div className="space-y-4">
              <div className="grid grid-2 gap-3">
                <button className="btn btn-sm btn-success h-12 flex-col">
                  <Receipt size={16} />
                  <span className="text-xs">Receipt</span>
                </button>
                <button className="btn btn-sm btn-warning h-12 flex-col">
                  <Scan size={16} />
                  <span className="text-xs">Scan</span>
                </button>
                <button className="btn btn-sm btn-accent h-12 flex-col">
                  <Package size={16} />
                  <span className="text-xs">Inventory</span>
                </button>
                <button className="btn btn-sm btn-secondary h-12 flex-col">
                  <Calendar size={16} />
                  <span className="text-xs">Reports</span>
                </button>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="text-sm font-medium">System Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary">Printer</span>
                    <div className="status-indicator status-online"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary">Network</span>
                    <div className="status-indicator status-online"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary">Payment</span>
                    <div className="status-indicator status-online"></div>
                  </div>
                </div>
              </div>
            </div>
          </Widget>

          {/* Enhanced Products Grid Widget */}
          <Widget title={`Products (${displayProducts.length})`} className="col-span-2 row-span-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-secondary">
                  {searchTerm ? `Search results for "${searchTerm}"` : categories.find(cat => cat.id === selectedCategory)?.name}
                </p>
                <div className="flex gap-2">
                  <button 
                    className={`btn btn-xs ${!searchTerm ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSearchTerm('')}
                  >
                    All
                  </button>
                  {categories.slice(0, 3).map((category) => (
                    <button
                      key={category.id}
                      className={`btn btn-xs ${
                        selectedCategory === category.id && !searchTerm ? 'btn-primary' : 'btn-secondary'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSearchTerm('');
                      }}
                    >
                      {category.icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-3 gap-3 max-h-80 scrollable">
                {displayProducts.slice(0, 12).map((product) => (
                  <div
                    key={product.id}
                    className={`product-card p-3 ${!product.inStock ? 'opacity-50' : ''}`}
                    onClick={() => product.inStock && addToCart(product.id)}
                  >
                    <div className="w-full h-16 bg-bg-tertiary rounded-lg mb-2 flex items-center justify-center text-lg font-bold">
                      {getProductImage(product)}
                    </div>
                    <h4 className="font-medium text-xs mb-1 truncate">{product.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-accent">{formatCurrency(product.price)}</span>
                      {product.inStock ? (
                        <button 
                          className="btn btn-xs btn-primary p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                        >
                          <Plus size={10} />
                        </button>
                      ) : (
                        <span className="badge badge-danger text-xs">Out</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Widget>

          {/* Enhanced Current Order Widget */}
          <Widget title={`Current Order (${cartTotals.itemCount})`} className="row-span-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <ShoppingCart size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order #001</p>
                    <p className="text-xs text-secondary">Table 5</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-accent">{formatCurrency(cartTotals.total)}</div>
                  <div className="text-xs text-secondary">{cartTotals.itemCount} items</div>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center text-muted py-8">
                  <div className="w-12 h-12 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart size={20} className="opacity-30" />
                  </div>
                  <p className="text-sm">No items added</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 scrollable">
                  {cartItems.map((cartItem) => {
                    const details = getCartItemDetails(cartItem);
                    if (!details) return null;

                    return (
                      <div key={cartItem.id} className="cart-item p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-bg-tertiary rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {details.product.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs truncate">{details.product.name}</h4>
                            <p className="text-xs text-secondary">{formatCurrency(details.itemPrice)} each</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{formatCurrency(details.finalPrice)}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              className="btn btn-xs w-6 h-6 p-0"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-xs font-medium">{cartItem.quantity}</span>
                            <button
                              className="btn btn-xs w-6 h-6 p-0"
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-secondary">
                              <Edit size={10} />
                            </button>
                            <button 
                              className={`btn btn-xs ${cartItem.discount > 0 ? 'btn-success' : 'btn-secondary'}`}
                              onClick={() => updateDiscount(cartItem.id, cartItem.discount > 0 ? 0 : 10)}
                            >
                              <Percent size={10} />
                            </button>
                          </div>
                        </div>

                        {/* Enhanced Item Details */}
                        {details.selectedOptionDetails.length > 0 && (
                          <div className="text-xs text-accent mt-1">
                            +{details.selectedOptionDetails.map(opt => opt.name).join(', ')}
                          </div>
                        )}
                        {cartItem.note && (
                          <div className="text-xs text-warning mt-1">📝 {cartItem.note}</div>
                        )}
                        {cartItem.discount > 0 && (
                          <div className="text-xs text-success mt-1">🏷️ {cartItem.discount}% off</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Enhanced Payment Section */}
              {cartItems.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(cartTotals.subtotal)}</span>
                    </div>
                    {cartTotals.totalDiscount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Savings:</span>
                        <span>-{formatCurrency(cartTotals.totalDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold border-t border-border pt-2">
                      <span>Total:</span>
                      <span className="text-accent">{formatCurrency(cartTotals.total)}</span>
                    </div>
                  </div>

                  <button className="btn btn-success w-full btn-sm">
                    <CreditCard size={14} />
                    Pay {formatCurrency(cartTotals.total)}
                  </button>
                </div>
              )}
            </div>
          </Widget>

          {/* Enhanced Recent Activity Widget */}
          <Widget title="Recent Activity" className="row-span-2">
            <div className="space-y-3">
              <div className="space-y-2 max-h-40 scrollable">
                <div className="flex items-center gap-3 p-2 bg-bg-secondary rounded">
                  <div className="w-6 h-6 bg-success rounded flex items-center justify-center">
                    <DollarSign size={12} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">Order #047 completed</p>
                    <p className="text-xs text-secondary">$23.50 • 2 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-bg-secondary rounded">
                  <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
                    <Package size={12} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">Inventory updated</p>
                    <p className="text-xs text-secondary">Coffee beans • 5 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 bg-bg-secondary rounded">
                  <div className="w-6 h-6 bg-warning rounded flex items-center justify-center">
                    <Clock size={12} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">Shift started</p>
                    <p className="text-xs text-secondary">Morning shift • 3h ago</p>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-sm btn-secondary w-full">
                View All Activity
              </button>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default ConceptFour; 