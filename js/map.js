
var locations = [
  ['靈感咖啡', 25.027945, 121.542308, '02-2375341', 1, 1, 0],
  ['片場咖啡', 25.028276,121.532137, '02-2375342',1, 1, 0],
  ['新洞咖啡', 25.030298,121.530077, '02-2375343',1, 1, 1],
  ['口袋咖啡', 25.019298,121.540077, '02-2375343',1, 0, 0],
  ['小米酒咖啡', 25.024298,121.540077, '02-2375343',0, 0, 0],
  ['微光咖啡', 25.027298,121.531077, '02-2375343',0, 0, 0]
];

// initialize a map 
function initialize() {
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: new google.maps.LatLng(25.027945,121.542308),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

// add marks and infowindow
    var i;
    var image = 'img/landmark.png';
    var latlng=[locations.length];
    //var image = '<img src="img/landmark.png" width=30px>';
    //var image = new google.maps.MarkerImage(
          //"img/landmark.png", //url
          //new google.maps.Size(30, 30), //size
    //);

    for (i = 0; i < locations.length; i++) {  
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          icon: image
        });  
        latlng[i] = new google.maps.LatLng(locations[i][1], locations[i][2]);
 // click marker event for all markers       
        google.maps.event.addListener(marker, 'click', function() {
        map.panTo(this.getPosition());
        });         

        var infowindow = new google.maps.InfoWindow({ width: 450 });
        //var infowindow = new google.maps.InfoWindow();
        //console.log(contentString);  

          $(document).ready(function() {
              $('img.slideshow').click(function() {
                  new google.maps.event.trigger( marker, 'click' );
              });
          });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {

            var contentString = "";
           //console.log(locations[i][4] + "and" + locations[i][5]);
            if (locations[i][4] == 1){
              contentString = '<img src="img/card_icon/wifi icon.png" width=30px>';
            }else{
              contentString = '<img src="img/card_icon/wifi icon trans.png" width=30px>';
            }
            if (locations[i][5] == 1){
              contentString = contentString + '<img src="img/card_icon/plug icon.png" width=30px>';
            }else{            
              contentString = contentString + '<img src="img/card_icon/costed-plug icon trans.png" width=30px>';   
            }
            if (locations[i][6] == 1){
              contentString = contentString + '<img src="img/card_icon/min charge icon.png" width=30px>';
            }else{            
              contentString = contentString + '<img src="img/card_icon/min charge icon trans.png" width=30px>';   
            }            
//            
            infowindow.setContent('<div id="content">'+
            '<a href="cardview_app.html"> <h5 id="firstHeading" class="infowindow">'+
            locations[i][0]+
            '</h5></a> <p>Tel: '+
            locations[i][3]+
            '</p>'+
            //'<img src="img/card_icon/wifi icon.png" width=50px>'+
            //'<img src="img/card_icon/plug icon.png" width=50px>'+
            contentString +
            '</div>');
            infowindow.open(map, marker);
          }
  // bug: index i is valid only when it is inside of setContent()
        })(marker, i) );   

    }

// automatically zoom to fit all markers
        // map: an instance of google.maps.Map object
        // latlng: an array of google.maps.LatLng objects
        var latlngbounds = new google.maps.LatLngBounds();
        for (var i = 0; i < latlng.length; i++) {
          latlngbounds.extend(latlng[i]);
        }
        map.fitBounds(latlngbounds); 

// draw circle      
  var cityCircle;
  // Construct the circle for each value in citymap.
  // Note: We scale the population by a factor of 20.
  for (var city in locations) {
    var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: new google.maps.LatLng(locations[city][1], locations[city][2]),
      radius: 150
    };
    cityCircle = new google.maps.Circle(populationOptions);
  }


// get the current location
  var GeoMarker = new GeolocationMarker(map);

/*
// draw circle     
  var cityCircle;
  // Construct the circle for each value in citymap.
  // Note: We scale the population by a factor of 20.
  
    var populationOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: GeoMarker.getPosition(),
      radius: 150
    };
    cityCircle = new google.maps.Circle(populationOptions); 
*/     

};


