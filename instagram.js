$(function() {

  //variable used to limit the number of images when looping out of the ajax success into html   
  var limit = 20;

  // variable used as a searching tag used in the url
  var tag = "trademarks";

  // get new images
  function getNextPage(nextId) {

    // check if the particular id (next_url) is sent as an argument
    console.log("nextId",nextId);

    //empty the div element
    $('.instGallery').html("");

    //send request to api instagram to get the data
    $.ajax({
      url:"https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=c1302f417cda4e09968eaec958fe0ae2&max_tag_id="+nextId+"",
      dataType:"jsonp",
      type:"get",
      success: function(data) {
        console.log("info",data);

        //loop through the data object
        for (var i = 0; i < limit; i++) {

        //store the link of the images into the variable
        var imgLink = data.data[i].images.low_resolution.url;

          //create an element, set the images and then append it to the html div element with class .instGallery  
          $(".instGallery").append("<div class='col-xs-6 col-md-3'><img class = 'img-responsive' src='" + imgLink +"'/></div>");
          console.log("imgLink",imgLink);
        }
        //set the id for the next_url(next set of images) into the variable
        var maxId = data.pagination.next_max_id;
        console.log("nextUrl",data.pagination.next_max_id);

        //if there are more images with the same tag, append the button and run the this function again, 
        //with the next_url(id) as a argument
        if(maxId) {
          $(".instGallery").append("<button>nextPage</button>");
          $("button").click(function() {
            getNextPage(maxId);
          });
        }

      },
      //if there is no data from the request show this in the console log
      error: function(data) {
        console.log("Cant get the images", data);
      }

    });
  }
    var urlInsta ="https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=c1302f417cda4e09968eaec958fe0ae2";
    //run on DOM ready, same ajax as the first but with permanent url

    $.ajax({
      url:urlInsta,
      dataType:"jsonp",
      type:"get",
      success: function(data) {
        console.log("info",data);
        for (var i = 0; i < limit; i++) {
          var imgLink = data.data[i].images.low_resolution.url;
          $(".instGallery").append("<div class='col-xs-6 col-md-3 thumbnail'><img class = 'img-responsive' src='" + imgLink +"'/></div>");
          console.log("imgLink",imgLink);
        }
        maxId = data.pagination.next_max_id;
        console.log("maxId",data.pagination.next_max_id);
          if (maxId) {
            $(".instGallery").append("<button>next page</button>");
            $("button").click(function(){
              getNextPage( maxId);
            });
          }
        },
      error: function(data) {
        console.log("Cant get the images", data);
      }
    });
});