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

    


















}