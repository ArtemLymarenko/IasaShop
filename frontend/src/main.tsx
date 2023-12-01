import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.scss'
import Router from './components/router/Router'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ChakraProvider>
				<CSSReset />
				<React.StrictMode>
					<Router />
				</React.StrictMode>
			</ChakraProvider>
		</PersistGate>
	</Provider>
)
