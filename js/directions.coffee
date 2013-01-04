class App
  constructor: ->
    @setupVariables()
    @addDomElements()
    @bindEvents()
  
  setupVariables: ->
    @directionsService = new google.maps.DirectionsService()
    @directionsDisplay = new google.maps.DirectionsRenderer()
    @container = $ '#google-directions'
    @assignAttrs @container, ['endpoint', 'linktext', 'placeholder']

  assignAttrs: (obj, attrs)->
    @[attr] = obj.attr("data-#{attr}") for attr in attrs

  addDomElements: ->
    @container.append "
        <input type='text' id='postcode-input' placeholder='#{@placeholder}'>
        <a href='#' class='get-directions'>#{@linktext}</a>
      "
    @buildDir()

  buildDir: ->
    @container.append "<div id='directions' class='gmap-section'></div>"
    @directionsDisplay.setPanel $("#directions")[0]

  bindEvents: ->
    $('.get-directions').live "click", @displayDirections
  
  displayDirections: =>
    @start_postcode = $("#postcode-input").val()
    @updateMap()
    @showDir()
    false

  showDir: =>
    $("#directions").slideDown("slow")
  
  hideDir: -> 
    $("#directions").slideUp("slow")

  updateMap: =>
    args =
      origin: @start_postcode
      destination: @endpoint
      travelMode: google.maps.TravelMode.DRIVING
      region: "uk"

    @directionsService.route args, @setupDirections

  setupDirections: (result, status)=>
    if status is google.maps.DirectionsStatus.OK
      @startlatlng = result.routes[0].overview_path[0]
      @directionsDisplay.setDirections(result);
    else
      @postcodeFailure()

  postcodeFailure: =>
    @hideDir()
    alert "Sorry but "+ @start_postcode +" isn't a valid postcode, please try again."

$ ->
  new App