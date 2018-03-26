
var locations =         [
    {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
    {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
    {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
    {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
    {title: 'Baruch College', location: {lat: 40.740199, lng: -73.983374}}
];

var MapViewModel = function (){
    var self = this;

    self.map =  new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.74135,
            lng: -73.99802
        },
        zoom: 12
    });

    self.locations = locations;
    
    self.markers = new Marker(self);
}

var allMarkers = [];
function populateInfoWindow(marker, infowindow,map) {

var query ='client_id=HDPRHIXFSR5RYFE02NNVKXNE1ZT2TRLVAHSNNCLM2CYXWTQF'
 + '&client_secret=24TAVHUZCOMPECNDSTHOLIU3OISIYX0FPOHKJNKY25KAAFMW' 
 + '&v=20170801'
 + '&ll='+ marker.position.lat() + ',' + marker.position.lng()
 + '&query=' + marker.title
 + '&limit=1';

var foursquareAPI = 'https://api.foursquare.com/v2/venues/search?'+query;

$.getJSON(foursquareAPI).done(function(data) {
    var results = data.response.venues[0];

    if (infowindow.marker != marker) {
        
        infowindow.marker = marker;
        infowindow.setContent('<div> <p><strong>'+results.name+'</strong></p> <p>'+results.location.formattedAddress[0]+'</p> <p>'+results.location.formattedAddress[1]+'</p></div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;
          marker.setAnimation(null);
        });

        for(var i=0; i<allMarkers.length; ++i){
            allMarkers[i].setAnimation(null);
        }
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }


      }

}).fail(function() {
    alert("Sorry, Couldn't find any data.");
});

  }


var Marker = function(data){
    for(var i=0; i<data.locations.length; ++i ){
        this.marker = new google.maps.Marker({
            position: data.locations[i].location,
            title: data.locations[i].title,
            animation: google.maps.Animation.DROP,
            id: i,
            map: data.map
        });
        allMarkers.push(this.marker);
        infowindow = new google.maps.InfoWindow();
        
        this.marker.addListener('click',function(){
            populateInfoWindow(this,infowindow,data.map)
        });  
    } 
}

function initMap() {

    ko.applyBindings(new MapViewModel());
}
