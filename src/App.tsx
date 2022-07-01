/*eslint-disable  @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useEffect } from 'react';

import { BrowserRouter, Redirect } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import AppRouter from './Router/AppRouter';

import './Styles/App.css';
import { API_URL, WS_URL } from './config';
import { userContext } from './Context/context';

interface FetchType {
  ok: boolean;
  accessToken: string;
}

function App(): JSX.Element {
  const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: 'include' });

  const refreshToken: () => void = async () => {
    const res: FetchType = (await (
      await fetch(`${API_URL}/refresh_token`, { method: 'POST', credentials: 'include' })
    ).json()) as FetchType;
    if (res.ok) {
      localStorage.setItem('token', res.accessToken);
      return res.accessToken;
    } else {
      localStorage.removeItem('token');
    }
  };

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        switch (error.extensions?.code) {
          case 'INTERNAL_SERVER_ERROR': {
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              ...oldHeaders,
              authorization: refreshToken(),
            });
            console.error('GRAPHQL_ERROR', error);
            return forward(operation);
          }
        }
      }
    }
    if (networkError) console.error('NETWORK_ERROR', networkError);
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  });

  const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'ignore',
      },
      mutate: {
        errorPolicy: 'ignore',
      },
    },
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, link]),
    credentials: 'same-origin',
  });
  //@ts-ignore
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      return <Redirect to="/home" />;
    }
  }, []);

  return (
    <BrowserRouter forceRefresh>
      <ApolloProvider client={client}>
        <userContext.Provider
          value={{
            user: {
              id: 0,
              firstname: 'string',
              lastname: 'string',
              avatar: {
                link: '',
              },
              role: 'string',
            },
          }}
        >
          <AppRouter />
        </userContext.Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
