import { getCoinPrice } from "./getData";
// import { weekData, monthData } from "../dataJSON/data.json";
import { getObjFromJson } from "./getObj";
import * as fs from 'fs';

export interface Data {
    weekData: {
        arrayW: number[]
    },
    monthData: {
        arrayM: number[]
    }
}

function bitFluct(bitPrice: number, objJSON: Data): void {
    console.log(`Bitcoin price in this moment: ${bitPrice}`);

    const _seven = 7; //declarate it like const because need 7 days period.
    let priceWeekStorage: number[] = objJSON.weekData.arrayW;
    let sumWeek: number = 0;//sum values form priceStorage.
    let sumMonth: number = 0;//sum values form monthAverageStorage
    let highestWeekPrice: number = 0;
    let lowestWeekPrice: number = 0;
    let highestMonthPrice: number = 0;
    let lowestMonthPrice: number = 0;
    let checkLow = Number.MAX_SAFE_INTEGER;

    if (priceWeekStorage.length < _seven) {
        priceWeekStorage.push(bitPrice)
    } else if (priceWeekStorage.length === _seven) {
        priceWeekStorage.shift();
        priceWeekStorage.push(bitPrice)
    }

    for (let el of priceWeekStorage) {
        sumWeek += el;

        if (el > highestWeekPrice) {
            highestWeekPrice = el
        }
        if (el < checkLow) {
            checkLow = el;
            lowestWeekPrice = el;
        }
    }

    let averageValueW: number = sumWeek / priceWeekStorage.length;  //average value for week.
    console.log(`Bitcoin average price for week: ${averageValueW}
    Highest price for period: ${highestWeekPrice}
    Lowest price for period: ${lowestWeekPrice}`)


    let monthAverageStorage: number[] = objJSON.monthData.arrayM; // used for calculating months

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
    console.log(`Bitcoin average price for 1 month (28days): ${averageValueM}
    Highest price for period: ${highestMonthPrice}
    Lowest price for period: ${lowestMonthPrice}`);

    // update arrayW = priceWeekStorage;
    //update arrayM = monthAverageStorage;
    let updatedJson = JSON.stringify({
        weekData: {
            arrayW: priceWeekStorage
        },
        monthData: {
            arrayM: monthAverageStorage
        }
    })

    fs.writeFile("/dataJSON/data.json", updatedJson, "utf-8", () => { })
}

    //invokes bitFluct with argument (bitcoin price from API)
    (async () => {
        try {
            const coinPrice: number = await getCoinPrice();
            let objJSON = await getObjFromJson();
            bitFluct(coinPrice, objJSON);


        } catch (err: any) {
            console.log(err)
        }
    })()

