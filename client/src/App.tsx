import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import BookTable from './components/BookTable';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <h1>Book site</h1>
        <BookTable />
      </div>
    </ApolloProvider>
  )
}

export default App;
