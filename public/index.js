var hibaReads = (function() {

    function getBooks(callback) {
        // make request to our server (/get-books)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readeState === 4 && xhr.status === 200){
                callback(null, JSON.parse(xhr.responseText));
            }
            else if (xhr.status === 500){
                var errorMessage = xhr.responseText;
                callback(errorMessage, null);
            }
        }
        xhr.open('GET', '/get-books');
        xhr.send();
    }

    // should receive an array of book objects
    function renderBooks(error, booksArray) {
        var booksSection = document.getElementById('books-section');

        if (error) {
            booksSection.innerHTML = ('Error!! ' + error);
            booksSection.style.color = 'red';
            return;
        }

        var tableElement = document.createElement('table');
        tableElement.id = 'books-table';

        // Create table headers
        var trElement = document.createElement('tr');
        var headers = ['Title', 'Author', 'Owner'];

        headers.forEach(function(header) {
            var thElement = document.createElement('th');
            thElement.innerHTML = header;
            trElement.appendChild(thElement);
        });

        tableElement.appendChild(trElement);

        booksArray.forEach(function(book) {
            var trElement = document.createElement('tr');
            var tdElement = document.createElement('td');

            tdElement.innerHTML = book.title;
            trElement.appendChild(tdElement);
            tableElement.appendChild(trElement);
        });

        // should render them to the page
        booksSection.appendChild(tableElement);
    }

    getBooks(renderBooks);

})();
