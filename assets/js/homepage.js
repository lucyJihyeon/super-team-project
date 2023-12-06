$(document).ready(function()  {
    var search = $("#search");
    var result = $("#result");
   
    function submitHandler(event)   {
        event.preventDefault();

        var searchTerm = search.val();
        var selectedFormat = $("#inputGroupSelect03 option:selected").attr("value");
        
        if (searchTerm && selectedFormat)   {
            getSearchTerm(searchTerm, selectedFormat);
            
        } 
    };

    function getSearchTerm(term, format)    {
        var apiUrl = "https://www.loc.gov/" +format +"/?q=" + term + "&fo=json";
        fetch(apiUrl)
            .then(function (response)   {
                if (response.ok)    {
                    response.json().then(function (data)    {
                        console.log(data.results);
                        if (data.results)   {
                            result.html="";
                            for (var i = 0; i < data.results.length; i++)   {
                                console.log(data.results[i].date);
                                console.log(data.results[i].title);
                                var titleEl = $("<li>").text(data.results[i].title);
                                var dateEl = $("<li>").text(data.results[i].date);
                                result.append(titleEl);
                                result.append(dateEl);

                            }
                        }   else{
                            result.text("No result found");
                        }
                    });
                }
            })
    }



    $("#user-form").on("click", submitHandler)

})