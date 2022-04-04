//import React
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//imports for Apollo server
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//imports for pages/components
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//Middleware
const authLink = setContext((_, { headers }) => {
  //Authentication token in local storage
  const token = localStorage.getItem('id_token');
  //Returning headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  //Setting up auth middleware
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path='/' component={SearchBooks}/>
          <Route path='/saved' component={SavedBooks}/>
          <Route render={() => <h1>Wrong Page</h1>}/>
        </Switch>
      </>
      </Router>
    </ApolloProvider>
  );
};

export default App;
