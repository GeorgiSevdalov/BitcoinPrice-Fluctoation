"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getData_1 = require("./getData");
//returnt average value for last 24 hrs.
function dailyCycle(actualPrice) {
    console.log(actualPrice);
}
let run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinPrice = yield (0, getData_1.getCoinPrice)();
        dailyCycle(coinPrice);
    }
    catch (err) {
        console.error(err);
    }
});
setInterval(run, 2000);
