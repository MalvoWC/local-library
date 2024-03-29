function getTotalBooksCount(books) {
  let total = 0;
  let bookCount = books.forEach((book) => total += 1);
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  let accountCount = accounts.forEach(account => total += 1);
  return total;
}



function getBooksBorrowedCount(books) {
  return books.filter(book => book.borrows[0].returned === false).length;
}

//Declare empty object genres{}
//Loop through each book
//check if genre is in object
//If not then add the genre as a key and then number: 1
//If true then add number
//Sort by number
//Return top 5
function getMostCommonGenres(books) {
  let commonGenres = {};
  for (book in books) {
    commonGenres[books[book].genre]?
      commonGenres[books[book].genre] += 1: commonGenres[books[book].genre] = 1;
    }
  return Object.keys(commonGenres).sort((a, b) => 
    commonGenres[b] - commonGenres[a]).slice(0, 5).map(genreName => { 
    return {
      name: genreName, 
      count: commonGenres[genreName] 
    }
  });
}


//loop through books
//set name: to book.title
//set count: to book.borrow.length
//slice to length of 5
function getMostPopularBooks(books) {
  let popularBooks = []; //Declare empty array
for(book in books) { //loop thorugh books
  let bookName = books[book].title; //declaring bookName to the current books title
  let borrowCount = books[book].borrows.length; //declaring borrowCout to length of current book's borrow list
  popularBooks.push({ //pushing object into declared array
  name: bookName, //setting book name
  count: borrowCount //setting book's borrow count
  });
}
return popularBooks.sort((a, b) => b.count - a.count).slice(0, 5)}

function getMostPopularAuthors(books, authors) {
  const topFiveCount = array => {
    return array.sort((a, b) => b.count - a.count)
      .filter((_, index) => index < 5);
  }
  let authId = [];
  for (let book in books) {
    authId.push(books[book].authorId);
  }
  // Combines first and last names of authors along with associated id's 
  let authorNames = authors
    .filter(account => authId.includes(account.id))
    .reduce((acc, authName) => {
      acc.push({
        id: parseInt(`${authName.id}`),
        name: `${authName.name.first} ${authName.name.last}`
      });
      return acc;
    }, []);
  let counts = books.reduce((acc, book) => {
    if (acc[book.authorId]) {
      acc[book.authorId] += book.borrows.length;
      return acc;
    } else {
      acc[book.authorId] = book.borrows.length;
      return acc;
    }
  }, {});
  let final = authorNames.filter(name => name.id in counts).reduce((acc, names, index) => {
    acc.push({
      name: `${names.name}`,
      count: parseInt(`${counts[names.id]}`)
    });
    return acc;
  }, []);
  return topFiveCount(final);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
