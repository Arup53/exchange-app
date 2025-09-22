import { CREATE_ORDER, MessageFromApi } from "../types/fromApi";
import { Fill, Order, OrderBook } from "./Orderbook";

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


    checkAndLockFunds(baseAsset: string, quoteAsset: string, side:"buy"|"sell", userId: string, asset: string, price: string, quantity: string){
        if(side==="buy"){
            if((this.balances.get(userId)?.[quoteAsset]?.avaliable || 0) < Number(quantity)*Number(price)){
                throw new Error("Insufficient funds");
            }

            // @ts-ignore
            this.balances.get(userId)[quoteAsset].avaliable = this.balances.get(userId)?.[quoteAsset].avaliable - (Number(quantity)*Number(price));
             //@ts-ignore
            this.balances.get(userId)[quoteAsset].locked = this.balances.get(userId)?.[quoteAsset].locked + (Number(quantity) * Number(price));
        } else {
            if ((this.balances.get(userId)?.[baseAsset]?.avaliable || 0)< Number(quantity)){
                throw new Error("Insufficient funds");
            }

            // @ts-ignore
            this.balances.get(userId)[baseAsset].avaliable= this.balances.get(userId)?.[baseAsset].avaliable -(Number(quantity));

            // @ts-ignore
            this.balances.get(userId)[baseAsset].locked = this.balances.get(userId)?.[baseAsset].locked + Number(quantity);
        }
    }

   
 createDbTrades(fills: Fill[], market: string, userId: string){ 
        fills.forEach(fill=>{
            RedisManager.getInstance().pushMessage({
                type: TRADE_ADDED,
                data:{
                    market: market,
                    id:fill.tradeId.toString(),
                    isBuyerMaker: fill.otherUserId === userId,
                    price: fill.price,
                    quantity: fill.qty.toString(),
                    quoteQuantity: (fill.qty * Number(fill.price)).toString(),
                    timestamp: Date.now()
                }
            })
        })

    }

    updateDbOrders( order: Order, executedQty: number, fills: Fill[], market: string){
        RedisManager.getInstance().pushMessage({
            type: ORDER_UPDATE,
            data:{
                orderId: order.orderId, 
                executedQty: executedQty,
                market: market,
                price:order.price.toString(),
                quantity: order.quantity.toString(),
                side: order.side
            }
        })

        fills.forEach(fill=>{
            RedisManager.getInstance().pushMessage({
                type: ORDER_UPDATE,
                data: {
                    orderId: fill.markerOrderId,
                    executedQty: fill.qty
                }
            })
        })
    }


}