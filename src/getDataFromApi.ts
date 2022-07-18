import fetch from 'node-fetch';


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
        
        fetch('https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price?referenceCurrencyUuid=yhjMzLPhuIDl', options)
        .then((response: any) => response.json())
            .then((response: {data: {price: string}}) => {
                resolve(Number(response.data.price))
                return Number(response.data.price);
            })
            .catch((err: any) => reject(err));   
    })
    
}
