const statesPath = "http:/localhost:3000/states"
const statesContainer = document.getElementById("states-container")
const app = document.getElementById("app")
const button = document.getElementById("dropdownMenu2")

fetch(statesPath)
    .then(function(obj){
        return obj.json()
      })
      .then(function(statesArray) {
          statesArray.forEach((state) => {statesContainer.innerHTML += makeStateButton(state)})
      });

function makeStateButton(state) {
     return `
    <button class="dropdown-item" type="button" id="state" data-state="${state.id}">${state.name}</button>
    `
};

function makeCityButton(city) {
    return `
   <button class="dropdown-item" type="button" id="city" data-city="${city.id}" data-state="${city.state_id}">${city.name}</button>
   `
};

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

function changeToCitiesFromStates(e) {
    button.innerText = "Please Choose A City"
    statesContainer.removeAttribute("id", "states-container")
    statesContainer.setAttribute("id", "cities-container")
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
        })
};

function changeToEventsFromCities(e) {
    button.innerText = "Menu"
    let citiesContainer = document.getElementById("cities-container")
    citiesContainer.removeAttribute("id", "cities-container")
    citiesContainer.setAttribute("id", "options-container")
    let optionsContainer = document.getElementById("options-container")
    optionsContainer.innerHTML = `
    <button class="dropdown-item" id="newEvent" type="button">Make A New Event!</button>
    <button class="dropdown-item" id="backToStates" type="button">Go Back To States</button>
    <button class="dropdown-item" id="backToCities" type="button">Go Back To Cities</button>
    `
    let eventsDiv = document.createElement('div')
    eventsDiv.setAttribute("id", "events-div")
    app.appendChild(eventsDiv)
    eventsDiv.innerHTML += `<h3 style="color: warning;">Here's every event in ${e.target.innerText}:</h3>`
    let stateId = e.target.dataset.state
    let cityId = e.target.dataset.city
    let eventsPath = statesPath + `/${stateId}/cities/${cityId}/events`
    fetch(eventsPath)
        .then(function(obj){
            return obj.json()
          })
              .then(function(eventsArray) {
                  eventsArray.forEach((event) => {eventsDiv.innerHTML += makeEventCard(event)})
              })
};

function renderNewCityForm(e) {
    let eventsDiv = document.getElementById("events-div")
    eventsDiv.innerHTML = ""
}


app.addEventListener("click", (e) => {
    if (e.target.id === "state") {
        changeToCitiesFromStates(e)
    } else if (e.target.id === "city") {
        changeToEventsFromCities(e)
    } else if (e.target.id === "newEvent") {
        renderNewCityForm(e)
    }
});



//<button class="dropdown-item" type="button"> State 1</button>
//<button class="dropdown-item" type="button"> State 2</button>
//<button class="dropdown-item" type="button"> State 3</button>