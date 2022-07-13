import * as fs from 'fs';
import { Data } from './bitFluctoation';


export function getObjFromJson(): Data {
   const data = fs.readFileSync("./dataJSON/data.json", "utf-8");
    return JSON.parse(data);
    
}

getObjFromJson()
