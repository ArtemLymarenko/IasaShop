import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const cart = useTypedSelector(state => state.cart.items)

	const totalSum = cart.reduce(
		(acc, item) => (acc += item.product.price * item.quantity),
		0
	)

	return { cart, totalSum }
}
