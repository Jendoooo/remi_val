import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroSection from './components/IntroSection';
import ProposalSection from './components/ProposalSection';
import CelebrationSection from './components/CelebrationSection';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('intro');

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentSection === 'intro' && (
          <IntroSection
            key="intro"
            onContinue={() => setCurrentSection('proposal')}
          />
        )}
        {currentSection === 'proposal' && (
          <ProposalSection
            key="proposal"
            onYes={() => setCurrentSection('celebration')}
          />
        )}
        {currentSection === 'celebration' && (
          <CelebrationSection key="celebration" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
