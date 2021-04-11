import 'minireset.css'
import '../styles/vars.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { AuthProvider } from '../context/auth.js'
import { ProfileProvider } from '../context/profile'
import Layout from '@components/Layout'
function MyApp({ Component, pageProps }) {
    const queryClientRef = useRef()
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient()
    }
    const router = useRouter()
    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <ReactQueryDevtools initialIsOpen={false} />
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
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp
