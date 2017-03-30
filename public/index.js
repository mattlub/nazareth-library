    function getBooks(callback) {
        // make request to our server (/get-books)
    }

    function renderBooks(error, booksArray) {
        // should receive an array of book objects
        if (error) {
            var errorParagraph = document.createElement('p');
            errorParagraph.innerHTML = 'Error!!';
        }
        

        // should render them to the page
    }

    // get books and render to page
    getBooks(renderList);
