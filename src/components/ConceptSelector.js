import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, Smartphone, BarChart3, Grid, 
  Clock, ArrowRight, Zap, Users, 
  Layers, Activity, ShoppingCart, TerminalSquare, FolderTree, Sparkles, PanelLeft
} from 'lucide-react';

const ConceptSelector = () => {
  const concepts = [
    {
      id: 'concept1',
      title: 'Classic Layout',
      subtitle: 'Traditional & Reliable',
      description: 'Side-by-side layout with comprehensive product grid and detailed cart management. Perfect for desktop workflows.',
      icon: Layout,
      features: ['4-column product grid', 'Breadcrumb navigation', 'Settings dropdowns', 'Category tabs'],
      gradient: 'from-accent/20 to-accent-secondary/20',
      iconBg: 'bg-accent',
      accent: 'text-accent'
    },
    {
      id: 'concept2',
      title: 'Modern Split',
      subtitle: 'Enhanced & Efficient',
      description: 'Vertical split design with advanced search capabilities and streamlined user experience for high-volume operations.',
      icon: Layers,
      features: ['Enhanced search filters', 'User notifications', '3-column product cards', 'Inline cart controls'],
      gradient: 'from-success/20 to-accent/20',
      iconBg: 'bg-success',
      accent: 'text-success'
    },
    {
      id: 'concept3',
      title: 'Mobile-First Tabs',
      subtitle: 'Touch-Optimized',
      description: 'Separate Routes - Products & Cart pages with mobile navigation tabs and enhanced UX',
      icon: Smartphone,
      features: ['Touch-friendly tabs', 'Grid/list view toggle', 'Mobile overlay menu', 'Gesture support'],
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500',
      accent: 'text-purple-400'
    },
    {
      id: 'concept4',
      title: 'Dashboard Style',
      subtitle: 'Analytics & Control',
      description: 'Widget-based dashboard with real-time analytics, system monitoring, and comprehensive business insights.',
      icon: BarChart3,
      features: ['Analytics widgets', 'System monitoring', 'Top products insights', 'Activity tracking'],
      gradient: 'from-accent-secondary/20 to-warning/20',
      iconBg: 'bg-accent-secondary',
      accent: 'text-accent-secondary'
    },
    {
      id: 'concept5',
      title: 'Command Palette',
      subtitle: 'Keyboard-Driven',
      description: 'A keyboard-centric interface where all actions are performed through a powerful command palette. Ideal for power users.',
      icon: TerminalSquare,
      features: ['⌘K to open palette', 'Fuzzy search', 'Keyboard navigation', 'Minimalist UI'],
      gradient: 'from-danger/20 to-warning/20',
      iconBg: 'bg-danger',
      accent: 'text-danger'
    },
    {
      id: 'concept6',
      title: 'Hierarchical View',
      subtitle: 'Structured Navigation',
      description: 'A structured, drill-down interface following a "Kitchen -> Category -> Product" flow with detailed views.',
      icon: FolderTree,
      features: ['Breadcrumb navigation', 'Product detail pages', 'Step-by-step ordering', 'Clear hierarchy'],
      gradient: 'from-bg-primary to-bg-secondary',
      iconBg: 'bg-gray-500',
      accent: 'text-gray-400'
    },
    {
      id: 'concept7',
      title: 'Zen Interface',
      subtitle: 'Minimalist & Gestural',
      description: 'A zen-like floating interface with glassmorphism effects, gesture controls, and distraction-free design aesthetic.',
      icon: Sparkles,
      features: ['Glassmorphism UI', 'Swipe gestures', 'Floating elements', 'Backdrop blur effects'],
      gradient: 'from-purple-500/20 to-blue-500/20',
      iconBg: 'bg-purple-500',
      accent: 'text-purple-400'
    },
    {
      id: 'concept8',
      title: 'Left Panel Focus',
      subtitle: 'Cart-First Design',
      description: 'Revolutionary left-panel cart design with glassmorphism aesthetics, real-time order statistics, and modern split-screen workflow.',
      icon: PanelLeft,
      features: ['Left-side cart panel', 'Real-time order stats', 'Glassmorphism design', 'Modern split layout'],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500',
      accent: 'text-blue-400'
    }
  ];

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const ConceptCard = ({ concept }) => {
    const route = concept.id === 'concept3' ? '/concept3-products' : `/${concept.id}`;
    
    return (
      <Link to={route} className="group block">
        <div className={`card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br ${concept.gradient} border border-border hover:border-accent/30`}>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 ${concept.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <concept.icon size={24} className="text-white" />
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Activity size={14} />
                <span>Live Demo</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{concept.title}</h3>
                <p className={`text-sm font-medium ${concept.accent} mb-3`}>{concept.subtitle}</p>
                <p className="text-secondary leading-relaxed">{concept.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide">Key Features</h4>
                <div className="grid grid-2 gap-2">
                  {concept.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                      <span className="text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Try this concept</span>
                  <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight size={16} className="group-hover:transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container h-full flex flex-col">
      {/* Enhanced Header */}
      <header className="header flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">PalomaPOS 0.3.170.067234687234</div>
              <div className="text-sm text-secondary">Point of Sale System Concepts</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="status-indicator status-online"></div>
            <div className="text-secondary font-medium font-mono">
              <Clock size={16} className="inline mr-2" />
              {getCurrentTime()}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="p-8 bg-gradient-to-br from-bg-card to-bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Choose Your POS Experience
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Explore seven unique interface concepts, each designed for different workflows and user preferences.
            </p>
          </div>
          
          <div className="flex justify-center gap-8 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-success" />
              </div>
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users size={16} className="text-accent" />
              </div>
              <span className="text-sm font-medium">Multi-user Ready</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                <Grid size={16} className="text-warning" />
              </div>
              <span className="text-sm font-medium">Responsive Design</span>
            </div>
          </div>
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="flex-1 p-8 scrollable">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-3 gap-8">
            {concepts.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} />
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-8 bg-gradient-to-r from-bg-card to-bg-secondary rounded-xl border border-border">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">All Concepts Include</h3>
              <div className="grid grid-4 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                    <ShoppingCart size={18} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-sm">Cart Management</h4>
                  <p className="text-xs text-secondary">Add, edit, discount items with full control</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto">
                    <Grid size={18} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-sm">Product Catalog</h4>
                  <p className="text-xs text-secondary">20+ products across 4 categories</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center mx-auto">
                    <Clock size={18} className="text-warning" />
                  </div>
                  <h4 className="font-semibold text-sm">Real-time Clock</h4>
                  <p className="text-xs text-secondary">Live time display across all interfaces</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-accent-secondary/20 rounded-lg flex items-center justify-center mx-auto">
                    <BarChart3 size={18} className="text-accent-secondary" />
                  </div>
                  <h4 className="font-semibold text-sm">Dark Theme</h4>
                  <p className="text-xs text-secondary">Modern dark interface optimized for long use</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted">
              Built with React 18, React Router, Lucide Icons • Optimized for 1280x800px resolution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSelector; 