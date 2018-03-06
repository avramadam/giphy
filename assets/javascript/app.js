$(document).ready(function(){
      var topics = ["Cats", "Dogs", "Parrots", "Gerbals", "Lizards", "Cows"];
      renderButtons();
      // Function for displaying movie data
      function renderButtons() {
        // Deleting the buttons prior to adding new topic buttons
        $("#button-view").empty();
        // Looping through array of topics
        for (var i = 0; i < topics.length; i++) {
            //console.log(topics[i]);
          // create button
          var animalButton = $("<button>");
          // Adding classes
          animalButton.addClass("animal");
          animalButton.addClass("btn");
          animalButton.addClass("btn-info");
          // Adding a data-attribute with a value of the topic at index i
          animalButton.attr("data-name-topics", topics[i]);
          // Providing the button's text with a value of the topic at index i
          animalButton.text(topics[i]);
          // Adding the button to the HTML
          $("#button-view").append(animalButton);
        }
      }

      function displayGifs(animal) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $("#gifs").empty();
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var animalDiv = $('<div class="divImg">');
                    var p =$('<p>');
                    p.text("Rating: " + results[i].rating.toUpperCase());
                    var animalImage = $('<img>');
                    animalImage.addClass('anImg')
                    animalImage.addClass('rounded');
                    animalImage.addClass("img-thumbnail");
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animalImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    animalDiv.append(animalImage);
                    animalDiv.prepend(p);
                    animalDiv.appendTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    //console.log(state);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }      
                });
            });
      }

    $(document).on('click', '.animal' ,function () {
        var animal = $(this).attr('data-name-topics');
        //console.log(animal);
        $('#gifs').empty();
        displayGifs(animal);
    });

        // handles the event when clicked
        $('#theButton').on('click', function(){
            var animalButton = $("#gif-input").val();
            console.log(animalButton);
            if (animalButton != "") {
                //add animal to topics array
                topics.push(animalButton);
                //call render buttons function
                renderButtons();
                //call displayGifs function
                console.log(animalButton);
                displayGifs(animalButton);
                //clear text box
                $("#gif-input").val("");
                return false;
            } else {
                alert("Input box cannot be null!");
            }
        })
});