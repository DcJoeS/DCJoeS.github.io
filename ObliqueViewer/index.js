// const { NULL } = require("sass");

var olMap = null;
var layerType = 'North';
var availableSurveys = [];
var dropdownElement = null;
var selectedDisplayElement = null;
var displayedDisplayElement = null;
var northElement = null;
var westElement = null;
var southElement = null;
var eastElement = null;
var vertElement = null;
var buttonsElements = null;

var initialCoordinate = null;
var parcelLayer = null;
let pin10 = null;


const queryString = window.location.search;
console.log(queryString)
const urlParams = new URLSearchParams(queryString);
const pin10hash = urlParams.get('pin10')
console.log("Pin10hash= " + pin10hash)
if (pin10hash) {
  pin10 = pin10hash
  console.log("pin10 is now:")
  console.log(pin10)
}

var selectedSurvey = {
  survey: null,
  get value() {
    return this.survey;
  },
  set value(value) {
    this.survey = value;
    //selectedDisplayElement.innerHTML = value;
  }
};

var displayedSurvey = {
  survey: null,
  get value() {
    return this.survey;
  },
  set value(value) {
    this.survey = value;
    displayedDisplayElement.innerHTML = value;
  }
};

var TILE_SIZES = {
  North: [256, 192],
  East: [192, 256],
  South: [256, 192],
  West: [192, 256],
  Vertical: [256, 256]
};

function toViewRotation(heading) {
  return degreesToRadians(modulus360(360 - heading));
}

/**
 * Provides Nearmap tile URL whenever for selected survey date and layer type
 */
function tileUrlFunction(tileCoord) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];

  return urlTemplate(z, x, y, displayedSurvey.value, layerType);
}

/**
 * Provides Nearmap tile rotation mechanism
 */
function tileLoadFunction(imageTile, src) {
  var img = imageTile.getImage();

  fetchImageData(src)
    .then(function(imgData) {
      if (imgData && layerType !== 'Vert') {
        rotateTile(imgData, TILE_SIZES[layerType], HEADINGS[layerType])
          .then(function(rotatedImgData) {
            img.src = rotatedImgData || '';
          });
      }

      img.src = imgData || '';
    });
}

/**
 * Create Openlayers projection with coresponding rotation and projection
 */
function createView(zoom, center, extent) {
  zoom = zoom || ZOOM;
  center = center || CENTER;
  extent = extent || EXTENT;
  view_extent =  ol.proj.transformExtent(extent, ol.proj.get('EPSG:4326'), PROJECTIONS[layerType]);
  return new ol.View({
    projection: PROJECTIONS[layerType],
    rotation: toViewRotation(HEADINGS[layerType]),
    center: ol.proj.fromLonLat(center, PROJECTIONS[layerType]),
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    zoom: zoom,
    extent: view_extent
  });
}

/**
 * Create Openlayers tileLayer with coresponding tileSize and projection
 */
function createLayer() {
  return new ol.layer.Tile({
    source: new ol.source.XYZ({
      projection: PROJECTIONS[layerType],
      tileSize: TILE_SIZES[layerType],
      tileUrlFunction: tileUrlFunction,
      tileLoadFunction: tileLoadFunction
    })
  });
}

function createParcelMarker(parcelCoordinate) {
  markerLocation = ol.proj.fromLonLat(parcelCoordinate, olMap.getView().getProjection())
  const geoMarker = new ol.Feature({
    type: 'geoMarker',
    geometry: new ol.geom.Point(markerLocation),
  });
  const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [geoMarker],
    }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({color: '#117E8D'}),
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    })
  });
  return vectorLayer
}

function createParcelLayer(pin10) {
  if (pin10) {
    console.log("pin10 exists in create parcelLayer")
    let polygonLayerURL =
      "https://gis2.co.dakota.mn.us/arcgis/rest/services/Nearmap/DC_OL_Nearmap/MapServer/1/query?outFields=TAXPIN&returnGeometry=true&outSR=4326&f=geojson";
    polygonLayerURL += "&where=TAXPIN%3D%27" + pin10 + "%27"

    const polygonSource  = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: polygonLayerURL
    });

    const polygonLayer = new ol.layer.Vector({
      source: polygonSource,
      style: new ol.style.Style({
                // fill: new ol.style.Fill({
                //   color: 'rgba(56, 168, 0, 255)',
                // }),
                stroke: new ol.style.Stroke({
                  //color: 'rgba(110, 110, 110, 255)',
                  //color: '#084D94',
                  //color: '#117E8D',
                  color: '#BB5811',
                  width: 2.5,
                })
            })
          });
    return polygonLayer;
  }
  return null;
  //olMap.getLayers().insertAt(100, polygonLayer);
}

