import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { initializeRest } from '../../../services/rest'

const options = {
  providers: [
    Providers.Credentials({
      id: 'client-login',
      name: 'Client Login',
      credentials: {},
      async authorize(token) {
        try {
          const rest = initializeRest({ 'IM-COMPANY': token.company })
          const res = await rest.mutate("POST", process.env.API_CLIENT_LOGIN, token)
          const user = await res.json()
          console.log(user)
          return user
        } catch (error) {
          console.log(error.message)
        }
      }
    }),
    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.NEXTAUTH_FACEBOOK_ID,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
    }),
  ],
  database: process.env.NEXTAUTH_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    async signIn(user, account, profile) {
      let isAllowedToSignIn = false
      if (user) {
        isAllowedToSignIn = user.status === "active"
      }
      if (isAllowedToSignIn) {
        return true
      }
      return false;
    },
    async redirect(url, baseUrl) {
      console.log(url, "is redirected to")
      return url
    },
    session: async (session, user) => {
      const isSignIn = (user) ? true : false
      if (isSignIn) {
        session.user = user
      }
      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      if (isSignIn) {
        token.id = user.id
        token.name = user.name || user.username
        token.email = user.email
        token.phone = user.email
        token.auth_time = Math.floor(Date.now() / 1000)
      }
      return Promise.resolve(token)
    },
  },
  debug: true
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth