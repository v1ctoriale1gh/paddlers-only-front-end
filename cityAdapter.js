class CityAdapter{
    constructor(url){
        this.baseURL = url;
    }
    fetchCities() {
        return fetch(this.baseURL)
        .then((obj) => obj.json())
    }
}