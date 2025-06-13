import { OrderCard } from '@models/order';

export interface IUserResponse {
	id: string;
	token: string;
	username: string;

	success?: boolean;
}

export interface IMessageResponse {
	success: boolean;
	orders: OrderCard[];
	total: string;
	totalToday: string;
	message?: string;
}

export interface IMessage extends Omit<IMessageResponse, 'success'> {
	timestamp: number;
}
