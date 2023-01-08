import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { AuthProvider } from './context/AuthProvider';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
  </AuthProvider>


);

