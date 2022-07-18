import { getCoinPrice } from "./getDataFromApi";

import { getDailyData } from "./getDailyData"

import * as fs from 'fs';

export interface DayStorage {
    day: {
        array: number[]
    }
}

/*collects the current price every 2 hours and
 records the data for average value for last 24 hrs
 in dailyValues.json.*/
function dailyCycle(actualPrice: number, dailyData: DayStorage) {

    let priceDayStorage: number[] = dailyData.day.array;

    if (priceDayStorage.length < 12) {
        priceDayStorage.push(actualPrice)
    } else {
        priceDayStorage.shift();
        priceDayStorage.push(actualPrice)
    };


    let updatedDayStor = JSON.stringify({
        day: {
            array: priceDayStorage
        }
    })

    //overwritte JSON file with updated data.
    fs.writeFile("./dataJSON/dailyValues.json", updatedDayStor, err => {
        if (err) {
            console.log('Error writing file', err);

        }
    });
}

//get bitcoin price from getData.
let run = async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        let dailyData = getDailyData();
        dailyCycle(coinPrice, dailyData);
    }
    catch (err: any) {
        console.error(err);
    }
}

//invoke function every 2 hrs.
setInterval(run, 7200000);