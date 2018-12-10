function clone(obj) {
    // a simple way to deep clone an object in javascript
    return JSON.parse(JSON.stringify(obj));
}


function COLLECTION() {
    /// init code here 
    this.OBJECT = {};
}
function DATABASE(COLLECTIONS,_CONFIG){
    let obj = {};
    for( let COLLECT of COLLECTIONS){
        if(!typeof COLLECT === 'string') throw new Error(`${COLLECT} is not a string`)
        obj[COLLECT] = new COLLECTION()
    }
    return obj
}


COLLECTION.prototype.save  = function(obj){
    // in JS, objects are passed by reference
    // so to avoid interfering with the original data
    // we deep clone the object, to get our own reference
    let _obj = clone(obj);
    
    if (!_obj.id) {
        // assign a random number as ID if none exists
        _obj.id = (Math.random() * 10000000) | 0;
    }
    
    this.OBJECT[_obj.id.toString()] = _obj;
    return clone(_obj);
}
COLLECTION.prototype.fetch = function(id){
    if (!this.OBJECT[id.toString()]) throw new Error(`this object with id = ${id} doesn't exist`)
    return clone(this.OBJECT[id.toString()]);
}
COLLECTION.prototype.fetchAll = function(){
    let _bunch = [];
    for (let item in this.OBJECT) {
        _bunch.push(clone(this.OBJECT[item]));
    }
    return _bunch;
}
COLLECTION.prototype.unset = function(id){
    delete this.OBJECT[id];
}

module.exports = DATABASE