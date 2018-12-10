/*
* this is a module to load all modules in modules directory.
* module must be in format [name].js
* name is saved as module name
*/

let fs = require('fs');
let BASE_PATH = `${__dirname}/modules`

function Loader(module) {
    this._MODULES = {};
    // load all modules in memory in var [MODULES]

    for (let file of fs.readdirSync(`${BASE_PATH}/${module}`)) {
        file = file.replace(/\.[^/.]+$/, "")
        
        this._MODULES[file] = require(`${BASE_PATH}/${module}/${file}`)
    }
}

Loader.prototype.getFactory = function getFactory(MName){
    // get all Factory
    if (!this._MODULES[MName]) throw new Error("Unable to find such module maybe you need to implement it")
    return this._MODULES[MName]
}
module.exports = Loader