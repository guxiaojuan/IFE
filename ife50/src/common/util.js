/*
*
* typeof返回值
* [1,2,3]    "object"
* function(){}  "function"
* new Date()/ new Function()/ new Array(1,2)/ new Boolean(2)  "object"
* null  "object"
* undefined  "undefined
* -1  "number"
* {a:2}   "object"
* "test"  "string"
* NaN    "number"
* true   "boolean"
*
*
* Object.prototype.toString.call()返回值
* null       "[Object Null]"
* undefined  "[Object Undefined]"
* 1/-1/NaN   "[Object Number]"
* new Date() "[Object Date]"
* [1,2,3]    "[Object Array]"
* "test"     "[Object String]"
* new Array(1,2,3)   "[Object Array]"
* new Function()     "[Object Function]"
* new Boolean(3)     "[Object Boolean]"
* true               "[Object Boolean]"
* {a:1,b:2}          "[Object Object]"
*
*/

export const cloneObject = (obj) => {
    // return JSON.parse(JSON.stringify(obj))
    let res = new obj.constructor()
    for(let key of Object.keys(obj)){
        switch (typeof(obj[key])){
            case 'object': {
                if(isArray(obj[key])){
                    res[key] = [...obj[key]]
                }else if(isDate(obj[key])){
                    res[key] = new Date(obj[key].valueOf())
                }else{
                    res[key] = cloneObject(obj[key])
                }
            }
            default:res[key] = obj[key]
        }
    }
    return res
}

export const isArray = (element) => {
    return Object.prototype.toString.call(element) === '[object Array]'
}
export const isDate = (element) => {
    return Object.prototype.toString.call(element) === '[object Date]'
}
export const isInteger = (num) =>{
    typeof num === 'number' && parseInt(num, 10) === num
}