export default function redirectToLogin(context) {
    context.res.writeHead(302, { location: '/login' })
    context.res.end()
}
