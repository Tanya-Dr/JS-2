const sum = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else {
        return NaN;
    }    
};
const dif = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    } else {
        return NaN;
    }    
};
const product = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a * b;
    } else {
        return NaN;
    }    
};
const division = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a / b;
    } else {
        return NaN;
    }    
};


module.exports = {
    sum: sum,
    dif: dif,
    product: product,
    division: division
}