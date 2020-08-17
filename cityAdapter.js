class CityAdapter{
    
    //static all = [] **********this is like a ruby class variable or @@all self.all etc
    //you would push instances of the class in inside of the constructor (it's like initialize) 
    //you can use destructuring in the constructor to pass in an object ({objKey1, objKey2})
    
    constructor(url){
        this.baseURL = url;
    }
    fetchCities() {
        return fetch(this.baseURL)
        .then((obj) => obj.json())
    }

    //a static function (like a class method in ruby) (this one is using arrow syntax but it doesnt have to)
   // static staticFn = () => {
   //     console.log('static')
   // }
}