// add listener
google.maps.event.addDomListener(window, 'load', initialize); 

 
/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @name GeolocationMarker for Google Maps v3
 * @version version 1.0
 * @author Chad Killingsworth [chadkillingsworth at missouristate.edu]
 * Copyright 2012 Missouri State University
 * @fileoverview
 * This library uses geolocation to add a marker and accuracy circle to a map.
 * The marker position is automatically updated as the user position changes.
 */

/**
 * @constructor
 * @extends {google.maps.MVCObject}
 * @param {google.maps.Map=} opt_map
 * @param {(google.maps.MarkerOptions|Object.<string>)=} opt_markerOpts
 * @param {(google.maps.CircleOptions|Object.<string>)=} opt_circleOpts
 */
function GeolocationMarker(opt_map, opt_markerOpts, opt_circleOpts) {

  var markerOpts = {
    'clickable': false,
    'cursor': 'pointer',
    'draggable': false,
    'flat': true,
    'icon': {
        'url': 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
        'size': new google.maps.Size(34, 34),
        'scaledSize': new google.maps.Size(17, 17),
        'origin': new google.maps.Point(0, 0),
        'anchor': new google.maps.Point(8, 8)
    },
    // This marker may move frequently - don't force canvas tile redraw
    'optimized': false, 
    'position': new google.maps.LatLng(0, 0),
    'title': 'Current location',
    'zIndex': 2
  };

  if(opt_markerOpts) {
    markerOpts = this.copyOptions_(markerOpts, opt_markerOpts);
  }

  var circleOpts = {
    'clickable': false,
    'radius': 0,
    'strokeColor': '1bb6ff',
    'strokeOpacity': .4,
    'fillColor': '61a0bf',
    'fillOpacity': .4,
    'strokeWeight': 1,
    'zIndex': 1
  };

  if(opt_circleOpts) {
    circleOpts = this.copyOptions_(circleOpts, opt_circleOpts);
  }

  this.marker_ = new google.maps.Marker(markerOpts);
  this.circle_ = new google.maps.Circle(circleOpts);

  /**
   * @expose
   * @type {number?}
   */
  this.accuracy = null;

  /**
   * @expose
   * @type {google.maps.LatLng?}
   */
  this.position = null;

  /**
   * @expose
   * @type {google.maps.Map?}
   */
  this.map = null;
  
  this.set('minimum_accuracy', null);
  
  this.set('position_options', /** GeolocationPositionOptions */
      ({enableHighAccuracy: true, maximumAge: 1000}));

  this.circle_.bindTo('map', this.marker_);

  if(opt_map) {
    this.setMap(opt_map);
  }
}
GeolocationMarker.prototype = new google.maps.MVCObject;

/**
 * @override
 * @expose
 * @param {string} key
 * @param {*} value
 */
GeolocationMarker.prototype.set = function(key, value) {
  if (/^(?:position|accuracy)$/i.test(key)) {
    throw '\'' + key + '\' is a read-only property.';
  } else if (/map/i.test(key)) {
    this.setMap(/** @type {google.maps.Map} */ (value));
  } else {
    google.maps.MVCObject.prototype.set.apply(this, arguments);
  }
};

/**
 * @private
 * @type {google.maps.Marker}
 */
GeolocationMarker.prototype.marker_ = null;

/**
 * @private
 * @type {google.maps.Circle}
 */
GeolocationMarker.prototype.circle_ = null;

/** @return {google.maps.Map} */
GeolocationMarker.prototype.getMap = function() {
  return this.map;
};

/** @return {GeolocationPositionOptions} */
GeolocationMarker.prototype.getPositionOptions = function() {
  return /** @type GeolocationPositionOptions */(this.get('position_options'));
};

/** @param {GeolocationPositionOptions|Object.<string, *>} positionOpts */
GeolocationMarker.prototype.setPositionOptions = function(positionOpts) {
  this.set('position_options', positionOpts);
};

