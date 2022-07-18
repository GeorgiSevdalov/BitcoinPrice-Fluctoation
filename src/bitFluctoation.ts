// import bitcoin price from API.
import { getCoinPrice } from "./getData";
// import { weekData, monthData } from "../dataJSON/data.json";
import { getWeekMonData } from "./getObj";

import * as fs from 'fs';

export interface Data {
    weekData: {
        arrayW: number[]
    },
    monthData: {
        arrayM: number[]
    }
};

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
    } else {
        priceWeekStorage.shift();
        priceWeekStorage.push(bitPrice)
    };

    for (let el of priceWeekStorage) {
        sumWeek += el;

        if (el > highestWeekPrice) {
            highestWeekPrice = el
        }
        if (el < checkLow) {
            checkLow = el;
            lowestWeekPrice = el;
        }
    };

    let averageValueW: number = sumWeek / priceWeekStorage.length;  //average value for week.

    

    console.log(`Bitcoin average price for week: ${averageValueW}
    Highest price for period: ${highestWeekPrice}
    Lowest price for period: ${lowestWeekPrice}`);

    if(bitPrice < highestWeekPrice){
        console.log(`Price is: ${highestWeekPrice - bitPrice}$ lower than highest price for period`)
    }else{
        console.log(`Current price is the highest for last seven days`)
    }


    let monthAverageStorage: number[] = objJSON.monthData.arrayM; // collected daily price for BC for 1 month.

    if (monthAverageStorage.length < 28) {
        monthAverageStorage.push(bitPrice);
    } else {
        monthAverageStorage.shift();
        monthAverageStorage.push(bitPrice)
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

    let averageValueM: number = sumMonth / monthAverageStorage.length;  //average value for month.
    console.log(`Bitcoin average price for 1 month (28days): ${averageValueM}
    Highest price for period: ${highestMonthPrice}
    Lowest price for period: ${lowestMonthPrice}`);

    if(bitPrice < highestMonthPrice){
        console.log(`Price is: ${highestMonthPrice - bitPrice}$ lower than highest price for period`)
    }else{
        console.log(`Current price is the highest for last twenty eight days`)
    }

    // update arrayW = priceWeekStorage;
    //update arrayM = monthAverageStorage;
    let updatedJson = JSON.stringify({
        weekData: {
            arrayW: priceWeekStorage
        },
        monthData: {
            arrayM: monthAverageStorage
        }
    });

    //overwritte JSON file with updated data.

    fs.writeFile("./dataJSON/weekMonthData.json", updatedJson, err => {
        if (err) {
            console.log('Error writing file', err)
        }
    });
}

//invokes bitFluct with argument (bitcoin price from API, and obj from JSON).

(async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        let objJSON = getWeekMonData();
        bitFluct(coinPrice, objJSON);


    } catch (err: any) {
        console.log(err)
    }
})()

