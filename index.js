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
    eventsDiv.innerHTML = `
    <br><br>
    <div class="card col-md-8 mx-auto" style="max-width: 30rem; color: rgba(12, 134, 149, 0.94); background-color: #e28640;">
    <br>
    <form>
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="inputEmail3">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" id="inputPassword3">
      </div>
    </div>
    <fieldset class="form-group">
      <div class="row">
        <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
        <div class="col-sm-10">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
            <label class="form-check-label" for="gridRadios1">
              First radio
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
            <label class="form-check-label" for="gridRadios2">
              Second radio
            </label>
          </div>
          <div class="form-check disabled">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
            <label class="form-check-label" for="gridRadios3">
              Third disabled radio
            </label>
          </div>
        </div>
      </div>
    </fieldset>
    <div class="form-group row">
      <div class="col-sm-2">Checkbox</div>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck1">
          <label class="form-check-label" for="gridCheck1">
            Example checkbox
          </label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-10">
        <button type="submit" class="btn btn-outline-warning">submit</button>
      </div>
    </div>
  </form>
  </div>`
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