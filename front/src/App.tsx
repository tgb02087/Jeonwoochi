import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import RouteWrapper from './RouteWrapper';
import { theme } from './styles/theme';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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
