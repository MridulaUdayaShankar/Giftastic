$(document).ready(function() {
  var topics = [
    "happy",
    "dancing",
    "laughing",
    "excited",
    "thumbsup",
    "facepalm"
  ];
  // Function for dumping the JSON content for each button into the div
  function displayGifsInfo(topic) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=ODulMeCeHN13kEbiCRjMZTImlz61b3CY&q=reactions&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("then!");
      console.log(response);
      renderGifs(response.data);
    });
  }

  // Function for displaying gifs data
  function renderButtons() {
    $("#buttons-view").empty();

    //2.  Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Then dynamically generating buttons for each gifs in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var newButton = $("<button>");
      // Adding a class of gifs to our button
      newButton.addClass("gifs");
      // Adding a data-attribute
      newButton.attr("data-name", topics[i]);
      // Providing the initial button text
      newButton.text(topics[i]);
      // Adding the button to the buttonContainer div
      $("#buttons-view").append(newButton);
    }
  }
  function renderGifs(data) {
    $("#topics-view").empty();
    data.forEach(function(element) {
      var newGif = $("<img>")
        .attr("src", element.images["480w_still"].url)
        .addClass("gifContainer");
      $("#topics-view").append(newGif);
    });
  }

  // 6.This function handles events where one button is clicked
  $("#add-giffy").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gifs = $("#giffy-input")
      .val()
      .trim();

    // Adding the gifs from the textbox to our array
    topics.push(gifs);
    console.log(topics);

    // Calling renderButtons which handles the processing of our gifs array
    renderButtons();
  });

  // Function for displaying the gifs info
  // Using $(document).on instead of $(".gifs").on to add event listeners to dynamically generated elements

  // $(document).on("click", ".gifs", displayGifsInfo());
  renderButtons();
  $(".gifs").click(function(event) {
    var topic = $(event.target).attr("data-name");
    displayGifsInfo(topic);
  });

  // Calling the renderButtons function to display the initial buttons

  // // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  // var state = $(this).attr("data-state");
  // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // // Then, set the image's data-state to animate
  // // Else set src to the data-still value
  // if (state === "still") {
  //   $(this).attr("src", $(this).attr("data-animate"));
  //   $(this).attr("data-state", "animate");
  // } else {
  //   $(this).attr("src", $(this).attr("data-still"));
  //   $(this).attr("data-state", "still");
  // }
});
