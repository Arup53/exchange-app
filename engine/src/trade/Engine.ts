import { OrderBook } from "./Orderbook";

export const BASE_CURRENCY="USD";

interface UserBalance {
    [key:string]:{
        avaliable: number ;
        locked: number ;
    }
}


export class Engine {
    private orderbooks: OrderBook[]=[];
    private balances: Map<string, UserBalance> = new Map();


    process({}):{message:, clientId:string}{
        
    }
}