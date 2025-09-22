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


    publisWsDepthUpdates(fills: Fill[], price: string, side: "buy" | "sell", market: string) {
        const orderbook = this.orderbooks.find(o => o.ticker() === market);
        if (!orderbook) {
            return;
        }
        const depth = orderbook.getDepth();
        if (side === "buy") {
            const updatedAsks = depth?.asks.filter(x => fills.map(f => f.price).includes(x[0].toString()));
            const updatedBid = depth?.bids.find(x => x[0] === price);
            console.log("publish ws depth updates")
            RedisManager.getInstance().publishMessage(`depth@${market}`, {
                stream: `depth@${market}`,
                data: {
                    a: updatedAsks,
                    b: updatedBid ? [updatedBid] : [],
                    e: "depth"
                }
            });
        }
        if (side === "sell") {
           const updatedBids = depth?.bids.filter(x => fills.map(f => f.price).includes(x[0].toString()));
           const updatedAsk = depth?.asks.find(x => x[0] === price);
           console.log("publish ws depth updates")
           RedisManager.getInstance().publishMessage(`depth@${market}`, {
               stream: `depth@${market}`,
               data: {
                   a: updatedAsk ? [updatedAsk] : [],
                   b: updatedBids,
                   e: "depth"
               }
           });
        }
    }

}