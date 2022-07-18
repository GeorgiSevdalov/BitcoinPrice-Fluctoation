import * as fs from 'fs';

export function getDailyData() {
    const readed = fs.readFileSync("./dataJSON/dailyValues.json", "utf-8");
     return JSON.parse(readed);
     
 }
 
 getDailyData()