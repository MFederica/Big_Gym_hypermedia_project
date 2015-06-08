$(document).ready(ready);

var elements;
var map;

function ready() {




    function initialize() {

        $.ajax({
            method: "POST",
            //dataType: "json", //type of data
            crossDomain: true, //localhost purposes
            url: "http://biggympolimi.altervista.org/php/getContactInfo.php", //Relative or absolute path to file.php file DA CAMBIARE
            error: function (data) {
                //do error stuff
            },
            success: function (response) {

                console.log(JSON.parse(response));
                elements = JSON.parse(response);
                console.log(elements[0].lat);
                console.log(elements[0].long);

                var lat = elements[0].lat
                var long = elements[0].long;

                var mapCanvas = document.getElementById('map-canvas');
                var mapOptions = {
                    center: new google.maps.LatLng(lat, long),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                map = new google.maps.Map(mapCanvas, mapOptions);



                var contentString = "<div class='content'style='text:centered'><h4>" + elements[0].name + "</h4><p>" + elements[0].address + "<br>" + elements[0].city + "<br>Phone:" + elements[0].phone + "<br>" + elements[0].email + "</p></div>"

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(elements[0].lat, elements[0].long),
                    map: map,
                    title: "Big Gym",
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                createInfo(elements);

                $("#info").html(contentString);
            }

        });

        function createInfo(elements) {

            var info = "<h2 id='title'>" + elements[0].title + "</h2><h4>" + elements[0].where1 + " <i class='fa fa-train'></i></h4><p>" + elements[0].par1 + "</p><h4> " + elements[0].where2 + " <i class='fa fa-train'></i></h4> <p>" + elements[0].par2 + "</p><h4>" + elements[0].where3 + " <i class='fa fa-train'></i></h4><p>" + elements[0].par3 + "</p>"

            $("#text").html(info);
        }


    }

    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

}