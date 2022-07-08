function bitcoinFluctoation(value){
    const _seven = 7;
    let priceStorage = [];
    let momentPrice = value;
    let sum = 0;
    let averageStorage=[];
    
    if(priceStorage.length<_seven){
        priceStorage.push(value)
    }else if(priceStorage.length === _seven){
        priceStorage.shift();
        priceStorage.push(value)
    }

    for(let el of priceStorage){
        sum += el;
    }
    
    let averageValue= sum/priceStorage.length;
    /* must safe averageValue in container and 
    compare each new one wiht previous and found 
    fluctuation in percent*/

console.log();
}
bitcoinFluctoation(27)