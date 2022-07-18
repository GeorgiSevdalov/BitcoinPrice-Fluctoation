"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const getDailyData_1 = require("./getDailyData");
const getObj_1 = require("./getObj");
;
const dailyData = (0, getDailyData_1.getDailyData)();
const WeekMonData = (0, getObj_1.getWeekMonData)();
//calculates average value for all 12 values.
function dailyAverage() {
    let priceDayStorage = dailyData.day.array;
    let sum = 0;
    let averageD = 0;
    for (let el of priceDayStorage) {
        sum += el;
    }
    averageD = sum / priceDayStorage.length;
    return averageD;
}
//once a day get daily average and save it in array for 1 week.
function weekCycle() {
    let dayInfo = dailyAverage();
    let priceWeekStorage = WeekMonData.weekData.arrayW;
    if (priceWeekStorage.length < 7) {
        priceWeekStorage.push(dayInfo);
    }
    else {
        priceWeekStorage.shift();
        priceWeekStorage.push(dayInfo);
    }
    return priceWeekStorage;
}
//once a day get daily average and save it in array for 1 month.
function monthCycle() {
    let dayInfo = dailyAverage();
    let priceMonthStorage = WeekMonData.monthData.arrayM;
    if (priceMonthStorage.length < 7) {
        priceMonthStorage.push(dayInfo);
    }
    else {
        priceMonthStorage.shift();
        priceMonthStorage.push(dayInfo);
    }
    return priceMonthStorage;
}
//overwritte JSON file with updated data.
function overwritteJson() {
    const updWeek = weekCycle();
    const updMonth = monthCycle();
    let updatedJson = JSON.stringify({
        weekData: {
            arrayW: updWeek
        },
        monthData: {
            arrayM: updMonth
        }
    });
    fs.writeFile("./dataJSON/weekMonthData.json", updatedJson, err => {
        if (err) {
            console.log('Error writing file', err);
        }
    });
    console.log(dailyAverage());
    console.log(updatedJson);
}
//invoke function every 24 hrs.
setInterval(overwritteJson, 1000 * 60 * 60 * 24);
