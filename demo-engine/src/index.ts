enum OrderSide {
    BUY = 'BUY',
    SELL = 'SELL',
}

enum OrderType {
    MARKET = 'MARKET',
    LIMIT = 'LIMIT',
}


interface Order {
    id: string;
    side: OrderSide;
    type: OrderType;
    price: number;
    quantity: number;
    timestamp: number;
}


interface Trade {
    buyOrderId: string;
    sellOrderId: string;
    price: number;
    quantity: number;
    timestamp: number;
}

interface OrderBookLevel {
    price: number;
    qunatity: number ;
    orderCount: number ;
}


class OrderBook{
    private buyOrders: Order [] = [] ;
    private sellOrders: Order []= [] ;
    private trades : Trade[] = [] ;
    private orderCounter = 0 ;
    

    addOrder(side:OrderSide, type:OrderType, price:number, quantity:number):string{
        const orderId = `order_${++this.orderCounter}`;

        const order: Order ={
            id: orderId, 
            side,
            type,
            price: type=== OrderType.MARKET?(side === OrderSide.BUY? Infinity:0): price,
            quantity,
            timestamp: Date.now()
        }

        console.log(`Adding ${side} order with quantity ${quantity} and type is ${type}`)
        if(side=== OrderSide.BUY){
            this.matchBuyOrder(order);
        }else {
            this.matchSellOrder(order);
        }

        return orderId;

    }


    matchBuyOrder(buyOrder:Order):void{
        while(buyOrder.quantity>0 && this.sellOrders.length>0){
            const bestSell = this.sellOrders[0];

            if(buyOrder.price >= bestSell.price){
                const tradeQuantity = Math.min(buyOrder.quantity, bestSell.quantity) ;
                const tradePrice = bestSell.price ;

                this.createTrade(buyOrder.id, bestSell.id, tradePrice, tradeQuantity)

                buyOrder.quantity -= tradeQuantity ;
                bestSell.quantity -= tradeQuantity ;

                if (bestSell.quantity===0){
                    this.sellOrders.shift()    // remove first element
                }

            }else{
                break;
            }

        }

        // if no match or remaining left of particular order push to orderbook
        if(buyOrder.quantity>0 && buyOrder.type=== OrderType.LIMIT){
            this.insertBuyOrder(buyOrder);
        }

    }

   private matchSellOrder(sellOrder:Order):void{
    while(sellOrder.quantity>0 && this.buyOrders.length>0){
        const bestBuy= this.buyOrders[0];

        if(sellOrder.price <= bestBuy.price){
            const tradeQuantity= Math.min(sellOrder.quantity, bestBuy.quantity);
            const tradePrice = bestBuy.price ;

            this.createTrade(bestBuy.id, sellOrder.id,tradePrice, tradeQuantity)

            bestBuy.quantity -= tradeQuantity ;
            sellOrder.quantity -= tradeQuantity;

            if(bestBuy.quantity === 0){
                this.buyOrders.shift();
            }
        }else{
            break;
        }
    }

    if(sellOrder.quantity>0 && sellOrder.type=== OrderType.LIMIT){
        this.insertSellOrder(sellOrder)
    }

    }

    
    private insertBuyOrder(order:Order){
        let inserted = false ;
        for (let i=0; i< this.buyOrders.length; i++){
            const existingOrder= this.buyOrders[i];
            if(order.price>existingOrder.price || (order.price===existingOrder.price && order.timestamp< existingOrder.timestamp)){
                this.buyOrders.splice(i,0,order);
                inserted=true;
                break;
            }
        }
        if(!inserted){
            this.buyOrders.push(order);
        }
}


private insertSellOrder(order: Order): void {
    let inserted = false;
    for (let i = 0; i < this.sellOrders.length; i++) {
        const existingOrder = this.sellOrders[i];
        if (order.price < existingOrder.price || 
            (order.price === existingOrder.price && order.timestamp < existingOrder.timestamp)) {
                this.sellOrders.splice(i, 0, order);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            this.sellOrders.push(order);
        }
    }
    
    
    private createTrade(buyOrderId:string, sellOrderId: string, price: number, quantity:number){
        const trade:Trade ={
            buyOrderId,
            sellOrderId,
            price,
            quantity,
            timestamp:Date.now()
        }

        this.trades.push(trade);
        console.log(`TRADE: ${quantity} @ ${price} (Buy: ${buyOrderId}, Sell: ${sellOrderId})`)
    }


    getOrderBookLevels(depth:number=5):{bids:OrderBookLevel[], asks:OrderBookLevel[]}{
        const aggregateLevels= (orders:Order[]): OrderBookLevel[]=>{
            const levelMap= new Map<number, {quantity:number, orderCount:number}>();

            for (const order of orders.slice(0, depth*3)){
                if(levelMap.has(order.price)){
                    const level= levelMap.get(order.price)!;
                    level.quantity+=order.quantity ;
                    level.orderCount +=1;
                }else{
                    levelMap.set(order.price, {quantity:order.quantity, orderCount:1});
                }
            }

            return Array.from(levelMap.entries()).map(([price, data])=>({price,qunatity:data.quantity,orderCount:data.orderCount})).slice(0,depth);
        };

        return {
            bids: aggregateLevels(this.buyOrders),
            asks: aggregateLevels(this.sellOrders)
        }
    }


    getBestBid(): number|null {
        return this.buyOrders.length>0? this.buyOrders[0].price: null ;
    }




}