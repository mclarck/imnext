import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { initializeRest } from '../../../services/rest'

const options = {
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Credentials({
      id: 'client-login',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Client Login',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" }
      },
      async authorize(token) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const rest = initializeRest({ 'IM-COMPANY': token.company })
          const res = await rest.mutate("POST", process.env.API_CLIENT_LOGIN, token)
          let user = null
          if (res.ok) {
            const data = await res.json()
            user = data;
            // console.log(user)
          }
          if (user?.id) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null or false then the credentials will be rejected
            // return null
            // You can also Reject this callback with an Error or with a URL:
            // throw new Error('error message') // Redirect to error page 
            throw token.callbackFailure        // Redirect to a URL 
            // return null
          }
        } catch (error) { 
          throw token.callbackFailure
        }
      }
    }),
    // Providers.Email({
    //   // SMTP connection string or nodemailer configuration object https://nodemailer.com/
    //   server: process.env.NEXTAUTH_EMAIL_SERVER,
    //   // Email services often only allow sending email from a valid/verified address
    //   from: process.env.NEXTAUTH_EMAIL_FROM,
    // }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.NEXTAUTH_FACEBOOK_ID,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_SECRET,
    }),
    // Providers.Twitter({
    //   clientId: process.env.NEXTAUTH_TWITTER_ID,
    //   clientSecret: process.env.NEXTAUTH_TWITTER_SECRET,
    // }),
    // Providers.GitHub({
    //   clientId: process.env.NEXTAUTH_GITHUB_ID,
    //   clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
    // }),
  ],

  // @link https://next-auth.js.org/configuration/databases
  database: process.env.NEXTAUTH_DATABASE_URL,

  // @link https://next-auth.js.org/configuration/options#session
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /**
   * @param  {object} user     User object
   * @param  {object} account  Provider account
   * @param  {object} profile  Provider profile 
   * @return {boolean|string}  Return `true` to allow sign in
   *                           Return `false` to deny access
   *                           Return `string` to redirect to (eg.: "/unauthorized")
   */
    async signIn(user, account, profile) {
      let isAllowedToSignIn = false
      if (user) {
        isAllowedToSignIn = user.status === "active"
      }
      if (isAllowedToSignIn) {
        console.log(user, "signin")
        return true
      }
      // Return false to display a default error message
      // return false
      // Or you can return a URL to redirect to:
      throw profile.callbackFailure
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#session-callback
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session, user) => {
      //session.customSessionProperty = 'bar'
      const isSignIn = (user) ? true : false
      // Add auth_time to token on signin in
      if (isSignIn) {
        session.user = user
        // console.log(session, "session")
      }
      return Promise.resolve(session)
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#jwt-callback
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.id = user.id 
        token.name = user.name || user.username
        token.email = user.email
        token.phone = user.email
        token.auth_time = Math.floor(Date.now() / 1000)
      }
      return Promise.resolve(token)
    },

    /**
    * @param  {string} url      URL provided as callback URL by the client
    * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
    * @return {string}          URL the client will be redirect to
    */
    // async redirect(url, baseUrl) {
    //   console.log(baseUrl, "base url to redirect ...")
    //   console.log(url, "url to redirect ...")
    //   return url.startsWith(baseUrl)
    //     ? url
    //     : baseUrl
    // }
  },

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  // @link https://next-auth.js.org/configuration/pages
  pages: {
    //signIn: '/api/auth/signin',
    //signOut: '/api/auth/signout',
    //error: '/api/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/api/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  },

  // Additional options
  // secret: 'abcdef123456789' // Recommended (but auto-generated if not specified)
  debug: true, // Use this option to enable debug messages in the console
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth