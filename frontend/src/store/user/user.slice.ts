import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.types'
import { authMainAction, checkAuth, logout } from './user.actions'

const initialState: IInitialState = {
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user') as string)
		: null,
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		return builder
			.addCase(authMainAction('register').pending, state => {
				state.isLoading = true
			})
			.addCase(authMainAction('register').fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(authMainAction('register').rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(authMainAction('login').pending, state => {
				state.isLoading = true
			})
			.addCase(authMainAction('login').fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(authMainAction('login').rejected, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})
