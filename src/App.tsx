import React from 'react';
import { Navbar } from './components/common/Navbar';
import { DocumentGenerator } from './components/generator/DocumentGenerator';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-gray-900">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <DocumentGenerator />
      </main>
    </div>
  );
};

export default App;
