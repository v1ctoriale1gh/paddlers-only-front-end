class StateAdapter{
    constructor(url){
        this.baseURL = url;
    }
    fetchStates() {
        return fetch(this.baseURL)
        .then((obj) => {
            //looking at what's inside of promises in the comment below
            console.log(obj); 
            return obj.json()
    })
}
}