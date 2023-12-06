import { cartSlice } from '@/store/cart/cart.slice'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@/store/user/user.actions'

const rootActions = {
	...cartSlice.actions,
	...userActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
