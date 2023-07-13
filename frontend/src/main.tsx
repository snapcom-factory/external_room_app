import React from 'react'
import ReactDOM from 'react-dom/client'

//* Authentification
import AuthContextProvider from "./services/AuthContextProvider";

//* React Query
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//* Data
import DataContextProvider from './data/Queries.tsx';

//* React Router
import { BrowserRouter as Router } from 'react-router-dom'

//* Components
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <DataContextProvider>
          <Router>
            <App />
          </Router>
        </DataContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
