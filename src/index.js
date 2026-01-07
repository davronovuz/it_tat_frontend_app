import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider, Helmet } from 'react-helmet-async'; // Helmet + Provider
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Default SEO meta */}
      <Helmet>
        <title>IT TAT – O‘quv markazi</title>
        <meta
          name='description'
          content='IT TAT o‘quv markazi – frontend, backend va IT kurslar. Biz bilan IT sohasida professional bo‘ling.'
        />
        <meta
          name='keywords'
          content='IT kurslar, frontend, backend, IT markazi, o‘quv markaz, IT training'
        />
      </Helmet>

      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
