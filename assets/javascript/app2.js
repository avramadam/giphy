$(document).ready(function(){
      var topics = ["Cats", "Dogs", "Parrots", "Gerbals", "Lizards", "Cows"];
      // Function for displaying movie data
      function renderButtons() {
        //console.log("this is a test!");
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#button-view").empty();
        // Looping through array of topics
        for (var i = 0; i < topics.length; i++) {
            
        //console.log(topics[i]);
          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          a.addClass("btn");
          a.addClass("btn-info");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name-topics", topics[i]);
          // Providing the button's text with a value of the movie at index i
          //a.attr();
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#button-view").append(a);
        }
      }


    //$('.btn').on('click', function() 
    $(document).on('click', '.animal' ,function () {
        var animal = $(this).attr('data-name-topics');
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $("#gifs").empty();
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function(response) {


                //console.log(response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div class="divImg">');

                    var p =$('<p/>');

                    p.text("Rating: " + results[i].rating.toUpperCase());

                    var animalImage = $('<img/>');

                    animalImage.addClass('anImg')
                    animalImage.addClass('rounded');
                    animalImage.addClass('float-left');

                    animalImage.attr('src', results[i].images.fixed_height_still.url);

                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)

                    animalImage.attr('data-animate', results[i].images.fixed_height.url)

                    .attr('data-state', 'still');

                    animalDiv.append(animalImage);
                    animalDiv.append(p);

                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(state);

                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });
    });


    
        //This function "adds" the buttons 

        // handles the event when clicked
        $('#theButton').on('click', function(){
            var animalButton = $("#gif-input").val();
            //adds the new animal
            var newButton = $("<button/>").addClass( "btn btn-info animal").attr('data-name-topics',animalButton).html(animalButton);
            
            $("#button-view").append(newButton);
                //console.log("Work");
            $("#gifs").empty();
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalButton + "&api_key=dc6zaTOxFJmzC&limit=10";
                //console.log(animalButton);

            $.ajax({
            url: queryURL,
            method: 'GET'
            })

            .done(function(response) {

            var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div class="divImg">');
                    var p =$('<p/>');
                    p.text("Rating: " + results[i].rating.toUpperCase());

                    var animalImage = $('<img/>');
                    animalImage.addClass('anImg')
                    animalImage.addClass('rounded');
                    animalImage.addClass('float-left');
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url)
                    animalImage.attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still');
                    animalDiv.append(animalImage);
                    animalDiv.append(p);
                    animalDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);
                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {                           
                        $(this).attr('src', $(this).data('still'));                   
                        $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
        })
  renderButtons();
});