$(document).ready(function () {
  var search = $("#search");
  var result = $("#result");

  function submitHandler(event) {
    event.preventDefault();

    var searchTerm = search.val();
    var selectedFormat = $("#inputGroupSelect03 option:selected").attr("value");

    if (searchTerm && selectedFormat) {
      getSearchTerm(searchTerm, selectedFormat);
    }
  }

  function getSearchTerm(term, format) {
    var apiUrl = "https://www.loc.gov/" + format + "/?q=" + term + "&fo=json";
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.results) {
            result.empty();
            for (var i = 0; i < data.results.length; i++) {
              var titleEl = $("<li>").text("title: " + data.results[i].title);
              var dateEl = $("<p>").text("date: " + data.results[i].date);
              var readMore = $("<a>")
                .attr("href", "#")
                .text("read more")
                .attr("data-index", i);
              dateEl.append(readMore);
              titleEl.append(dateEl);
              result.append(titleEl);
            }
          } else {
            result.text("No result found");
          }
        });
      }
    });
  }

  function getMoreInfo(term, format, index) {
    var apiUrl = "https://www.loc.gov/" + format + "/?q=" + term + "&fo=json";
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.results && data.results.length > index) {
            result.children().eq(index).empty();

            var titleEl = $("<li>").text("title: " + data.results[index].title);
            var dateEl = $("<p>").text("date: " + data.results[index].date);
            var descriptionEl = $("<p>").text(
              "description: " + data.results[index].description
            );
            var urlEl = $("<p>").text("URL: " + data.results[index].url);
            titleEl.append(dateEl);
            titleEl.append(descriptionEl);
            titleEl.append(urlEl);
            result.children().eq(index).append(titleEl);
            
          } else {
            result.text("No result found");
          }
        });
      }
    });
  }
  function readmoreHandler(event) {
    var readmoreEl = event.target;
    var indexNum = readmoreEl.getAttribute("data-index");
    var searchTerm = search.val();
    var selectedFormat = $("#inputGroupSelect03 option:selected").attr("value");

    if (searchTerm && selectedFormat) {
      getMoreInfo(searchTerm, selectedFormat, indexNum);
    }
  }

  $("#user-form").on("click", submitHandler);
  $(document).on("click", "#result a", readmoreHandler);
});
