import { getCoinPrice } from "./getData";

import { getDailyData } from "./getDailyData"

//returnt average value for last 24 hrs.

function dailyCycle(actualPrice: number, dailyData:object){

    let priceWeekStorage: number[] = dailyData.weekData;

    if (priceWeekStorage.length < 12) {
        priceWeekStorage.push(actualPrice)
    } else {
        priceWeekStorage.shift();
        priceWeekStorage.push(actualPrice)
    };

    // console.log(actualPrice);
}

let run = async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        let dailyData:object = getDailyData();
        dailyCycle(coinPrice, dailyData);
    }
    catch(err: any){
        console.error(err);
    }
}

setInterval(run, 7200000);