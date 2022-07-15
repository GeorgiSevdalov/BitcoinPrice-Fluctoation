import * as fs from 'fs';

export function getDailyData() {
    const data = fs.readFileSync("./dataJSON/dailyValues.json", "utf-8");
     return JSON.parse(data);
     
 }
 
 getDailyData()