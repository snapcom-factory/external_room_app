import ReactDOM from 'react-dom/client'

//* Authentification
import AuthContextProvider from "./services/AuthContextProvider";

//* React Query
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//* Data
import DataContextProvider from './services/Queries';

//* React Router
import { BrowserRouter as Router } from 'react-router-dom'

//* Components
import { CunninghamProvider } from '@openfun/cunningham-react';
import App from './App'
import './index.css'

//* Mantine
import 'dayjs/locale/fr';
import { DatesProvider } from '@mantine/dates'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthContextProvider>
    {/* <MantineProvider > */}
    <DatesProvider settings={{ locale: 'fr' }}>
      <QueryClientProvider client={queryClient}>
        <DataContextProvider>
          <Router>
            <CunninghamProvider>
              <App />
            </CunninghamProvider>
          </Router>
        </DataContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </DatesProvider>
    {/* </MantineProvider> */}
  </AuthContextProvider>
  // </React.StrictMode >
)
