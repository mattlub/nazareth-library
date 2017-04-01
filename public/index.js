var hibaReads = (function() {

    function getBooks(callback) {
        // make request to our server (/get-books)
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200){
                callback(null, JSON.parse(xhr.responseText));
            }
            else if (xhr.status === 500) {
                var errorMessage = xhr.responseText;
                callback(errorMessage, null);
            }
        }
        xhr.open('GET', '/get-books');
        xhr.send();
    }

    getBooks(Render.renderBooksList);

})();
