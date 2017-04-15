var nazarethLibrary = (function() {

  function postRequest(url, data){
    // data should be valid json
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(JSON.stringify(data));
  }

  function getFormData(form) {
    var data = {};
    form.querySelectorAll('input').forEach(function(input) {
      data[input.name] = input.value;
    })
    return data;
  }

  var reservationsFormNodeList = document.querySelectorAll('.reservations-form');

  // reservation form submit listeners
  reservationsFormNodeList.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var bookId = form.dataset['book_id'];
      // get form data
      var reservationData = getFormData(form);
      reservationData.book_id = bookId;
      // validate?
      console.log(reservationData);
      // send post request
      postRequest('./add-reservation', reservationData)
    });
  });

})();
