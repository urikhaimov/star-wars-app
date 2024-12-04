import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PeoplePage from './pages/PeoplePage';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/star-wars-app/" element={<SearchPage />} />
          <Route path="/star-wars-app/people" element={<PeoplePage />} />
          <Route path="/star-wars-app/:category" element={<h1>Category Page</h1>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
