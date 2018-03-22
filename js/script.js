
var MapViewModel = function (){
    var self = this;

    self.map =  new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.74135,
            lng: -73.99802
        },
        zoom: 5
    });

    self.locations = ko.observableArray(
        [
            {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
            {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ]
    ); 
    self.markers = new Marker(self);
}

var Marker = function(data){
    for(var i=0; i<data.locations().length; ++i ){
        this.marker = new google.maps.Marker({
            position: data.locations()[i].location,
            title: data.locations()[i].title,
            animation: google.maps.Animation.DROP,
            id: i,
            map: data.map
        });
    } 
}

function initMap() {

    ko.applyBindings(new MapViewModel());
}
