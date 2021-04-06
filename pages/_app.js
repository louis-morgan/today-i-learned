import 'minireset.css'
import '../styles/vars.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth'
import { ProfileProvider } from '../context/profile'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    return (
        <AuthProvider>
            {router.route == '/profile' && (
                <ProfileProvider>
                    <Component {...pageProps} />
                </ProfileProvider>
            )}
        </AuthProvider>
    )
}

export default MyApp
