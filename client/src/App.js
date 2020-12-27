
import BookList from './component/BookList';

import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';




//allow cross origin request
//appollo client setter

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
})
function App() {
  console.log(this)
  return (
    <ApolloProvider client={client}>
    <div id="main" >
    <h1> Reading Ninja</h1>
    <BookList></BookList>
    </div>
    </ApolloProvider>
  );
}

export default App;
