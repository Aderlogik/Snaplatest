  var drawingManager;
  var selectedShape;
  var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
  var selectedColor;
  var colorButtons = {};
  function clearSelection() {
    if (selectedShape) {
      selectedShape.setEditable(false);
      selectedShape = null;
    }
  }
  function setSelection(shape) {
    clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
    selectColor(shape.get('fillColor') || shape.get('strokeColor'));
    google.maps.event.addListener(shape.getPath(), 'set_at', calcar);
    google.maps.event.addListener(shape.getPath(), 'insert_at', calcar);
  }
  function calcar() {
      var area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
      document.getElementById("area").innerHTML = "Area =" + area.toFixed(2);
      console.log(area.toFixed(2));
  }
  function deleteSelectedShape() {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
  }
  function selectColor(color) {
    selectedColor = color;
    // Retrieves the current options from the drawing manager and replaces the
    // stroke or fill color as appropriate.
    var polylineOptions = drawingManager.get('polylineOptions');
    polylineOptions.strokeColor = color;
    drawingManager.set('polylineOptions', polylineOptions);
    var rectangleOptions = drawingManager.get('rectangleOptions');
    rectangleOptions.fillColor = color;
    drawingManager.set('rectangleOptions', rectangleOptions);
    var circleOptions = drawingManager.get('circleOptions');
    circleOptions.fillColor = color;
    drawingManager.set('circleOptions', circleOptions);
    var polygonOptions = drawingManager.get('polygonOptions');
    polygonOptions.fillColor = color;
    drawingManager.set('polygonOptions', polygonOptions);
  }
  function setSelectedShapeColor(color) {
    if (selectedShape) {
      if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
        selectedShape.set('strokeColor', color);
      } else {
        selectedShape.set('fillColor', color);
      }
    }
  }
  function makeColorButton(color) {
    var button = document.createElement('span');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener(button, 'click', function() {
      selectColor(color);
      setSelectedShapeColor(color);
    });
    return button;
  }
  function buildColorPalette() {
    selectColor(colors[0]);
  }