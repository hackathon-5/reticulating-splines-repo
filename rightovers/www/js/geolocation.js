var mikeLocation = {};

function watchLocation() {
    navigator.geolocation.watchPosition(function(position) {
        $('.lat').text(position.coords.latitude);
        mikeLocation.lat = position.coords.latitude;
        $('.long').text(position.coords.longitude);
        mikeLocation.long = position.coords.longitude;
    }, function(error) {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 5000
    });
}