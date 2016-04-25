/*
* Tona Senete Team
* @authors Albi, Selim, Kastriot, Dardan
*/
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	if(window.cordova && window.cordova.plugins.Keyboard) {
	  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	  // for form inputs)
	  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

	  // Don't remove this line unless you know what you are doing. It stops the viewport
	  // from snapping when text inputs are focused. Ionic handles this internally for
	  // a much nicer keyboard experience.
	  cordova.plugins.Keyboard.disableScroll(true);
	}
	if(window.StatusBar) {
	  StatusBar.styleDefault();
	}
  });
})

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });
 
  $urlRouterProvider.otherwise("/");
 
})

/*
* Here are the controllers of app
*/

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	//Wait until the map is loaded
	google.maps.event.addListenerOnce($scope.map, 'idle', function(){
	 
	  var marker = new google.maps.Marker({
	      map: $scope.map,
	      animation: google.maps.Animation.DROP,
	      position: latLng
	  });      
	 
	  var infoWindow = new google.maps.InfoWindow({
	      content: "Here I am!"
	  });

	var flightPlanCoordinates = [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
        ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap($scope.map);
	 
	  google.maps.event.addListener(marker, 'click', function () {
	      infoWindow.open($scope.map, marker);
	  });
	 
	});
 
  }, function(error){
	    console.log("Could not get location");
  });
});
