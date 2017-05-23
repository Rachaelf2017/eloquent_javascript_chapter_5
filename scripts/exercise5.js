//1. Use the reduce method in combination with concat  to flatten
//an array of arrays into a single array.
var arrays = [[1,2,3], [4,5,6], [7,8,9], ["a", "b", "c"]]

console.log(arrays.reduce(function(a,b){
  return a.concat(b)

}));



// 2. Use the ancestry data to compute the average age different between mother and child
//Need to make an array of differences

var agediff = ancestry.filter(function(person){
  return byName[person.mother] !=null
}).map(function(person){
  return person.born - byName[person.mother].born
});


console.log(average(agediff))


//3. Compute the average age per century.

function groupBy(array, group) {
  var groups = {};
  array.forEach(function(element) {
    var groupName = group(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else
      groups[groupName] = [element];
  });
  return groups;
}

var byCentury = groupBy(ancestry, function(person) {
  return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
  var ages = byCentury[century].map(function(person) {
    return person.died - person.born;
  });
  console.log(century + ": " + average(ages));
}
