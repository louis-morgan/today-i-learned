import '../styles/globals.scss'
import 'minireset.css'

import {AuthProvider} from '../auth'

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