/**
 * Calculates view bounds [minX, minY, maxX, maxY] for Nearmap coverage API.
 * Above coordinates are internally called [west, south, east, north].
 */
function getBounds() {
  var view = olMap.getView();
  var projection = view.getProjection();
  var extent = view.calculateExtent(olMap.getSize());
  var extent = ol.proj.transformExtent(extent, projection, ol.proj.get('EPSG:4326'));
  var west = extent[0];
  var south = extent[1];
  var east = extent[2];
  var north = extent[3];

  return { north: north, east: east, west: west, south: south };
};

/**
 * Called when the selected survey date does not exist in the current list of available survey dates.
 * It returns the closest available date.
 *
 * @param {*} surveys            available surveys returned by the coverage API
 * @param {*} selectedDate       user's selected survey date
 */
function findClosestDate(surveys, selectedDate) {
  var selectedDateInMs = selectedDate ? +new Date(selectedDate) : +new Date();
  var deltaInMs = surveys.map(function(survey) {
    var surveyDateInMs = +new Date(survey.captureDate);
    return Math.abs(selectedDateInMs - surveyDateInMs);
  });

  var closestDateInMs = Math.min.apply(null, deltaInMs);
  return surveys[deltaInMs.findIndex(function(ms) { return ms === closestDateInMs; })].captureDate;
};

/**
 * @param {*} availableSurveys    available surveys returned by the coverage API
 * @param {*} selectedDate        user's selected survey date
 */
function getSurveyDate(availableSurveys, selectedDate) {
  // No dates available
  if (availableSurveys.length === 0) {
    return null;
  }

  // Selects the selected survey date when available
  if (availableSurveys.find(function(survey) { return selectedDate === survey.captureDate; })) {
    return selectedDate;
  }

  // Searches for the closest available survey date when not available
  return findClosestDate(availableSurveys, selectedDate);
}

/**
 * Fetches Nearmap coverage API.
 */
function fetchCoverage() {
  var bounds = getBounds(olMap);
  var coverageUrl = coverageUrlTemplate(bounds.east, bounds.west, bounds.north, bounds.south);

  return fetch(coverageUrl)
    .then(function(response) {
      return response.json();
    });
}

/**
 * Refreshes the map tiles whenever the selected survey date changes.
 */
function refreshTiles() {
  olMap
    .getLayers()
    .item(0)
    .getSource()
    .refresh();
}

/**
 * Refreshes the map tiles whenever projection changes.
 */
function refreshView() {
  console.log("refreshView")
  var currentProject = olMap.getView().getProjection();
  var currentCenter = olMap.getView().getCenter();
  var zoom = olMap.getView().getZoom();
  var center = ol.proj.toLonLat(currentCenter, currentProject);

  return updateSurveys().then(function(){
      olMap.setView(createView(zoom, center));
      olMap.getLayers().clear();
      olMap.getLayers().push(createLayer());
      //olMap.getLayers().push(createParcelMarker(initialCoordinate));
      if (pin10) {
        olMap.getLayers().push(createParcelLayer(pin10));
      }
  });
}

/**
 * updateSurveys contains logics how to deal with coverage api while map is moving
 */
function updateSurveys() {
  // Fetches Nearmap coverage API based current view port
  return fetchCoverage()
    .then(function(response) {
      // Updates internal `availableSurveys` and `displayedSurvey` members
      availableSurveys = getAvailableSurveyDates(response);
      displayedSurvey.value = getSurveyDate(availableSurveys, selectedSurvey.value);

      // Updates available surveys dropdown options
      updateDropDown();
    });
}

/**
 * Displays all available survey dates in a dropdown.
 */
function updateDropDown() {
  // Clears up previous options
  dropdownElement.innerHTML = '';

  // Creates the content of options for select element
  availableSurveys.forEach(function(survey) {
    var optionElement = document.createElement('option');
    optionElement.setAttribute('value', survey.captureDate);
    optionElement.innerText = survey.captureDate;

    dropdownElement.add(optionElement);
  });

  // Assigns default select value
  dropdownElement.value = displayedSurvey.value;
}

/**
 * Extracts out surveys which contain corresponding tile type 
 * 
 * e.g
 *  resources:
 *    tiles:
 *      0: {id: "100-24daeea2-b95e-11e7-b260-63f23522198a", scale: 21, type: "South"}
 *      1: {id: "100-24dd2c4e-b95e-11e7-b262-7fb6c449b1f8", scale: 20, type: "West"}
 *      2: {id: "100-24d9cb12-b95e-11e7-b25f-9be25dc20646", scale: 21, type: "North"}
 *      3: {id: "100-24cf92b4-b95e-11e7-b25d-5fce962b39a4", scale: 21, type: "Vert"}
 *      4: {id: "100-24dc01fc-b95e-11e7-b261-4395884423ee", scale: 20, type: "East"}
 */
