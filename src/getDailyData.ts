import * as fs from 'fs';
import { DayStorage } from './2hCycle';

export function getDailyData(): DayStorage {
    const valueArr = fs.readFileSync("./dataJSON/dailyValues.json", "utf-8");
    return JSON.parse(valueArr);
}

getDailyData()