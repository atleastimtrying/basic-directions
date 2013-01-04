(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = (function() {

    function App() {
      this.postcodeFailure = __bind(this.postcodeFailure, this);
      this.setupDirections = __bind(this.setupDirections, this);
      this.updateMap = __bind(this.updateMap, this);
      this.showDir = __bind(this.showDir, this);
      this.displayDirections = __bind(this.displayDirections, this);      this.setupVariables();
      this.addDomElements();
      this.bindEvents();
    }

    App.prototype.setupVariables = function() {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.container = $('#google-directions');
      return this.assignAttrs(this.container, ['endpoint', 'linktext', 'placeholder']);
    };

    App.prototype.assignAttrs = function(obj, attrs) {
      var attr, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = attrs.length; _i < _len; _i++) {
        attr = attrs[_i];
        _results.push(this[attr] = obj.attr("data-" + attr));
      }
      return _results;
    };

    App.prototype.addDomElements = function() {
      this.container.append("        <input type='text' id='postcode-input' placeholder='" + this.placeholder + "'>        <a href='#' class='get-directions'>" + this.linktext + "</a>      ");
      return this.buildDir();
    };

    App.prototype.buildDir = function() {
      this.container.append("<div id='directions' class='gmap-section'></div>");
      return this.directionsDisplay.setPanel($("#directions")[0]);
    };

    App.prototype.bindEvents = function() {
      return $('.get-directions').live("click", this.displayDirections);
    };

    App.prototype.displayDirections = function() {
      this.start_postcode = $("#postcode-input").val();
      this.updateMap();
      this.showDir();
      return false;
    };

    App.prototype.showDir = function() {
      return $("#directions").slideDown("slow");
    };

    App.prototype.hideDir = function() {
      return $("#directions").slideUp("slow");
    };

    App.prototype.updateMap = function() {
      var args;
      args = {
        origin: this.start_postcode,
        destination: this.endpoint,
        travelMode: google.maps.TravelMode.DRIVING,
        region: "uk"
      };
      return this.directionsService.route(args, this.setupDirections);
    };

    App.prototype.setupDirections = function(result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        this.startlatlng = result.routes[0].overview_path[0];
        return this.directionsDisplay.setDirections(result);
      } else {
        return this.postcodeFailure();
      }
    };

    App.prototype.postcodeFailure = function() {
      this.hideDir();
      return alert("Sorry but " + this.start_postcode(+" isn't a valid postcode, please try again."));
    };

    return App;

  })();

  $(function() {
    return new App;
  });

}).call(this);
