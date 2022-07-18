import { getCoinPrice } from "./getData";

import { getDailyData } from "./getDailyData"

import * as fs from 'fs';


interface WeekStorage {
    day: {
        array: number []
    }
}

/*collects the current price every 2 hours and
 returnt average value for last 24 hrs.*/
function dailyCycle(actualPrice: number, dailyData:WeekStorage){

    let priceDayStorage: number[] = dailyData.day.array;
    let dailyAverage:number = 0; 
    let sum: number = 0; 

    if (priceDayStorage.length < 12) {
        priceDayStorage.push(actualPrice)
    } else {
        priceDayStorage.shift();
        priceDayStorage.push(actualPrice)
    };

    for(let el of priceDayStorage) {
        sum += el;
    }

    dailyAverage = sum / priceDayStorage.length;

    let updatedDayStor = JSON.stringify({
        day: {
            array: priceDayStorage
        }
    })

    //overwritte JSON file with updated data.
    fs.writeFile("./dataJSON/dailyValues.json", updatedDayStor, err =>{
        if(err) {
            console.log('Error writing file', err);
            
        }
    });

    return(dailyAverage);
}

let run =async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        let dailyData = getDailyData();
        dailyCycle(coinPrice, dailyData);
    }
    catch(err: any){
        console.error(err);
    }
}

setInterval(run, 7200000);