const statesPath = "http:/localhost:3000/states"
const statesContainer = document.getElementById("states-container")

fetch(statesPath)
    .then(function(obj){
        return obj.json()
      })
      .then(function(statesArray) {
          statesArray.forEach((state) => {statesContainer.innerHTML += makeStateButton(state)})
      })

function makeStateButton(state) {
     return `
    <button class="dropdown-item" type="button" id="state-${state.id}">${state.name}</button>
    `
}

//<button class="dropdown-item" type="button"> State 1</button>
//<button class="dropdown-item" type="button"> State 2</button>
//<button class="dropdown-item" type="button"> State 3</button>