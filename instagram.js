$(function() {

      var limit = 20;
      var tag = "novak";
      var id = "max_tag_id";

      function getNextPage(id, nextId) {

        $('.instGallery').html("");
        console.log("nextId",nextId);
        
        $.ajax({
        url:"https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=c1302f417cda4e09968eaec958fe0ae2&"+id+"="+nextId+"",
        dataType:"jsonp",
        type:"get",
        success: function(data) {

          for (var i = 0; i < limit; i++) {
            var imgLink = data.data[i].images.low_resolution.url;
            $(".instGallery").append("<div class='col-xs-6 col-md-3'><img class = 'img-responsive' src='" + imgLink +"'/></div>");
            console.log("imgLink",imgLink);
          }
          var maxId = data.pagination.next_max_id;
          console.log("nextUrl",data.pagination.next_max_id);
          if(maxId) {
            $(".instGallery").append("<button>nextPage</button>");
            $("button").click(function() {
              var id = "max_tag_id";
              getNextPage(id, maxId);
            });
         


          }
           var minId = data.pagination.min_tag_id;
          console.log("minId",minId);
          $(".instGallery").append("<button class='refresh'>refresh page</button>");
          $("button.refresh").click(function() {
              var id = "min_tag_id";
              getNextPage(id, maxId);
            });


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
          maxId = data.pagination.next_max_id;
          if (maxId) {
            $(".instGallery").append("<button>next page</button>");
            $("button").click(function(){
              getNextPage(maxId);
            });
          }
          var minId = data.pagination.min_tag_id;
          console.log("minId",minId);
          $(".instGallery").append("<button class='refresh'>refresh page</button>");
          $("button.refresh").click(function() {
              var id = "min_tag_id";
              getNextPage(id, maxId);
            });
          console.log("pagination",data.pagination);
          
          console.log("maxId",data.pagination.next_max_id);

          console.log("info",data);
        },
        error: function(data) {
          console.log("Cant get the images", data);
        }

      });


    
  
  

});