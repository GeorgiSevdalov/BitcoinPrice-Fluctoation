import { getCoinPrice } from "./getData";

function bitFluct(value: number): void {
    console.log(value);
    const _seven = 7; //declarate it like const because need 7 days period.
    let priceStorage: number[] = [];
    let sum = 0;

    if (priceStorage.length < _seven) {
        priceStorage.push(value)
    } else if (priceStorage.length === _seven) {
        priceStorage.shift();
        priceStorage.push(value)
    }

    for (let el of priceStorage) {
        sum += el;
    }

    let averageValue: number = sum / priceStorage.length;
    //////////////////////////////////////////////////////////////////
    let weekAverageStorage: number[] = [];
    // used for calculating months
    let mounthAverageStorage: number[] = [];

    /**
     * This function gets the average storage days.
     */
    if (weekAverageStorage.length < 7) {
        weekAverageStorage.push(averageValue);
    } else {
        weekAverageStorage.shift();
        weekAverageStorage.push(averageValue)
    }

    if (mounthAverageStorage.length < 30) {
        mounthAverageStorage.push(averageValue);
    } else {
        mounthAverageStorage.shift();
        mounthAverageStorage.push(averageValue)
    }
    console.log((weekAverageStorage));
    console.log((mounthAverageStorage));

}

// bitFluct(value)

(async () => {
    try {
        const coinPrice = await getCoinPrice();
        bitFluct(coinPrice);


    } catch (err: any) {
        console.log(err)
    }
    
    
    
//     .then((coinPrice: number) => {

//     console.log("Coin price:");
//     console.log(coinPrice);
// })
//     .catch((err: any) => )
})()

