import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  // protect /admin/* but NOT /admin/login
  matcher: ['/admin/((?!login).*)'],
}
