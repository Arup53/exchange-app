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
    quantity: number ;
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

            return Array.from(levelMap.entries()).map(([price, data])=>({price,quantity:data.quantity,orderCount:data.orderCount})).slice(0,depth);
        };

        return {
            bids: aggregateLevels(this.buyOrders),
            asks: aggregateLevels(this.sellOrders)
        }
    }


    getBestBid(): number | null {
        return this.buyOrders.length>0? this.buyOrders[0].price: null ;
    }

    getBestAsk():number | null {
        return this.sellOrders.length > 0? this.sellOrders[0].price : null;
    }

    getSpread():number | null {
        const bid= this.getBestBid();
        const ask = this.getBestAsk();
        return (bid !== null && ask !== null)? ask-bid :null ;
    }

  getRecentTrades(count: number = 10): Trade[] {
    return this.trades.slice(-count);
  }

    displayOrderBook():void {
        console.log('\n----- ORDER BOOK');
        const {bids,asks}= this.getOrderBookLevels();

        console.log(`ASKS (Sell Orders):`);
       asks.reverse().forEach(level => {
      console.log(`  ${level.quantity.toFixed(2)} , ${level.price.toFixed(2)}, (${level.orderCount} orders)`);
    });

    const bid = this.getBestBid();
    const ask = this.getBestAsk();
    const spread= this.getSpread();
    console.log(`-- Spread: ${spread?.toFixed(2) || 'N/A'} --`);

    console.log('BIDS (Buy Orders):');
    bids.forEach(level=>{
        console.log(`  ${level.quantity.toFixed(2)} , ${level.price.toFixed(2)}, (${level.orderCount} orders)`);
    })
    console.log(`Best Bid: ${bid?.toFixed(2) || 'N/A'}, Best Ask: ${ask?.toFixed(2) || 'N/A'}`);
    console.log('--------\n');

    }
}


function runOrderBookExample(): void {
  console.log('Starting OrderBook Example\n');
  
  const orderBook = new OrderBook();

  // Add some initial limit orders
  console.log('--- Adding Initial Orders ---');
  orderBook.addOrder(OrderSide.BUY, OrderType.LIMIT, 100.00, 10);
  orderBook.addOrder(OrderSide.BUY, OrderType.LIMIT, 99.50, 15);
  orderBook.addOrder(OrderSide.BUY, OrderType.LIMIT, 99.00, 20);
  
  orderBook.addOrder(OrderSide.SELL, OrderType.LIMIT, 101.00, 12);
  orderBook.addOrder(OrderSide.SELL, OrderType.LIMIT, 101.50, 18);
  orderBook.addOrder(OrderSide.SELL, OrderType.LIMIT, 102.00, 25);

  orderBook.displayOrderBook();

  // Add an order that will match
  console.log('--- Adding Matching Order ---');
  orderBook.addOrder(OrderSide.BUY, OrderType.LIMIT, 101.25, 20);
  orderBook.displayOrderBook();

  // Add a market order
  console.log('--- Adding Market Order ---');
  orderBook.addOrder(OrderSide.SELL, OrderType.MARKET, 0, 8);
  orderBook.displayOrderBook();

  // Show recent trades
  console.log('--- Recent Trades ---');
  const recentTrades = orderBook.getRecentTrades();
  recentTrades.forEach(trade => {
    console.log(`${trade.quantity} @ ${trade.price} (${new Date(trade.timestamp).toLocaleTimeString()})`);
  });
  
  console.log('\nOrderBook example completed!');
}


runOrderBookExample();