/** @return {google.maps.LatLng?} */
GeolocationMarker.prototype.getPosition = function() {
  return this.position;
};

/** @return {google.maps.LatLngBounds?} */
GeolocationMarker.prototype.getBounds = function() {
  if (this.position) {
    return this.circle_.getBounds();
  } else {
    return null;
  }
};

/** @return {number?} */
GeolocationMarker.prototype.getAccuracy = function() {
  return this.accuracy;
};

/** @return {number?} */
GeolocationMarker.prototype.getMinimumAccuracy = function() {
  return /** @type {number?} */ (this.get('minimum_accuracy'));
};

/** @param {number?} accuracy */
GeolocationMarker.prototype.setMinimumAccuracy = function(accuracy) {
  this.set('minimum_accuracy', accuracy);
};

/**
 * @private
 * @type {number}
 */
GeolocationMarker.prototype.watchId_ = -1;

/** @param {google.maps.Map} map */
GeolocationMarker.prototype.setMap = function(map) {
  this.map = map;
  this.notify('map');
  if (map) {
    this.watchPosition_();
  } else {
    this.marker_.unbind('position');
    this.circle_.unbind('center');
    this.circle_.unbind('radius');
    this.accuracy = null;
    this.position = null;
    navigator.geolocation.clearWatch(this.watchId_);
    this.watchId_ = -1;
    this.marker_.setMap(map);
  }
};

/** @param {google.maps.MarkerOptions|Object.<string>} markerOpts */
GeolocationMarker.prototype.setMarkerOptions = function(markerOpts) {
  this.marker_.setOptions(this.copyOptions_({}, markerOpts));
};

/** @param {google.maps.CircleOptions|Object.<string>} circleOpts */
GeolocationMarker.prototype.setCircleOptions = function(circleOpts) {
  this.circle_.setOptions(this.copyOptions_({}, circleOpts));
};

/**
 * @private 
 * @param {GeolocationPosition} position
 */
GeolocationMarker.prototype.updatePosition_ = function(position) {
  var newPosition = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude), mapNotSet = this.marker_.getMap() == null;

  if(mapNotSet) {
    if (this.getMinimumAccuracy() != null &&
        position.coords.accuracy > this.getMinimumAccuracy()) {
      return;
    }
    this.marker_.setMap(this.map);
    this.marker_.bindTo('position', this);
    this.circle_.bindTo('center', this, 'position');
    this.circle_.bindTo('radius', this, 'accuracy');
  }

  if (this.accuracy != position.coords.accuracy) {
    // The local set method does not allow accuracy to be updated
    google.maps.MVCObject.prototype.set.call(this, 'accuracy', position.coords.accuracy);
  }

  if (mapNotSet || this.position == null ||
      !this.position.equals(newPosition)) {
  // The local set method does not allow position to be updated
    google.maps.MVCObject.prototype.set.call(this, 'position', newPosition);
  }
};

/**
 * @private
 * @return {undefined}
 */
GeolocationMarker.prototype.watchPosition_ = function() {
  var self = this;

  if(navigator.geolocation) {
    this.watchId_ = navigator.geolocation.watchPosition(
        function(position) { self.updatePosition_(position); },
        function(e) { google.maps.event.trigger(self, "geolocation_error", e); },
        this.getPositionOptions());
  }
};

/**
 * @private
 * @param {Object.<string,*>} target
 * @param {Object.<string,*>} source
 * @return {Object.<string,*>}
 */
GeolocationMarker.prototype.copyOptions_ = function(target, source) {
  for(var opt in source) {
    if(GeolocationMarker.DISALLOWED_OPTIONS[opt] !== true) {
      target[opt] = source[opt];
    }
  }
  return target;
};

/**
 * @const
 * @type {Object.<string, boolean>}
 */
GeolocationMarker.DISALLOWED_OPTIONS = {
  'map': true,
  'position': true,
  'radius': true
};
