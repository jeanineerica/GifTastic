// Assignment 6- GifTastic
// Author: Jeanine Smith
// File Created July 19, 2017 12:00PM
$(document).ready(function() {
//Celebrity Chef Array
var topics = ["Rachel Ray", "Ina Garten",
       "Bobby Flay", "Guy Fieri"];



// ADD FUNCTION TO RE-RENDER THE HTML TO DISPLAY THE CONTENT
  //AJAX CALL
      function displayName() {

        var name = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=96872b6c665d4d08a2fa7a43079179cb&q=" 
        + name + "&limit=10&offset=0&rating=G&lang=en";

        console.log(this);

        // Creating an AJAX call for the specific name button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

        //Results Loop
        var results = response.data;
        console.log(results);


        for (var p = 0; p < results.length; p++) {
 

        //Create Div to hold chefName
        var chefDiv = $("<div class='col-md-4' class='chef'>");

        //Rating
        var rating = results[p].rating;
        var ratingText = $("<p>").text("Rating: " + rating);

        //Image
        var chefImg = $("<img>");
        chefImg.attr("src", results[p].images.fixed_height_still.url);

        //pulling still images from object and adding new attribute called still
        chefImg.attr("still", results[p].images.fixed_height_still.url);
        //pulling animated images from object and adding new attribute called animate
        chefImg.attr("animate", results[p].images.fixed_height.url);
        //adding new atrribute 
        chefImg.attr("state", "still")
        //adding class to images so we can call all
        chefImg.addClass("gifs")

        chefDiv.prepend(ratingText);
        chefDiv.prepend(chefImg);

        $("#giphy-here").prepend(chefDiv);

          console.log(results[p].url);
          var animate = results[p].url;

       }; 



              
        }); 
     };

     //Reset Form
  function myFunction() {
  document.getElementById("name-form").reset();
    }

// Funtion to display Chef name
function renderButtons() {

  //Prevents Repeat Buttons
  $('#btn-view').empty();

  //Loop of Topics
  for (var i = 0; i < topics.length; i++) {

    //Generate Buttons
    var nameBtn = $("<button>");

    //Add Class
    nameBtn.addClass("chefname");

    //Add data-attr
    nameBtn.attr("data-name", topics[i]);

    //Add text to btn
    nameBtn.text(topics[i]);

    //Add btn to btn-view
    $("#btn-view").append(nameBtn);
  }
}        

//Events where the name btn is clicked
$("#add-name").on("click", function(event) {
  event.preventDefault();

  var name = $("#name-input").val().trim();
  topics.push(name);

  renderButtons();
});

// $(document).on("click", ".chefname", displayName);

renderButtons();

    $(document).on("click", ".chefname", displayName);

  
      $(document).on("click", ".gifs", function() {
        var giphy = $(this).attr("state");
        var pic = $(this).attr("still");
        var moving = $(this).attr("animate");

        if (giphy === "still") {
          $(this).attr("src", moving);
          $(this).attr("state", "animate");
        }
        else {
          $(this).attr("src", pic);
          $(this).attr("state", "still");
        }
      });

});
