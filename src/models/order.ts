export interface Order {
	number: string;
}

export interface OrderStore {
	name: string;
	order: Order;
	success: boolean;
}
