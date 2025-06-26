import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ConceptOne from './components/ConceptOne';
import ConceptTwo from './components/ConceptTwo';
import ConceptThree from './components/ConceptThree';
import ConceptFour from './components/ConceptFour';
import ConceptSelector from './components/ConceptSelector';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ConceptSelector />} />
          <Route path="/concept1" element={<ConceptOne />} />
          <Route path="/concept2" element={<ConceptTwo />} />
          <Route path="/concept3" element={<ConceptThree />} />
          <Route path="/concept4" element={<ConceptFour />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 