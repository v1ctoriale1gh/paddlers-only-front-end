
Area for notes - sorry *Reviewer* I hope this is okay - I'm worried I will get nervous and forget LOL

(also I realize these are pretty low resolution explanations of these concepts)

- execution context - a global object is created (the window) and this - this is set to the window 
    -when a function is being executed a new execution contect
    - If this is undefined the value of this is the window ()
    - the global execution context which means the variable scope has been lost and is being set in the original glocal execution context
    - this can happen with callback functions
    - .bind and arrow functions bind the execution context so it is not lost and set to window/global      execution context (also call and apply)
- scope is where variables available
- on the first pass (compiling stage of running the program in the javascript engine)
- space is made for variables and functions in memory
- this is basically what hoisting is (it's not actually moving the code around lexically)
- then the js engine executes the code
- one line at a time, js goes through an executes the code
- adding functions to the call stack and creating it's own execution context
- until the function is done then it pops it off of the call stack
- asynchronous functions (like AJAX calls where you are waiting for a promise to be fulfilled or setInterval or setTimeOut)  are actually using another function of the browser, not the js engine, the event cue, and when all of the functions on the callstack are finished the events on the event cue are added to the callstack 
- javascript does very weird stuff with coercion... it can be unpredictable it is better to use === the strictly equals that the loosely equals == 
- fetch returns a promise not json thats why u take the object and turn it into json.... woah there is a lot of stuff in promises 
- **reviewer** do you have any cool tips about things to find in or how to navigate promises?)


- also dont flipping forget it destructuring looks like this:

let aDangArray = [1, 2, 3, 4]
let [one, two, three, four] = aDangArray
 for an array or 

let aDangObject = {
    one: 1,
    two: 2,
    three: 3,
    four: 4
}
let { one, two, three, four } = aDangObject
  for an object or

[firstName, middleName, lastName] = 'Victoria Leigh Shillcutt'.split(' ')
  for a string

I used it only in one spot in my project ( i know, do better ) when splitting up the date to reformat it in a human readable way
let date = event.date;
let [year, month, day] = date.split('-');
let dateObj = {month, day, year};

- lexical scoping is WHERE something is defined - think what is the parent object ??
- the scope chain is how to js engine goes down the callstack to look for undefined/undeclared variables


- Examples of execution context with arrow functions vs .bind and how to call those functions defined inside of an object

let connor = {
    name: 'Connor',
    eye_color: 'Blue',
    hair_color: 'Blonde',
    //cannot pass in this - this is the global execution context of the window 
    description: (obj) => {
        return `${obj.name} has ${obj.eye_color} eyes and ${obj.hair_color} hair.`
    }
}

connor.description(connor)

//because we are not binding to the object we are passing in with an arrow function, 
let tori = {
    name: 'Tori',
    eye_color: 'Blue',
    hair_color: 'Brown',
    description: function() {
        return `${this.name} has ${this.eye_color} eyes and ${this.hair_color} hair.`
    }
}

let toriDescription = tori.description.bind(tori)

toriDescription()

let connorDescription = tori.description.bind(connor)

connorDescription()

connor.description(tori)
