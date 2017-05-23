// load dependencies
require("./scripts/load")("scripts/ancestry.js")

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
