$(document).ready(function() {
  var topics = [
    "happy",
    "dancing",
    "laughing",
    "excited",
    "thumbsup",
    "facepalm",
    "whatever",
    "scream",
    "love",
    "sad",
    "yes",
    "applause",
    "wow",
    "angry",
    "confused",
    "thankyou",
    "omg"
  ];
  // Function for displaying gifs data

  function displayGifsInfo(topic) {
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=ODulMeCeHN13kEbiCRjMZTImlz61b3CY&limit=10&offset=0&rating=R&lang=en`;
    // "https://api.giphy.com/v1/gifs/search?q=" +
    // topic +
    // "&api_key=ODulMeCeHN13kEbiCRjMZTImlz61b3CY&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("then!");
      console.log(response);
      renderGifs(response.data);
      renderRating(response.data[index].rating);
    });
  }

  // Function for dumping the JSON content for each button into <button> tags
  function renderButtons() {
    $("#buttons-view").empty();

    //2.  Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Then dynamically generating buttons for each gifs in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var newButton = $("<button>");
      // Adding a class of gifs to our button
      newButton.addClass("gifs btn");
      // Adding a data-attribute
      newButton.attr("data-name", topics[i]);
      // Providing the initial button text
      newButton.text(topics[i]);
      // Adding the button to the buttonContainer div
      $("#buttons-view").append(newButton);
    }
  }
  // Function for dumping the JSON content for each Gif into <img> tags
  function renderGifs(data) {
    $("#topics-view").empty();

    data.forEach(function(element) {
      var newGif = $("<img>")
        .attr({
          src: element.images.fixed_height_small_still.url,
          "data-still-src": element.images.fixed_height_small_still.url,
          "data-animate-src": element.images.fixed_height_small.url,
          "data-state": "still"
        })
        .addClass("gifContainer still");

      $("#topics-view").append(newGif);
  });
      addClickHandlerForGifs();
  }
  // function renderRating(){
    
  //   $("#topics-view").empty();
  //   data.forEach(function(element) {
  //     var rating = $("<span>")
  //       .attr("data-rating")
  //       .addClass("ratingContainer");

  //     $("#topics-view").append(rating);
  // });
  //     addClickHandlerForGifs();
  
  // }



  // 6.This function handles events where 'create gif' button is clicked
  $("#add-giffy").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gifs = $("#giffy-input")
      .val()
      .trim();

    // Adding the gifs from the textbox to array
    if (gifs) {
      topics.push(gifs);
      console.log(topics);
      renderButtons();
    } else {
      return;
    }
  });

  // Calling renderButtons which handles the processing of gifs array
  renderButtons();

  $("#buttons-view").click(function(event) {
    var topic = $(event.target).attr("data-name");
    displayGifsInfo(topic);
  });

  function addClickHandlerForGifs () {

    $(".gifContainer").click(function(event) {

      $(".animated").attr('src', function (){
        return $(this).attr("data-still-src");
      });

      var state = $(event.target).attr("data-state");
      var targetGif = $(event.target);
  
      if (state === "still") {
        targetGif.attr('src', targetGif.attr("data-animate-src")).removeClass('still').addClass('animated');
      } else {
        targetGif.attr('src', targetGif.attr("data-still-src")).removeClass('animated').addClass('still');
      }
    });
  }
});

/*
* TODOS 
* 1. handle duplicate input (while adding buttons)
* 2. Add pagenation (you need to increment the offset value in gify URL)
* 3. Add a dynamic way to select number of results (create a select dropdown and hook it to the limit in URL, keep a default !!)
* 4. Padding and cursor pointer for GIF images.
*/
