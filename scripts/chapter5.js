//Abstracting
var array = [1,2,3]
for (var i=0; i <array.length; i++) {
  var current = array[i]
  console.log(current);
}
//"for each elemtent in the array, log it to the console"

function logEach(array) {
  for (var i = 0; i < array.length; i++)
    console.log(array[i])
}

//better

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i])
}

forEach(["Rachael", "Hailey", "Kara", "Tyler"], console.log)


var numbers = [1,2,3,4,5], sum = 0
forEach(numbers, function(number){
  sum +=number
})

console.log(sum)

//Higher Order Functions - Functions that operate on other functions

 // functions that create new functions

function greaterThan(n) {
  return function(m) {
    return m > n
  }
}

var greaterThan10 = greaterThan(10)
console.log(greaterThan10(11));


//change other functions
function noisy(f) {
  return function(arg) {
    console.log("calling with", arg)
    var val = f(arg)
    console.log("called with", arg, " - got", val)
    return val
  }
}

noisy(Boolean)(0)

//new types of control flow
function unless(test, then) {
  if (!test)
    then()
}

function repeat(times, body) {
  for (var i =0; i < times; i++)
  body(i)
}

repeat(3, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  })
})

//JSON


var ancestry = JSON.parse(ANCESTRY_FILE)
console.log(ancestry.length)

// Filtering an array
function filter(array, test) {
  var passed = []
  for (var i=0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i])
  }
  return passed
}

console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925
}))

//Transforming with map

function map(array, transform) {
  var mapped = []
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]))
  return mapped
}

var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90
})

console.log(map(overNinety, function(person) {
  return person.name
}))


//Reduce function
function reduce(array, combine, start) {
  var current = start
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i])
  return current
}

console.log(reduce([1,2,3,4], function(a,b) {
  return a+b
}, 0))

// Reduce method
// calling as a method, ancestry = array, start = implicitly [0]

console.log(ancestry.reduce(function(min, cur) {
  if
    (cur.born < min.born) return cur
  else
    return min
}));

// Composability
function average(array) {
  function plus(a,b) {
    return a+b
  }
  return array.reduce(plus) / array.length
}

function age(p) {
    return p.died - p.born
}

function male(p) {
  return p.sex == "m"
}

function female(p) {
  return p.sex == "f"
}

console.log(average(ancestry.filter(male).map(age)));

console.log(average(ancestry.filter(female).map(age)));

// Lesson - this is costly

// Project - How much DNA shared with Great, great, great gpa
var byName = {}
ancestry.forEach(function(person){
  byName[person.name] = person
})
console.log(byName["Philibert Haverbeke"])
// My words: for each object in js file call function(person), which finds
//the person's name and assigns it to variable person. Now the byName
//object is indexed by name.

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue
    else {
        return f(person, valueFor(byName[person.mother]),
                         valueFor(byName[person.father]))
    }
    return valueFor(person)
  }
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Paulwels van Haverbeke") //how much shared DNA?
    return 1
  else
    return (fromMother + fromFather)/2
}

var ph = byName["Philibert Haverbeke"] //grandfather
console.log(reduceAncestors(ph, sharedDNA, 0) / 4)
//--> .049


//Binding
//all functions have the bind method, which creates a new function that
//will call the original function with args fixed
var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"]
function isInSet(set, person) {
  return set.indexOf(person.name) > -1
}

console.log(ancestry.filter(isInSet.bind(null, theSet)))
//The call to bind returns a function that will call isInSet with theSet as// first argument, followed by any remaining arguments given to the bound// function
