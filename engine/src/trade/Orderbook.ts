export interface Order{
    price:number ;
    quantity: number;
    orderId: string ;
    filled : number;
    side:"buy" | "sell";
    userId: string ;
}

export interface Fill{
    price: string ;
    qty: number ;
    tradeId: number ;
    otherUserId: string ;
    markerOrderId: string ;
}

export const BASE_CURRENCY="USD";


export class OrderBook{
    bids: Order[];
    asks: Order[];
    baseAsset: string;
    quoteAsset: string= BASE_CURRENCY ;
    lastTradeId: number;
    currentPrice:number ;

    constructor(baseAsset:string, bids: Order[], asks: Order[], lastTradeId: number, currentPrice: number){
        this.bids= bids;
        this.asks= asks ;
        this.baseAsset= baseAsset;
        this.lastTradeId = lastTradeId || 0 ;
        this.currentPrice = currentPrice || 0;
    }


    mathBid(order:Order):{fills:Fill[], executedQty: number}{
        const fills:Fill[] = [];
        let executedQty= 0;


        for (let i=0 ; i<this.asks.length; i++){
            if(this.asks[i].price <= order.price && executedQty<order.quantity){
                const filledQty= Math.min((order.quantity-executedQty), this.asks[i].quantity)
                executedQty+= filledQty;
                this.asks[i].filled += filledQty ;
                fills.push({
                    price: this.asks[i].price.toString(),
                    qty: filledQty,
                    tradeId:this.lastTradeId++,
                    otherUserId: this.asks[i].userId,
                    markerOrderId: this.asks[i].orderId
                });
            }
        }

        for (let i=0 ; i< this.asks.length; i++){
            if(this.asks[i].filled === this.asks[i].quantity){
                this.asks.splice(i,1);
                i--;
            }
        }

        return {
            fills,
            executedQty
        }

    }


    mathAsk(order:Order):{fills:Fill[], executedQty: number}{
        const fills:Fill[] = [];
        let executedQty= 0;


        for (let i=0 ; i<this.bids.length; i++){
            if(this.bids[i].price >= order.price && executedQty< order.quantity){
                const ammountRemaining= Math.min((order.quantity-executedQty), this.bids[i].quantity)
                executedQty+= ammountRemaining;
                this.bids[i].filled += ammountRemaining ;
                fills.push({
                    price: this.bids[i].price.toString(),
                    qty: ammountRemaining,
                    tradeId:this.lastTradeId++,
                    otherUserId: this.bids[i].userId,
                    markerOrderId: this.bids[i].orderId
                });
            }
        }

        for (let i=0 ; i< this.bids.length; i++){
            if(this.bids[i].filled === this.bids[i].quantity){
                this.bids.splice(i,1);
                i--;
            }
        }

        return {
            fills,
            executedQty
        }

    }






}