import React from 'react';
import * as Urik from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PeoplePage from './pages/PeoplePage';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

console.log('Urik', Urik)
const{ BrowserRouter , Routes, Route } = Urik
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/:category" element={<h1>Category Page</h1>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
