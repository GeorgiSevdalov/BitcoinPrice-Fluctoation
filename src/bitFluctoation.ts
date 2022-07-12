import { getCoinPrice } from "./getData";

function bitFluct(bitPrice: number): void {
    console.log(`Bitcoin price in this moment: ${bitPrice}`);
    const _seven = 7; //declarate it like const because need 7 days period.
    let priceStorage: number[] = [19850.175784254872, 18970.175784254872, 19760.175784254872, 20150.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872];
    let sumWeek: number = 0;//sum values form priceStorage.
    let sumMonth: number = 0;//sum values form monthAverageStorage
    let highestWeekPrice: number = 0;
    let lowestWeekPrice: number = 0;
    let highestMonthPrice: number = 0;
    let lowestMonthPrice: number = 0;
    let checkLow = Number.MAX_SAFE_INTEGER;

    if (priceStorage.length < _seven) {
        priceStorage.push(bitPrice)
    } else if (priceStorage.length === _seven) {
        priceStorage.shift();
        priceStorage.push(bitPrice)
    }

    for (let el of priceStorage) {
        sumWeek += el;

        if (el > highestWeekPrice) {
            highestWeekPrice = el
        }
        if (el < checkLow) {
            checkLow = el;
            lowestWeekPrice = el;
        }
    }

    let averageValueW: number = sumWeek / priceStorage.length;  //average value for week.
    console.log(`Bitcoin average price for week: ${averageValueW}
    Highest price for period: ${highestWeekPrice}
    Lowest price for period: ${lowestWeekPrice}`)


    let monthAverageStorage: number[] = [19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 19550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 22550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 19750.172784254872, 19850.175784254872, 19550.175784254872, 19760.175784254872, 19950.175784254872,
        19790.125784254872, 19750.1735784254872, 17750.172784254872, 19750.1735784254872, 19760.175784254872, 19950.175784254872, 19750.172784254872]; // used for calculating months

    if (monthAverageStorage.length < 28) {
        monthAverageStorage.push(averageValueW);
    } else {
        monthAverageStorage.shift();
        monthAverageStorage.push(averageValueW)
    }

    for (let el of monthAverageStorage) {
        sumMonth += el;
        if (el > highestMonthPrice) {
            highestMonthPrice = el
        }
        if (el < checkLow) {
            checkLow = el;
            lowestMonthPrice = el;
        }
    }

    let averageValueM: number = sumMonth / monthAverageStorage.length;  //average value for month
    console.log(`Bitcoin average price for 1 month (28days) ${averageValueM}
    Highest price for period: ${highestMonthPrice}
    Lowest price for period: ${lowestMonthPrice}`);
}


//invokes bitFluct with argument (bitcoin price from API)
(async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        bitFluct(coinPrice);


    } catch (err: any) {
        console.log(err)
    }
})()

