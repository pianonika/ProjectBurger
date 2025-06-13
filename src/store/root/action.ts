import { LiveTableActionTypes } from '@store/ordersList/actions';
import { TSendOrderActions } from '@store/order/action';
import { TUserListActionTypes } from '@store/ordersListForUser/actions';
import { IAuthActions } from '@store/auth/action';
import { TCartActions } from '@store/cart/action';
import { TChosenIngredientActions } from '@store/chosen-ingredient/action';
import { TIngredientsActions } from '@store/ingredients/action';

export type AppActions =
	| LiveTableActionTypes
	| TUserListActionTypes
	| IAuthActions
	| TCartActions
	| TChosenIngredientActions
	| TIngredientsActions
	| TSendOrderActions;
