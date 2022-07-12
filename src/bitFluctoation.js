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
function bitFluct(value) {
    console.log(`Bitcoin price in this moment: ${value}`);
    const _seven = 7; //declarate it like const because need 7 days period.
    let priceStorage = [];
    let sum = 0;
    if (priceStorage.length < _seven) {
        priceStorage.push(value);
    }
    else if (priceStorage.length === _seven) {
        priceStorage.shift();
        priceStorage.push(value);
    }
    for (let el of priceStorage) {
        sum += el;
    }
    let averageValue = sum / priceStorage.length;
    //////////////////////////////////////////////////////////////////
    let weekAverageStorage = [];
    // used for calculating months
    let mounthAverageStorage = [];
    /**
     * This function gets the average storage days.
     */
    if (weekAverageStorage.length < 7) {
        weekAverageStorage.push(averageValue);
    }
    else {
        weekAverageStorage.shift();
        weekAverageStorage.push(averageValue);
    }
    if (mounthAverageStorage.length < 30) {
        mounthAverageStorage.push(averageValue);
    }
    else {
        mounthAverageStorage.shift();
        mounthAverageStorage.push(averageValue);
    }
    console.log((weekAverageStorage));
    console.log((mounthAverageStorage));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coinPrice = yield (0, getData_1.getCoinPrice)();
        bitFluct(coinPrice);
    }
    catch (err) {
        console.log(err);
    }
    //     .then((coinPrice: number) => {
    //     console.log("Coin price:");
    //     console.log(coinPrice);
    // })
    //     .catch((err: any) => )
}))();
