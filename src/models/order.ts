import {Data, Delete, Insert, Move, Update} from "@models/live-table";

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

export type LiveTableAction = Insert | Data | Delete | Update | Move;

export type LiveTableActions = Array<LiveTableAction>;