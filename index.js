const statesPath = "http:/localhost:3000/states"
const statesContainer = document.getElementById("states-container")
const app = document.getElementById("app")

fetch(statesPath)
    .then(function(obj){
        return obj.json()
      })
      .then(function(statesArray) {
          statesArray.forEach((state) => {statesContainer.innerHTML += makeStateButton(state)})
      })

function makeStateButton(state) {
     return `
    <button class="dropdown-item" type="button" id="state" data-state="${state.id}">${state.name}</button>
    `
}


app.addEventListener("click", (e) => {
    if (e.target.id === "state") {
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
    } else if (e.target.id === "city") {
        app.innerHTML = ""
        let stateId = e.target.dataset.state
        let cityId = e.target.dataset.city
        let eventsPath = statesPath + `/${stateId}/cities/${cityId}/events`
        console.log(eventsPath)
    }
});

function makeCityButton(city) {
    return `
   <button class="dropdown-item" type="button" id="city" data-city="${city.id}" data-state="${city.state_id}">${city.name}</button>
   `
}


//<button class="dropdown-item" type="button"> State 1</button>
//<button class="dropdown-item" type="button"> State 2</button>
//<button class="dropdown-item" type="button"> State 3</button>