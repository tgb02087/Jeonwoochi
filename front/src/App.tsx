import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Interest from './components/pages/Interest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MapAPI from './components/pages/MapAPI';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/interest" element={<Interest />}></Route>
            <Route path="/map/:id" element={<MapAPI />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