function getAvailableSurveyDates(response) {
  var surveys = response && response.surveys ? response.surveys : [];

  return surveys.filter(function(survey) {
    return (survey.resources.tiles || [])
      .some(function(tile) { return tile.type === layerType; });
  });
}

function onMapMoveHandler() {
    updateSurveys();
}

function initUiElements() {
  dropdownElement = document.querySelector('#survey-options');
  // selectedDisplayElement = document.querySelector('#selectedSurveyElementId');
  displayedDisplayElement = document.querySelector('#displayedSurveyElementId');

  northElement = document.querySelector('#northElementId');
  westElement = document.querySelector('#westElementId');
  southElement = document.querySelector('#southElementId');
  eastElement = document.querySelector('#eastElementId');
  vertElement = document.querySelector('#vertElementId');
  buttonsElements = document.getElementsByClassName(".heading-btn button");

}

let shouldUpdate = true;

// const updatePermalink = function () {
//   if (!shouldUpdate) {
//     // do not update the URL when the view was changed in the 'popstate' handler
//     shouldUpdate = true;
//     return;
//   }
//   var view = olMap.getView();
//   var center = view.getCenter();
//   var currentProject = olMap.getView().getProjection();
//   center = ol.proj.toLonLat(center, currentProject);
//   const hash =
//     '#map=' +
//     view.getZoom().toFixed(2) +
//     '/' +
//     center[0].toFixed(2) +
//     '/' +
//     center[1].toFixed(2) +
//     '/' +
//     view.getRotation();
//   const state = {
//     zoom: view.getZoom(),
//     center: view.getCenter(),
//     rotation: view.getRotation(),
//   };
//   window.history.pushState(state, 'map', hash);
// };

/**
 * Adds event listeners to map instance and UI elements.
 */
function addEventListeners() {
  // Adds map moving (panning and zooming) listener
  olMap.on('moveend', function() {
    onMapMoveHandler(dropdownElement);
    //updatePermalink();
  });


  // Adds "onChange" listener to the dropdown
  dropdownElement.addEventListener('change', function(evt) {
    selectedSurvey.value = evt.target.value;
    displayedSurvey.value = evt.target.value;

    refreshTiles();
  });


  [northElement, westElement, southElement, eastElement, vertElement]
    .forEach(function(element) {
      element.addEventListener('click', function(evt) {
        layerType = evt.target.value;
        [northElement, westElement, southElement, eastElement, vertElement]
        .forEach(function(el) {
          el.classList.remove("usa-button--active")
        })
        // $('.heading-btn button').removeClass('selected');
       evt.target.classList.add('usa-button--active');
        refreshView();
      });
    });
}

// function handleParameters(zoom, center) {
//   if (window.location.hash !== '') {
//     // try to restore center, zoom-level and rotation from the URL
//     const hash = window.location.hash.replace('#map=', '');
//     const parts = hash.split('/');
//     if (parts.length === 4) {
//       zoom = parseFloat(parts[0]);
//       center = [parseFloat(parts[1]), parseFloat(parts[2])];
//       rotation = parseFloat(parts[3]);
//     }
    
//   }
// }



function initMap() {
  // default zoom, center and rotation
  let zoom = ZOOM
  let center = CENTER
  let rotation = 0; 
  initialCoordinate = center

  // try to restore center, zoom-level and rotation from the URL
  //const hash = window.location.hash.replace('#map=', '');
  const queryString = window.location.search;
  console.log(queryString)
  
  const urlParams = new URLSearchParams(queryString);
  const mapHash = urlParams.get('map')
  //console.log(mapHash)
  if (mapHash) {
    const parts = mapHash.split('/');
    if (parts.length === 4) {
      zoom = parseFloat(parts[0]);
      center = [parseFloat(parts[1]), parseFloat(parts[2])];
      initialCoordinate = center
      rotation = parseFloat(parts[3]);
    }
  }
  
  //const pin10hash = window.location.hash.replace('#pin10=', '');
  const pin10hash = urlParams.get('pin10')
  console.log("Pin10hash= " + pin10hash)
  if (pin10hash) {
    pin10 = pin10hash
    console.log("pin10 is now:")
    console.log(pin10)
  }

  console.log("Creating new map")
  olMap = new ol.Map({
    target: 'map',
    controls: [new ol.control.Zoom()],
    layers: [ createLayer()], //
    view: createView(zoom, center)
  });
  console.log("Done creating new map")

  //olMap.addLayer(createParcelMarker(initialCoordinate))
  if (pin10) {
    console.log("pin10 exists. Executing query")
    parcelLayer = createParcelLayer(pin10)
    olMap.addLayer(parcelLayer)
  }
  
    

  initUiElements();
  addEventListeners();
}


initMap();



