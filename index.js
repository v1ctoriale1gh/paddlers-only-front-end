//beginning const variables

const app = document.getElementById("app")
const button = document.getElementById("dropdownMenu2")

//FETCH REQUEST IS IN STATE ADAPTER - initialize a new one with a baseURL
const stateAdapter = new StateAdapter("http:/localhost:3000/states")

//first function call to render states on landing page
renderStates()

//one click event listener to rule them all
app.addEventListener("click", (e) => {
    if (e.target.id === "state") {
        changeToCitiesFromStates(e)
    } else if (e.target.id === "city") {
        changeToEventsFromCities(e)
    } else if (e.target.id === "newEvent") {
        renderNewEventForm(e)
    } else if (e.target.id === "backToStates") {
        backToStates()
    } else if (e.target.id === "backToCities") {
        backToCities(e)
    }
});

// event listener for new event form
app.addEventListener("submit", (e) => {
  // prevent the form from submitting
  e.preventDefault()
  // create an array to make the config object
  let info = []
  e.target.querySelectorAll('input').forEach((input) => {
    info.push(input.value)
  })
  //get that dang description on to the info array
  let description = document.getElementById('description').value
  info.push(description)
  //FETCH REQUEST #4 POST REQUEST (THIS FILLS ALL THE PROJECT REQUIREMENTS)
  // make the fetch request (post to events index)
  fetch(`http://localhost:3000/states/${e.target.dataset.state}/cities/${e.target.dataset.city}/events`, {
    method: "POST",
    headers: {
      //type of content sent and will recieve
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // configuration object turned to json string to send to events create
    body: JSON.stringify({
      event: {
        name: info[0],
        contact: info[1],
        address1: info[2],
        address2: info[3],
        //choosing to override user inputs for city and state to keep event foreign keys correct
        city_id: e.target.dataset.city,
        state: e.target.dataset.state,
        zip: info[5],
        date: info[6],
        description: info[7]
      }
    })
  })
  //turn the response to json
  .then(response => response.json())
  //render the errors if there are some
              .then(eventsArray => {
                  if (!!eventsArray.errors){
                      alert(eventsArray.errors)
                  } else {
                    //following pessimistic rendering rendering the events again after getting response from server
                    changeToEventsFromForm(eventsArray, e)
                  }
              })
              .catch(errors => alert(errors))

})

//function for original landing page to render states in dropdown
function renderStates() {
  let statesContainer = document.getElementById("states-container")
  //FETCH REQUEST #1 GET REQUEST STATES INDEX (call the funtion in state adapter)
  stateAdapter.fetchStates()
      .then(function(statesArray) {
          statesArray.forEach((state) => {statesContainer.innerHTML += makeStateButton(state)})
      });
}

//function to go back to states from menu
function backToStates() {
  //change the drop down
    button.innerText = "Please Choose A State"
    let eventsDiv = document.getElementById("events-div")
    let optionsContainer = document.getElementById("options-container")
    let citiesContainer = document.getElementById("cities-container")
    // get rid of events or form
    eventsDiv.remove()
    //change options container back to states container
    optionsContainer.innerHTML = ""
    optionsContainer.removeAttribute("id", "options-container")
    optionsContainer.setAttribute("id", "states-container")
    //render the states in dropdown
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
  //change the drop down from states container to city container
    button.innerText = "Please Choose A City"
    let statesContainer = document.getElementById("states-container")
    statesContainer.removeAttribute("id", "states-container")
    statesContainer.setAttribute("id", "cities-container")
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.innerHTML = ""
    //setting variables to pass into fetch request
    let stateId = e.target.dataset.state
    let cityPath = stateAdapter.baseURL + `/${stateId}/cities`
    //initialize a new cityAdapter
    let cityAdapter = new CityAdapter(cityPath)
    //FETCH REQUEST #2 GET REQUEST TO CITIES INDEX
    cityAdapter.fetchCities()
        //interate over array to make cities in dropdown
        .then(function(citiesArray) {
            citiesArray.forEach((city) => {citiesContainer.innerHTML += makeCityButton(city)})
        })
};

//function that changes dropdown menu to cities
function backToCities(e) {
  // change options container back to cities container & remove the events div
    button.innerText = "Please Choose A City"
    let eventsDiv = document.getElementById("events-div")   
    eventsDiv.remove()
    let optionsContainer = document.getElementById("options-container")
    optionsContainer.removeAttribute("id", "options-container")
    optionsContainer.setAttribute("id", "cities-container")
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.innerHTML = ""
  //set variables to pass into fetch request
    let stateId = e.target.dataset.state
    let cityPath = stateAdapter.baseURL + `/${stateId}/cities`
    //initialize a new cityAdapter
    let cityAdapter = new CityAdapter(cityPath)
    //FETCH REQUEST #2 GET REQUEST TO CITIES INDEX
    cityAdapter.fetchCities()
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
   <button class="dropdown-item" type="button" id="city" data-city="${city.id}" data-cityname="${city.name}" data-state="${city.state_id}">${city.name}</button>
   `
};

//function that changes city dropdown to menu drop down and displays event cards
function changeToEventsFromCities(e) {
  //create menu drop down from cities dropdown
    button.innerText = "Menu"
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.removeAttribute("id", "cities-container")
    citiesContainer.setAttribute("id", "options-container")
    let optionsContainer = document.getElementById("options-container")
    //add in datasets to access in form and in backToCities
    optionsContainer.innerHTML = `
    <button class="dropdown-item" id="newEvent" data-cityname="${e.target.dataset.cityname}" data-city="${e.target.dataset.city}" data-state="${e.target.dataset.state}" type="button">Make A New Event!</button>
    <button class="dropdown-item" id="backToStates" type="button">Go Back To States</button>
    <button class="dropdown-item" id="backToCities" data-state="${e.target.dataset.state}" type="button">Go Back To Cities</button>
    `
    //create an events div
    let eventsDiv = document.createElement('div')
    eventsDiv.setAttribute("id", "events-div")
    app.appendChild(eventsDiv)
    eventsDiv.innerHTML += `<h3 style="color: warning;">Here's every event in ${e.target.innerText}:</h3>`
    //set variables to pass into fetch request
    let stateId = e.target.dataset.state
    let cityId = e.target.dataset.city
    let eventsPath = stateAdapter.baseURL + `/${stateId}/cities/${cityId}/events`
    //FETCH REQUEST #3 GET REQUEST TO EVENTS INDEX
    fetch(eventsPath)
        .then(function(obj){
            return obj.json()
          })
              .then(function(eventsArray) {
                  eventsArray.forEach((event) => {eventsDiv.innerHTML += makeEventCard(event)})
              })
};

//function to change back to events after making a new event
function changeToEventsFromForm(eventsArray, e) {
  //remove the form
  let formDiv = document.getElementById("events-div")
  formDiv.remove()
  //create a div for event cards
  let eventsDiv = document.createElement('div')
  eventsDiv.setAttribute("id", "events-div")
  app.appendChild(eventsDiv)
  eventsDiv.innHTML = ""
  //need e argument passed in to get cityname!!!
  eventsDiv.innerHTML += `<h3 style="color: warning;">Here's every event in ${e.target.dataset.cityname}:</h3>`
  //iterate over passed in json array of events to make event cards
  eventsArray.forEach((event) => {eventsDiv.innerHTML += makeEventCard(event)})
};

//function to make an event - is called in changeToEventsFromCities
function makeEventCard(event) {
    return `
    <div class="card col-md-8 mx-auto" style="max-width: 18rem; color: rgba(22, 72, 114, 0.81); background-color: #e28640;">
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
    <div class="card col-md-8 mx-auto justify-content-center" style="max-width: 50rem; color: rgba(22, 72, 114, 0.81); background-color: #e28640;">
    <form data-state="${e.target.dataset.state}" data-city="${e.target.dataset.city}" data-cityname="${e.target.dataset.cityname}">
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
      <label for="address1">Address:</label>
      <input type="text" class="form-control" id="address1" placeholder="1234 Main St">
    </div>
    <div class="form-group">
      <label for="address2">Address 2:</label>
      <input type="text" class="form-control" id="address2" placeholder="Apartment, studio, or floor">
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="city">City:</label>
        <input type="text" class="form-control" id="city" placeholder="${e.target.dataset.cityname}">
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
      <label for="description">Date: (must be after today) </label>
      <input class="form-control" type="date" id="example-date-input">
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea class="form-control" id="description" rows="6" placeholder="Ex: Morning Paddle on flat water at the lake at Sweetwater Creek State Park. Difficulty Level: Beginner.  Maximum 5 people. Meet up at 9 am, expected finish time around Noon.  Please provide your own shuttle vehicle, PFD, paddles, and kayak or SUPB as none are available for rent. There is no cost for this event.  Use contact information to RSVP."></textarea>
    </div>
    <button type="submit" class="btn btn-outline-info">Submit</button>
  </form>`
}
