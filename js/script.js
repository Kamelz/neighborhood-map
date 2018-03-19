     // Create a map variable
     var map;
     // Function to initialize the map within the map div
     function initMap() {
         map = new google.maps.Map(document.getElementById('map'), {
             center: {
                 lat: 40.74135,
                 lng: -73.99802
             },
             zoom: 14
         });
         // Create a single latLng literal object.
         var singleLatLng = {
             lat: 40.74135,
             lng: -73.99802
         };
         // Create a single marker appearing on initialize -
         var marker = new google.maps.Marker({
             position: singleLatLng,
             title: "title",
             animation: google.maps.Animation.DROP,
             id: 0,
             map: map
         });
         // Create it with the position of the singleLatLng,
         // on the map, and give it your own title!
         // create a single infowindow, with your own content.
         var largeInfowindow = new google.maps.InfoWindow();
         // It must appear on the marker
         //  create an EVENT LISTENER so that the infowindow opens when
         marker.addListener('click', function() {
             populateInfoWindow(this, largeInfowindow);
         });
         // the marker is clicked!
     }

     function populateInfoWindow(marker, infowindow) {
         // Check to make sure the infowindow is not already opened on this marker.
         if (infowindow.marker != marker) {
             infowindow.marker = marker;
             infowindow.setContent('<div>' + marker.title + '</div>');
             infowindow.open(map, marker);
             // Make sure the marker property is cleared if the infowindow is closed.
             infowindow.addListener('closeclick', function() {
                 infowindow.marker = null;
             });
         }
     }