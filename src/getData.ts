import fetch from 'node-fetch';

let printIt = (priceAsString: string): number => {
    const value = Number(priceAsString);
    return value;
}    

export function getCoinPrice(): Promise<number> {
    return new Promise( (resolve, reject) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '14100987acmsh61d0d81580d426bp1bdc39jsn61ae73a0184c',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        /*first fetch the data and then create a 
        function to do something with this data
        Then pass the result to that function and access it anywhere!*/
        let value;
        fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
            .then((response: any) => response.json())
            .then((response: {data: {price: string}}) => {
                resolve(printIt(response.data.price))
            })
            .catch((err: any) => reject(err));   
    })
    
}
