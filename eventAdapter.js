class EventAdapter{
    constructor(url){
        this.baseURL = url;
    }
    fetchEvents() {
        return fetch(this.baseURL)
        .then((obj) => obj.json())
    }

    createEvent(configObject) {
        return fetch(this.baseURL, {
    method: "POST",
    headers: {
      //type of content sent and will recieve
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    // configuration object turned to json string to send to events create
    body: JSON.stringify(configObject)
    })
    .then(response => response.json())
    }
}