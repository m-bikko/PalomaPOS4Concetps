import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConceptSelector from './components/ConceptSelector';
import ConceptOne from './components/ConceptOne';
import ConceptTwo from './components/ConceptTwo';
import ConceptThree from './components/ConceptThree';
import ConceptFour from './components/ConceptFour';
import ConceptFive from './components/ConceptFive';
import ConceptSix from './components/ConceptSix';
import ConceptSeven from './components/ConceptSeven';
import ConceptEight from './components/ConceptEight';
import ConceptThreeProducts from './components/ConceptThreeProducts';
import ConceptThreeCart from './components/ConceptThreeCart';
import { POSProvider } from './hooks/usePOS';

function App() {
  return (
    <POSProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ConceptSelector />} />
          <Route path="/concept1" element={<ConceptOne />} />
          <Route path="/concept2" element={<ConceptTwo />} />
          <Route path="/concept3" element={<ConceptThree />} />
          <Route path="/concept3-products" element={<ConceptThreeProducts />} />
          <Route path="/concept3-cart" element={<ConceptThreeCart />} />
          <Route path="/concept4" element={<ConceptFour />} />
          <Route path="/concept5" element={<ConceptFive />} />
          <Route path="/concept6" element={<ConceptSix />} />
          <Route path="/concept7" element={<ConceptSeven />} />
          <Route path="/concept8" element={<ConceptEight />} />
        </Routes>
      </Router>
    </POSProvider>
  );
}

export default App; 