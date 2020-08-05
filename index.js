const statesPath = "http:/localhost:3000/states"
const statesContainer = document.getElementById("states-container")
const app = document.getElementById("app")

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
    let button = document.getElementById("dropdownMenu2")
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
    app.innerHTML = `<h3 style="color: warning;">Here's every event in ${e.target.innerText}:</h3>`
    let stateId = e.target.dataset.state
    let cityId = e.target.dataset.city
    let eventsPath = statesPath + `/${stateId}/cities/${cityId}/events`
    fetch(eventsPath)
        .then(function(obj){
            return obj.json()
          })
              .then(function(eventsArray) {
                  eventsArray.forEach((event) => {app.innerHTML += makeEventCard(event)})
              })
};


app.addEventListener("click", (e) => {
    if (e.target.id === "state") {
        changeToCitiesFromStates(e)
    } else if (e.target.id === "city") {
        changeToEventsFromCities(e)
    }
});



//<button class="dropdown-item" type="button"> State 1</button>
//<button class="dropdown-item" type="button"> State 2</button>
//<button class="dropdown-item" type="button"> State 3</button>