var initlocations = [{
    title: 'Park Ave Penthouse',
    location: {
        lat: 40.7713024,
        lng: -73.9632393
    }
}, {
    title: 'Chelsea Loft',
    location: {
        lat: 40.7444883,
        lng: -73.9949465
    }
}, {
    title: 'Union Square Open Floor Plan',
    location: {
        lat: 40.7347062,
        lng: -73.9895759
    }
}, {
    title: 'East Village Hip Studio',
    location: {
        lat: 40.7281777,
        lng: -73.984377
    }
}, {
    title: 'Baruch College',
    location: {
        lat: 40.740199,
        lng: -73.983374
    }
}];
var map = null;
var infowindow = null;
var MapViewModel = function() {
    var self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.74135,
            lng: -73.99802
        },
        zoom: 12
    });
    map = this.map;
    this.filteration = ko.observable('');
    this.locations = ko.observableArray(initlocations);
    this.locations = ko.computed(function() {
        var orginalLocations = self.locations();
        var filterKeyWord = self.filteration().toLowerCase();
        var locationList = [];
        if (filterKeyWord && typeof orginalLocations == "function") {
            for (var i = 0; i < orginalLocations().length; i++) {
                if (orginalLocations()[i].title.toLowerCase().indexOf(filterKeyWord) !== -1) {
                    locationList.push(orginalLocations()[i]);
                }
            }
            if (locationList.length) {
                this.markers = new Marker(ko.observableArray(locationList), self.map);
                return ko.observableArray(locationList);
            }
        }
        this.markers = new Marker(ko.observableArray(initlocations), self.map);
        return ko.observableArray(initlocations);
    });
    handleSelectLocationEvent = function(event) {
        showAll();
        for (var i = 0; i < allMarkers.length; ++i) {
            if (allMarkers[i].title == event.title) {
                populateInfoWindow(allMarkers[i], map)
                continue;
            }
            allMarkers[i].setVisible(false);
        }
    }
    showAll = function() {
        for (var i = 0; i < allMarkers.length; ++i) {
            if (allMarkers[i].title == event.title) {
                continue;
            }
            allMarkers[i].setVisible(true);
        }
    }
}
var allMarkers = [];

function populateInfoWindow(marker, map) {
    if (infowindow) {
        infowindow.setMarker = null;
        infowindow.close();
    }
    infowindow = new google.maps.InfoWindow();
    var query = 'client_id=HDPRHIXFSR5RYFE02NNVKXNE1ZT2TRLVAHSNNCLM2CYXWTQF' + '&client_secret=24TAVHUZCOMPECNDSTHOLIU3OISIYX0FPOHKJNKY25KAAFMW' + '&v=20170801' + '&ll=' + marker.position.lat() + ',' + marker.position.lng() + '&query=' + marker.title + '&limit=1';
    var foursquareAPI = 'https://api.foursquare.com/v2/venues/search?' + query;
    $.getJSON(foursquareAPI).done(function(data) {
        var results = data.response.venues[0];
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div> <p><strong>' + results.name + '</strong></p> <p>' + results.location.formattedAddress[0] + '</p> <p>' + results.location.formattedAddress[1] + '</p></div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
                marker.setAnimation(null);
            });
            for (var i = 0; i < allMarkers.length; ++i) {
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
var Marker = function(locations, map) {
    setMapOnAll(null);
    animation = !initMapFlag ? google.maps.Animation.DROP : null;
    for (var i = 0; i < locations().length; ++i) {
        this.marker = new google.maps.Marker({
            position: locations()[i].location,
            title: locations()[i].title,
            animation: animation,
            id: i,
            map: map
        });
        allMarkers.push(this.marker);
        this.marker.addListener('click', function() {
            populateInfoWindow(this, map)
        });
    }
    initMapFlag = true;
}

function setMapOnAll(map) {
    for (var i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(map);
    }
}
var initMapFlag = false;

function initMap() {
    ko.applyBindings(new MapViewModel());
}
var googleError = function() {
    alert("Error occurred while loading the map.");
}