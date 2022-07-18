function findAuthorById(authors, id) {
  let authorsID = authors.find(author => author.id === id);
  return authorsID
}

function findBookById(books, id) {
  let bookID = books.find(book => book.id === id);
  return bookID
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOutBooks = [];
  let returnedBooks = [];
  let allBooks = [checkedOutBooks, returnedBooks];
  const checkBookStatus = books.filter(book => book.borrows[0].returned === false? checkedOutBooks.push(book): returnedBooks.push(book));
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  let results = [];
  let bookIds = book.borrows.map(ids => ids.id);
  for(let account in accounts){
    if(bookIds.includes(accounts[account].id)){
      const found =  
      {
        ...accounts[account],
        returned: book.borrows.find(ifReturned => ifReturned.returned).returned
      }
      results.push(found);
    }
  }
  return results.slice(0,10);
}
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
