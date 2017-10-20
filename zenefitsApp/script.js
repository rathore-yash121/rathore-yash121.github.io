
 // This example adds a search box to a map, using the Google Place Autocomplete
 // feature. People can enter geographical searches. The search box will return a
 // pick list containing a mix of places and predicted search terms.

 // This example requires the Places library. Include the libraries=places
 // parameter when you first load the API. For example:
 // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

 var markers = [];	  
   var map ;
	 
function initAutocomplete() {
	   map = new google.maps.Map(document.getElementById('map'), {
	 center: {lat: 37.77087, lng: -122.4339092},
	 zoom: 13,
	 mapTypeId: 'roadmap'
   });
   // Create the search box and link it to the UI element.
   var input = document.getElementById('s');
   var searchBox = new google.maps.places.SearchBox(input);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function() {
	 searchBox.setBounds(map.getBounds());
   });
   
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
	 searchBox.addListener('places_changed', function() {
	 var places = searchBox.getPlaces();
		
	 if (places.length == 0) {
	   return;
	 }

	 // Clear out the old markers.
	 markers.forEach(function(marker) {
	   marker.setMap(null);
	 });
	 markers = [];
		   $('#myList').empty();

	 
	 $('.result li').click(function () {
		 console.log(this)
	 });

	 // For each place, get the icon, name and location.
	 var bounds = new google.maps.LatLngBounds();
		 var i = 0 ;
	 places.forEach(function(place) {
	
	   if (!place.geometry) {
		 console.log("Returned place contains no geometry");
		 return;
	   }
		   //custom icons has a translation error
	   var icon = {
		 url: place.icon,
		 size: new google.maps.Size(71, 71),
		 origin: new google.maps.Point(0, 0),
		 anchor: new google.maps.Point(17, 34),
		 scaledSize: new google.maps.Size(25, 25)
	   };

	   // Create a marker for each place.
		   marker = new google.maps.Marker({
		 map: map,
//              icon: icon,
		 title: place.name,
		 position: place.geometry.location,
		 id: i
	 });
	 i++;

	 var placeName = place.name ;		
	 var span = $('<span />', {id:i}).append($('<p />', {html:placeName})) ;
	 var li = $('<li />').append(span) ;
	 $(".result").append(li);
		   
	   markers.push(marker);

	   if (place.geometry.viewport) {
		 // Only geocodes have viewport.
		 bounds.union(place.geometry.viewport);
	   } else {
		 bounds.extend(place.geometry.location);
	   }
	 });
	 map.fitBounds(bounds);
   });
 }



   var infowindow ;
   
   $('#myList span').live('click', 'li', function () {
	   var markerId = $(this).attr('id');
   //	alert(markers[markerId-1].title);
   //get ratings info from yelp api
   
	   var contentString = '<div id="infoWindowContent">'+
			   '<p><b>'+ markers[markerId-1].title+'<br>'+ markers[markerId-1].position+'</b></p>'+
			   '</div>';
	   if(infowindow){
		   infowindow.close();
	   }
	   infowindow = new google.maps.InfoWindow({
			   content:contentString
	   });
	   
	   infowindow.open(map, markers[markerId-1]);
   });
