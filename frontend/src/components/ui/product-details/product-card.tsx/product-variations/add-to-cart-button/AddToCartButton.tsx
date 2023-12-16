import { FC } from 'react'
import { Button } from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions'
import { IProduct } from '@/types/product.interface'
import { IProductInfo } from '@/types/productInfo.interface'

interface IAddToCart {
	product: IProduct
	selectedSize: IProductInfo
}

const AddToCartButton: FC<IAddToCart> = ({ product, selectedSize }) => {
	const { addToCart } = useActions()

	return (
		<div>
			<Button
				onClick={() => addToCart({ product, quantity: 1, size: selectedSize})}
				bg='#000000'
				color='#ffffff'
				borderRadius='50px'
				width='300px'
				height='60px'
				textTransform='uppercase'
				_hover={{
					bg: '#ffffff',
					color: '#000000',
					border: '1px solid black'
				}}
			>
				Add to basket
			</Button>
		</div>
	)
}

export default AddToCartButton
