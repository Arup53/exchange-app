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


    matchBuyOrder(order:Order){

    }

    matchSellOrder(order:Order){

    }
















}