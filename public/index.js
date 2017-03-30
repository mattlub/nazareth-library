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
        // should receive an array of book objects
        if (error) {
            var errorParagraph = document.createElement('p');
            errorParagraph.innerHTML = 'Error!!';
        }
        booksArray.forEach(function(books) {

        })
        // should render them to the page

    }
    getBooks(renderBooks);

})();
