
import { useTypedSelector } from './useTypedSelector';
import { useDispatch } from 'react-redux';
import { cartSlice } from '@/store/cart/cart.slice';

export const useCart = () => {
  const cart = useTypedSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalSum = cart.reduce(
    (acc, item) => (acc += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    dispatch(cartSlice.actions.clearCart());
  };

  return { cart, totalSum, clearCart };
};

