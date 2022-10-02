import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import RouteWrapper from './RouteWrapper';
import { theme } from './styles/theme';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Interest from './components/pages/Interest';
import MapAPI from './components/pages/MapAPI';
import axios from 'axios';

const defaultQueryFn = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/1`,
  );
  return data;
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        staleTime: 6 * 10 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <RouteWrapper />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
