var Render = (function() {

  // should receive an array of book objects
  function renderBooksTable(error, booksArray) {
      var booksSection = document.getElementById('books-section');

      if (error) {
          booksSection.innerHTML = ('Error!! ' + error);
          booksSection.style.color = 'red';
          return;
      }

      var tableElement = document.createElement('table');
      tableElement.id = 'books-table';

      // Create table headers
      var headersRowElement = document.createElement('tr');
      var headers = ['Title', 'Author', 'Owner', 'Summary', 'Date_Created'];

      headers.forEach(function(header) {
          var thElement = document.createElement('th');
          thElement.innerHTML = header;
          headersRowElement.appendChild(thElement);
      });

      tableElement.appendChild(headersRowElement);

      booksArray.forEach(function(book) {
          var trElement = document.createElement('tr');

          headers.forEach(function(header) {
              var tdElement = document.createElement('td');
              tdElement.innerHTML = book[header.toLowerCase()];
              trElement.appendChild(tdElement);
          });
          tableElement.appendChild(trElement);
      });

      // should render them to the page
      booksSection.appendChild(tableElement);
  }

  function renderBooksList(error, booksArray) {
    var booksSection = document.getElementById('books-section');
    var listNode = document.createElement('ul');
    booksArray.forEach(function(book) {
      var liNode = document.createElement('li');

      // add html for reservations
      var reservationsHTML = '';
      book.reservations.forEach(function(reservation) {
        reservationsHTML +=
        `<div>By ${reservation.name} from ${reservation.from_date} to ${reservation.to_date}</div>`
      });
      var listHTML =
      `<div>
        <h4>${book.title}</h4>
        <p>Owned by ${book.owner}</p>
        <h6>Reservations: ${book.reservations.length}</h6>`
      + reservationsHTML
      + `</div>`;

      liNode.innerHTML = listHTML;
      listNode.appendChild(liNode);
    });
    booksSection.innerHTML = '';
    booksSection.appendChild(listNode);
  }


  return {
    renderBooksTable: renderBooksTable,
    renderBooksList: renderBooksList
  }

})();
