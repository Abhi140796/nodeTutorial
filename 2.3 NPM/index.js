// var generateName = require('sillyname');
/**
 * In package.json when we change type: 'module' then we can use `import <<methodname>> from '<modulename>'` 
 */
import generateName from 'sillyname'
import superheroes from 'superheroes'

var sillyname = generateName();
var heroName = superheroes.random();

console.log(`My name is ${sillyname}. `);
console.log(`My name is ${heroName}. `);