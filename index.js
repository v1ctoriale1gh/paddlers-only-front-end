//beginning const variables
const statesPath = "http:/localhost:3000/states"
const app = document.getElementById("app")
const button = document.getElementById("dropdownMenu2")

//first function call to render states on landing page
renderStates()

//one event listener to rule them all
app.addEventListener("click", (e) => {
    if (e.target.id === "state") {
        e.preventDefault()
        changeToCitiesFromStates(e)
    } else if (e.target.id === "city") {
        changeToEventsFromCities(e)
    } else if (e.target.id === "newEvent") {
        renderNewEventForm(e)
    } else if (e.target.id === "backToStates") {
        e.preventDefault()
        backToStates()
    } else if (e.target.id === "backToCities") {
        backToCities(e)
    }
});

//function for original landing page to render states in dropdown
function renderStates() {
  let statesContainer = document.getElementById("states-container")
  //FETCH REQUEST #1 GET REQUEST STATES INDEX
  fetch(statesPath)
    .then(function(obj){
        return obj.json()
      })
      .then(function(statesArray) {
          statesArray.forEach((state) => {statesContainer.innerHTML += makeStateButton(state)})
      });
}

//function to go back to states from menu
function backToStates() {
    button.innerText = "Please Choose A State"
    let eventsDiv = document.getElementById("events-div")
    let optionsContainer = document.getElementById("options-container")
    let citiesContainer = document.getElementById("cities-container")
    eventsDiv.remove()
    optionsContainer.innerHTML = ""
    optionsContainer.removeAttribute("id", "options-container")
    optionsContainer.setAttribute("id", "states-container")
    renderStates()
}

//function to make each state - is called in renderStates and backToStates
function makeStateButton(state) {
     return `
    <button class="dropdown-item" type="button" id="state" data-state="${state.id}">${state.name}</button>
    `
};

//function that changes dropdown from states to cities
function changeToCitiesFromStates(e) {
    button.innerText = "Please Choose A City"
    let statesContainer = document.getElementById("states-container")
    statesContainer.removeAttribute("id", "states-container")
    statesContainer.setAttribute("id", "cities-container")
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.innerHTML = ""
    let stateId = e.target.dataset.state
    let cityPath = statesPath + `/${stateId}/cities`
    //FETCH REQUEST #2 GET REQUEST TO CITIES INDEX
    fetch(cityPath)
        .then(function(obj){
            return obj.json()
        })
        .then(function(citiesArray) {
            citiesArray.forEach((city) => {citiesContainer.innerHTML += makeCityButton(city)})
        })
};

//function that changes dropdown menu to cities
function backToCities(e) {
    button.innerText = "Please Choose A City"
    let eventsDiv = document.getElementById("events-div")   
    eventsDiv.remove()
    let optionsContainer = document.getElementById("options-container")
    optionsContainer.removeAttribute("id", "options-container")
    optionsContainer.setAttribute("id", "cities-container")
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.innerHTML = ""
    let stateId = e.target.dataset.state
    let cityPath = statesPath + `/${stateId}/cities`
    fetch(cityPath)
        .then(function(obj){
            return obj.json()
        })
        .then(function(citiesArray) {
            citiesArray.forEach((city) => {citiesContainer.innerHTML += makeCityButton(city)})
        });
}

//function to make a city button - is called in changeToCitiesFromStates and backToCities
function makeCityButton(city) {
    return `
   <button class="dropdown-item" type="button" id="city" data-city="${city.id}" data-state="${city.state_id}">${city.name}</button>
   `
};

//function that changes city dropdown to menu drop down and displays event cards
function changeToEventsFromCities(e) {
    button.innerText = "Menu"
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.removeAttribute("id", "cities-container")
    citiesContainer.setAttribute("id", "options-container")
    let optionsContainer = document.getElementById("options-container")
    optionsContainer.innerHTML = `
    <button class="dropdown-item" id="newEvent" type="button">Make A New Event!</button>
    <button class="dropdown-item" id="backToStates" type="button">Go Back To States</button>
    <button class="dropdown-item" id="backToCities" data-state="${e.target.dataset.state}" type="button">Go Back To Cities</button>
    `
    let eventsDiv = document.createElement('div')
    eventsDiv.setAttribute("id", "events-div")
    app.appendChild(eventsDiv)
    eventsDiv.innerHTML += `<h3 style="color: warning;">Here's every event in ${e.target.innerText}:</h3>`
    let stateId = e.target.dataset.state
    let cityId = e.target.dataset.city
    let eventsPath = statesPath + `/${stateId}/cities/${cityId}/events`
    //FETCH REQUEST #3 GET REQUEST TO EVENTS INDEX
    fetch(eventsPath)
        .then(function(obj){
            return obj.json()
          })
              .then(function(eventsArray) {
                  eventsArray.forEach((event) => {eventsDiv.innerHTML += makeEventCard(event)})
              })
};

//function to make an event - is called in changeToEventsFromCities
function makeEventCard(event) {
    return `
    <div class="card col-md-8 mx-auto" style="max-width: 18rem; color: rgba(12, 134, 149, 0.94); background-color: #e28640;">
      <div class="card-header">${event.name}</div>
      <div class="card-body">
        <h5 class="card-title">Warning card title</h5>
        <p class="card-text">${event.description}</p>
     </div>
   </div>
   <br>`
};


//renders a form for a new event
function renderNewEventForm(e) {
    let eventsDiv = document.getElementById("events-div")
    eventsDiv.innerHTML = `
    <br><br>
    <div class="card col-md-8 mx-auto justify-content-center" style="max-width: 50rem; color: rgba(12, 134, 149, 0.94); background-color: #e28640;">
    <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Event Name:</label>
        <input type="text" class="form-control" id="name" placeholder="Ex: Sweetwater Creek Morning Paddle">
      </div>
      <div class="form-group col-md-6">
        <label for="contact">Contact Info:</label>
        <input type="text" class="form-control" id="contact" placeholder="Ex: Bob Smith - bsmith@email.com">
      </div>
    </div>
    <div class="form-group">
      <label for="address">Address:</label>
      <input type="text" class="form-control" id="address" placeholder="1234 Main St">
    </div>
    <div class="form-group">
      <label for="address2">Address 2:</label>
      <input type="text" class="form-control" id="address2" placeholder="Apartment, studio, or floor">
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="city">City:</label>
        <input type="text" class="form-control" id="city">
      </div>
      <div class="form-group col-md-4">
        <label for="state">State:</label>
        <select id="state" class="form-control">
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option></option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>District of Columbia</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="zip">Zip:</label>
        <input type="text" class="form-control" id="zip">
      </div>
    </div>
    <div class="form-group">
      <label for="description">Date:</label>
      <input class="form-control" type="date" value="2011-08-19" id="example-date-input">
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea class="form-control" id="description" rows="6" placeholder="Ex: Morning Paddle on flat water at the lake at Sweetwater Creek State Park. Difficulty Level: Beginner.  Maximum 5 people. Meet up at 9 am, expected finish time around Noon.  Please provide your own shuttle vehicle, PFD, paddles, and kayak or SUPB as none are available for rent. Use contact information to RSVP."></textarea>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="has_cost?">
        <label class="form-check-label" for="gridCheck">
          Click if this Event has a cost
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="shuttle_provided?">
        <label class="form-check-label" for="gridCheck">
          Click if this Event has a shuttle provided
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-outline-info">Submit</button><br>
  </form>`
}




//<button class="dropdown-item" type="button"> State 1</button>
//<button class="dropdown-item" type="button"> State 2</button>
//<button class="dropdown-item" type="button"> State 3</button>