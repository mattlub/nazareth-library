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
    listNode.classList.add('books-list');
    booksArray.forEach(function(book) {
      var liNode = document.createElement('li');
      liNode.classList.add('book-list-item');
      // add html for reservations
      var reservationsHTML = '';
      book.reservations.forEach(function(reservation) {
        reservationsHTML +=
        `<ul>
          <li>By ${reservation.name} from ${reservation.from_date.slice(0,10)} to ${reservation.to_date.slice(0,10)}</li>
        </ul>`
      });

      var availableHTML = book.isAvailable ? '<p>AVAILABLE NOW</p>' : '';

      var listHTML =
      `<div>
        <h4>${book.title} by ${book.author}</h4>`
      + availableHTML
      + `<p>Summary: ${book.summary}</p>
        <p>Owner: ${book.owner}</p>
        <p>Reservations: ${book.reservations.length}</p>`
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
