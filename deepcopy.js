const deepCopy = (obj, weakMap = new WeakMap()) => {
    // 기본형
    if(obj === null || typeof obj !== 'object'){
        return obj;
    };
    // 순환 참조 방지
    if(weakMap.has(obj)){
        return weakMap.get(obj);
    };
    // Date
    if(obj instanceof Date){
        return new Date(obj);
    };
    // RegExp
    if(obj instanceof RegExp){
        return new RegExp(obj);
    };
    // Map
    if(obj instanceof Map){
        const result = new Map();
        weakMap.set(obj, result);
        obj.forEach((value, key) => {
            const newKey = deepCopy(key, weakMap);
            const newValue = deepCopy(value, weakMap);
            result.set(newKey, newValue);
        });
        return result;
    };
    // Set
    if(obj instanceof Set){
        const result = new Set();
        weakMap.set(obj, result);
        obj.forEach(value =>{
            result.add(deepCopy(value, weakMap));
        });
        return result
    };

    const copied = Array.isArray(obj) ? [] : {};

    weakMap.set(obj, copied);

    for(let key in obj){
        if(Object.prototype.hasOwnProperty.call(obj,key)){
            copied[key] = deepCopy(obj[key], weakMap);
        }
    }

    return copied;
}
console.log('b');
module.exports = deepCopy;