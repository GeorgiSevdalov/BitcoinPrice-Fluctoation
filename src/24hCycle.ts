import * as fs from 'fs';

import { DayStorage } from './2hCycle';//interface

import { getDailyData } from "./getDailyData";

import { getWeekMonData } from "./getWeekMonData";

export interface Data {
    weekData: {
        arrayW: number[]
    },
    monthData: {
        arrayM: number[]
    }
};

const dailyData: DayStorage = getDailyData();
const WeekMonData: Data = getWeekMonData();


//calculates average value for all 12 values.
function dailyAverage() {
    let priceDayStorage: number[] = dailyData.day.array;
    let sum: number = 0;
    let averageD: number = 0;

    for (let el of priceDayStorage) {
        sum += el;
    }

    averageD = sum / priceDayStorage.length;

    return averageD;
}

//once a day get daily average and save it in array for 1 week.
function weekCycle() {
    let dayInfo: number = dailyAverage();
    let priceWeekStorage: number[] = WeekMonData.weekData.arrayW;
    
    if (priceWeekStorage.length < 7) {
        priceWeekStorage.push(dayInfo);
    } else {
        priceWeekStorage.shift();
        priceWeekStorage.push(dayInfo);
    }

    return priceWeekStorage;
}

//once a day get daily average and save it in array for 1 month.
function monthCycle(){
    let dayInfo: number = dailyAverage();
    let priceMonthStorage: number[] = WeekMonData.monthData.arrayM;

    if (priceMonthStorage.length < 7) {
        priceMonthStorage.push(dayInfo);
    } else {
        priceMonthStorage.shift();
        priceMonthStorage.push(dayInfo);
    }

   return priceMonthStorage;
}

//overwritte JSON file with updated data.
function overwritteJson(){
    const updWeek = weekCycle();
    const updMonth = monthCycle();

    let updatedJson = JSON.stringify({
        weekData: {
            arrayW: updWeek
        },
        monthData: {
            arrayM: updMonth
        }
    })

    fs.writeFile("./dataJSON/weekMonthData.json", updatedJson, err =>{
        if (err) {
            console.log('Error writing file', err)
        }
    })

    console.log(dailyAverage());
    console.log(updatedJson);
}

//invoke function every 24 hrs.
setInterval(overwritteJson,1000 * 60 * 60 * 24)
