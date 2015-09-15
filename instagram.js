$(function() {

      var limit = 20;
      var tag = "sport";

      function getNextPage(nextUrl) {
        $('.instGallery').html("");
        
        $.ajax({
        url:nextUrl,
        dataType:"json",
        type:"get",
        success: function(data) {
          var nextPage = data.pagination.next_url;
          console.log("nextUrl",nextPage);
          for (var i = 0; i < limit; i++) {
            var imgLink = data.data[i].images.low_resolution.url;
            $(".instGallery").append("<div class='col-xs-6 col-md-3'><img class = 'img-responsive' src='" + imgLink +"'/></div>");
            console.log("imgLink",imgLink);
          }
          var nextPage = data.pagination.next_url;
          console.log("nextUrl",nextPage);
          if(nextPage) {
            $(".instGallery").append("<button>nextPage</button>");
            $("button").click(function() {
              getNextPage(nextPage);
            });
          }

          console.log("info",data);
        },
        error: function(data) {
          console.log("Cant get the images", data);
        }

      });
      }

      var urlInsta ="https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=c1302f417cda4e09968eaec958fe0ae2";
      $.ajax({
        url:urlInsta,
        dataType:"jsonp",
        type:"get",
        success: function(data) {
          for (var i = 0; i < limit; i++) {
            var imgLink = data.data[i].images.low_resolution.url;
            $(".instGallery").append("<div class='col-xs-6 col-md-3 thumbnail'><img class = 'img-responsive' src='" + imgLink +"'/></div>");
            console.log("imgLink",imgLink);
          }
          var nextPage = data.pagination.next_url;
          $(".instGallery").append("<button><a href='"+nextPage+"'>nextPage</a></button>");
          $("button").click(function(){
            getNextPage(nextPage);
          });
          console.log("pagination",data.pagination);
         

          console.log("info",data);
        },
        error: function(data) {
          console.log("Cant get the images", data);
        }

      });


    
  
  

});