function findAccountById(accounts, id) {
  let memberID = accounts.find(account => account.id === id);
  return memberID
}

function sortAccountsByLastName(accounts) {
  let accountsByLast = accounts.sort((accountA, accountB) => (accountA.name.last < accountB.name.last ? -1 : 1) );
  return accountsByLast
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    const idCount = book.borrows.filter(borrow => borrow.id === account.id).length
    return total + idCount
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  let results = [];
  for(let book in books){
    if(books[book].borrows.filter(borrow => borrow.id === account.id && !borrow.returned).length) {
      const found = 
      {
        ...books[book],
        author: authors.find(author => author.id === books[book].authorId)
      }
      results.push(found);
    }
  }
  return results;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
