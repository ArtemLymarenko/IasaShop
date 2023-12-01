import axios from 'axios'
import { getContentType } from './api.helper'

export const instance = axios.create({
	baseURL: import.meta.env.BASE_URL,
	headers: getContentType()
})

instance.interceptors.request.use(config => {
	//1 - Get access token
	//2 - if config and access token exist => config.header
	return config
})

instance.interceptors.response.use(
	config => config,
	error => {
		// Cheking error
		return error
	}
)
