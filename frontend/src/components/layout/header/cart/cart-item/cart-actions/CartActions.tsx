import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { ICartItem } from '@/types/cart.interface'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react'
import { FC } from 'react'

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 1
		})

	const inc = getIncrementButtonProps()
	const dec = getDecrementButtonProps()
	const input = getInputProps()

	const { removeFromCart, changeQuantity } = useActions()

	const { cart } = useCart()
	const quantity = cart.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div>
			<HStack maxW='320px'>
				<Button
					{...dec}
					onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
					isDisabled={quantity === 1}
				>
					<MinusIcon fontSize={10} />
				</Button>
				<Input
					{...input}
					focusBorderColor='black'
					readOnly
					_hover={{ cursor: 'default' }}
					value={quantity}
				/>
				<Button
					{...inc}
					onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
					isDisabled={quantity === item.size.amountStorage}
				>
					<AddIcon fontSize={10} />
				</Button>
			</HStack>

			<Button
				variant='link'
				marginTop='5px'
				size='12px'
				color='#ae1e2c'
				opacity={0.7}
				_hover={{
					opacity: '1',
					fontWeight: '600'
				}}
				onClick={() => removeFromCart({ id: item.id })}
			>
				Remove
			</Button>
		</div>
	)
}

export default CartActions
