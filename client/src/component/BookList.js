
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

function BookList() {
  console.log()
  return (
    <div id="bookList" >
    <h1> Book List Summary</h1>
      <ul id="book-list">
      <li>Book Name</li>
      </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList)



//graphql client to request data from graphql server
//appollo is the one who helps to achieve this.
