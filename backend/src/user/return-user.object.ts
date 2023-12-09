import { returnOrderInfo } from "src/order/return-order-info.object"

export const returnUserObject = {
	id: true,
	email: true,
	userName: true,
	firstName: true,
	lastName: true,
	phone: true,
	password: false
}


export const returnUserObjectFullset = {
	...returnUserObject,
	orders: {
		select: returnOrderInfo
	},
}