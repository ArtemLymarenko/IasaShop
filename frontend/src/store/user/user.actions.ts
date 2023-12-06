import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthResponse, IEmailPassword } from './user.types'
import authService from '@/components/services/auth/auth.service'
import { removeFromStorage } from '@/components/services/auth/auth.helper'
import { errorCatch } from '@/components/api/api.helper'
import { ErrorJwtTypes } from '@/components/api/api.interceptor'

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await authService.authMain('login', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async (data, thunkApi) => {
		try {
			const response = await authService.authMain('register', data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await authService.getNewTokens()
			return response
		} catch (error) {
			if (
				errorCatch(error) === ErrorJwtTypes.JWT_EXPIRED ||
				errorCatch(error) === ErrorJwtTypes.JWT_MUST_PROVIDED
			) {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(error)
		}
	}
)
