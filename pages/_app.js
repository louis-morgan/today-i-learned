import 'minireset.css'
import '../styles/vars.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'

import { AuthProvider } from '../auth'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
