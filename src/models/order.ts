export interface Order {
	number: string;
}

export interface OrderStore {
	name: string;
	order: Order;
	success: boolean;
}

export interface OrderCard {
	ingredients: Array<string>;
	_id: string;
	status: string;
	number: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}
