var APIlink;

var channels = ["freecodecamp", "storbeck", "terakilobyte", "medrybw", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];



channels.forEach(function(user) {
  APIlink = "https://api.twitch.tv/kraken/streams/" + user;
  $.ajax({
      type: "GET",
      url: APIlink,
      dataType: "jsonp",
      async: false,
      success: function(data) {
        Twitch = data;

        var img, textStatus;
        var streamStatus = Twitch.stream;

        if (Twitch.stream !== null && Twitch.stream.channel.status !== undefined) {
          //console.log(Twitch.channel);
          textStatus = "<br />" + Twitch.stream.channel.status.substr(0,17) + "...";
        } else {
          textStatus = "";
        }

        //console.log(textStatus);

        //Twitch._links.channel, img = data.logo

        var printRow = function(stat, image) {
          if(stat === null) {
            printChannel("not-streaming", image, user, textStatus);
          } else {
            printChannel("streaming", image, user, textStatus);
          }
        };

        $.ajax({
          type: "GET",
          url: Twitch._links.channel,
          dataType: "jsonp",
          async: false,
          success: function(data) {
            Channel = data;
              img = Channel.logo;
              if (img === null) {img ="http://placehold.it/100x100";}
              printRow(streamStatus, img);
          }
        });



      },
      error: function(data) {
        console.log("Error with " + channels[i] + " at " + APIlink);
      }
    });

});

var printChannel = function(status, image, username, text) {
          $("#streams").append("<tr id='" + username + "' class='" + status + "'><td><a href='http://twitch.tv/" + username + "'><img src='" + image + "' class=\"logo\"/></a></td><td colspan='2'>" + username + "<span class='symbol'></span><span class='status'>" + text + "</span></td></tr>");
};

$("#search").on("keyup", function(){
  var regExText = $(this).val();
  var re = new RegExp(regExText, "gi");
  $("tr").each(function(index, value) {
    var userRow = value.getAttribute("id");
    if (userRow !== null) {

      if(userRow.search(re) === -1){
        $(this).hide();
      } else {
        $(this).show();
      }
    }
  });

  
});

