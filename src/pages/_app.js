import React from 'react'
import {SessionProvider as AuthProvider} from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'




const MyApp = ({ session ,Component, pageProps }) => {
  return (
    <AuthProvider session={session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </AuthProvider>
  )

}

export default MyApp
