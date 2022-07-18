import { getCoinPrice } from "./getData";//log price at the moment

import { getWeekMonData } from "./getObj";

import { Data } from "./24hCycle";


const WeekMonData: Data = getWeekMonData();

function averageWeek() {
    let priceWeekStorage: number[] = WeekMonData.weekData.arrayW;
    let sum: number = 0;
    let averageW: number = 0;

    for (let el of priceWeekStorage) {
        sum += el;
    }

    averageW = sum / priceWeekStorage.length;

    return averageW;
}

function averageMonth() {
    let priceMonthStorage: number[] = WeekMonData.monthData.arrayM;
    let sum: number = 0;
    let averageM: number = 0;

    for (let el of priceMonthStorage) {
        sum += el;
    }

    averageM = sum / priceMonthStorage.length;

    return averageM;
}

function output(momentPrice: number) {
    let priceWeekStorage: number[] = WeekMonData.weekData.arrayW;
    let priceMonthStorage: number[] = WeekMonData.monthData.arrayM;
    console.log(`Bitcoin price in this moment: ${momentPrice}`)
    console.log(`Average value for week is: ${averageWeek()}
    Highest price for period: ${Math.max(...priceWeekStorage)}
    Lowest price for period: ${Math.min(...priceWeekStorage)}`);
    console.log(`Average value for month is: ${averageMonth()}
    Highest price for period: ${Math.max(...priceMonthStorage)}
    Lowest price for period: ${Math.min(...priceMonthStorage)}`);
}

(async () => {
    try {
        const coinPrice: number = await getCoinPrice();
        output(coinPrice);

    } catch (err: any) {
        console.log(err);
    }
})()