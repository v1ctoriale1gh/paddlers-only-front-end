class StateAdapter{
    constructor(url){
        this.baseURL = url;
    }
    fetchStates() {
        return fetch(this.baseURL)
        .then((obj) => obj.json())
    }
}