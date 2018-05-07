$(document).ready(function(){
  var topics = ["Happy","Dancing","Laughing","Excited","Thumbs Up","Facepalm"];
      // Function for dumping the JSON content for each button into the div
   
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topics+"&api_key=ODulMeCeHN13kEbiCRjMZTImlz61b3CY&q=reactions&limit=10&offset=0&rating=R&lang=en";
        
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          $("#topics-view").text(response);
          renderButtons();
        });
      

      // Function for displaying gifs data
      function renderButtons() {

        $("#buttons-view").empty();

        //2.  Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamically generating buttons for each gifs in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newButton = $("<button>");
          // Adding a class of gifs to our button
          newButton.addClass("searchTopic");
          // Adding a data-attribute
          newButton.attr("data-name", topics[i]);
          // Providing the initial button text
          newButton.text(topics[i]);
          // Adding the button to the buttonContainer div
          $("#buttons-view").append(newButton);
        }
      }

      // 6.This function handles events where one button is clicked
      $("#add-giffy").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gifs = $("#giffy-input").val().trim();

        // Adding the gifs from the textbox to our array
        topics.push(gifs);
        console.log(topics);

        // Calling renderButtons which handles the processing of our gifs array
        renderButtons();
      });

      // Function for displaying the gifs info
      // Using $(document).on instead of $(".gifs").on to add event listeners to dynamically generated elements
     // $(document).on("click", ".searchTopic", displayGifsInfo);

      // Calling the renderButtons function to display the initial buttons
      //renderButtons();

    });