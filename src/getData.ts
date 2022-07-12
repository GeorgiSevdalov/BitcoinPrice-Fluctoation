import fetch from 'node-fetch';

//pass the result form API and parse it to number.

let printIt = (priceAsString: string): number => {
    const apiPrice = Number(priceAsString);
    return apiPrice;

    // return Number(priceAsString);
    // return +priceAsString;
} 

// warp fetch in export function and create Promise

export function getCoinPrice(): Promise<number> {
    return new Promise( (resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '14100987acmsh61d0d81580d426bp1bdc39jsn61ae73a0184c',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        /*fetch the data; create a function to do something with this data
         and access it anywhere!*/
        fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
            .then((response: any) => response.json())
            .then((response: {data: {price: string}}) => {
                resolve(printIt(response.data.price))
            })
            .catch((err: any) => reject(err));   
    })
    
}
