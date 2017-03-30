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

    function renderBooks(error, booksArray) {
        var booksList = document.getElementById('books-list');

        // should receive an array of book objects
        if (error) {
            booksList.innerHTML = ('Error!! ' + error);
            booksList.style.color = 'red';
            return;
        }

        var ulElement = document.createElement('ul');

        booksArray.forEach(function(book) {
            var liElement = document.createElement('li');
            var pElement = document.createElement('p');

            pElement.innerHTML = book.title;
            liElement.appendChild(pElement);
            ulElement.appendChild(liElement);
        });

        // should render them to the page
        booksList.parentNode.replaceChild(ulElement, booksList);
    }

    getBooks(renderBooks);

})();
