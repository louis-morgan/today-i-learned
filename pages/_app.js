import 'minireset.css'
import '../styles/vars.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import { useRouter } from 'next/router'
import { AuthProvider } from '../context/auth.js'
import { ProfileProvider } from '../context/profile'
import Layout from '@components/Layout'
function MyApp({ Component, pageProps }) {
    const router = useRouter()
    return (
        <AuthProvider>
            {router.route.includes('profile') ? (
                <ProfileProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProfileProvider>
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
        </AuthProvider>
    )
}

export default MyApp
