// https://nuxt.com/docs/api/configuration/nuxt-config
const variables = {
  development: {
    // apiBase: 'https://tryyourideas.com/api/v1',
    apiBase: 'http://localhost:3000/api/v1',
    frontEndOrigin: 'http://localhost:3000',
    googleOAuthRedirect: 'http://localhost:3000/api/v1/sessions/oauth/google',
    githubOAuthRedirect: 'http://localhost:3000/api/v1/sessions/oauth/github',
    githubOAuthClientId: 'f51061212d92f100b373',
    githubOAuthClientSecret: 'fddf07928655b6b7cc3f56f19d91a609e48832b6'
  },
  production: {
    apiBase: 'https://tryyourideas.com/api/v1',
    frontEndOrigin: 'https://tryyourideas.com',
    googleOAuthRedirect: 'https://tryyourideas.com/api/v1/sessions/oauth/google',
    githubOAuthRedirect: 'https://tryyourideas.com/api/v1/sessions/oauth/github',
    githubOAuthClientId: 'df162a8cc3d7d1a472a8',
    githubOAuthClientSecret: '9b3b1079d0c352b6a5fa1397ba7d985141e935dd'
  }
}

const env = process.env.NODE_ENV || 'development'

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@/lib": "./lib",
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  components: {
    "dirs": [
      "~/components",
      "~/components/selectors"
    ]
  },
  runtimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB: process.env.MONGO_DB,
    MAILER_PASS: 'bUVWGSxHfcp6',
    MAILER_ACCOUNT: 'support@tryyourideas.com',
    supportInbox: 'support@tryyourideas.com',

    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    data: '/home/ubuntu/data',
    tmp: '/home/ubuntu/apps/tryyourideas.com/public/tmp',
    notificationsApi: 'https://juanlabrada.com/api/v1/notifications',
    googleOAuthClientSecret: 'undefined',
    googleOAuthRediret : 'undefined',
    githubOAuthClientSecret: variables[env].githubOAuthClientSecret,
    keyPassword: 'Ulloa%&91',
    accessTokenExpiresIn: 60,
    accessTokenPrivateKey: `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIrXdPg8g2p7QCAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECOWpLedGHAuRBIIEyFNqrZycVpW8
aT7NBLBYnaYgtLane3iYTvozawV4K30eatvtQSKWVL4SMd1MolmiCYnmE2IVnk0m
frfZ8T6PNPo6IebsMg+f6AgZ1wa3lsKXNlnwixbXIXLKbt5ylawug5y1Yw/MEOsb
yKD+/CFbsWuwVTAruaDA60rjQwbzmz5mKsBXaBnu8IeimBeT3pDOJR60IINnOxNi
jVgdU+2+4SlSCLIsZ/6+vAofYiROawl+/mPWZuoMPD8uH3KjoolaxxEVE3IUvkn1
kkUzcW/34/3PqiCKCbgKLj17su/oqpvbd1Fae92cZxJt+LyY7mPf8TMMRSre/VHO
Clhkm0ZumZ35U1L5CFoN8daGbS3MmvhxlMYeZd2RpB7BHz30xrwan1GsGm5q445w
VhqVG9y4j51v02BmGZdJHOvggouKHDqHu/bHFGjGINlvubQ/6NOgLsysD3w7kDyX
IibVVNy/44SO1ijznvirwsLKpsVbq7coCdK7SEsQSWvwhXtxK+0F/H/iAja0igQO
St7pwqd/A6w5M5ZrPfY7bZNtlpmnTX0iBUJ6VWgpQMzuEIQgKTjMI25wJHqLXH8+
Cr4f55TgKA8Y7zIfxTV4qCs2AeXdCOOKJqQ78l7O4QYzVtlITrIhP+Mis41u3wGw
cuFuNizz0B9K7DmUtd5enZuF6UfrPRzNX13pcJQf+r3ek7cjEqvdNxrRg2u8wjoU
iEkwLyX92uKJ30bwFEn3haJ9TApgEzcP8+XYiIK2ykvbDtPFq2v9yitSUscZU9Ew
ISTLOgjp8drGtO++fWIHBbBABoBX66HsxpQtNRsNwOTAaDaLy2++dEAKTyF4sKT9
v3xhHcygDhvfc/zAjK0Fqp5JpFK6yn1GQqoxcB68StaOTwkBYxizRjKENB1mmezh
Swvnre7DmP3TQ0bSGZm3p5YTw0iGB4i1kepLU0grZFGC2S9Dxq4f1bp59Zr2AoOf
U7NFZggrHizZzlNBdOg+XkGayhrmwaA+lLAR73hncB6CrNEcRxQnqQZOYWGQmFdR
0tJf/HFOy3Ha/3/u8ob/WWPQLR0MLM9RMmwfhX3HUtfnO6JeOB32dOa91X+Kizf+
w3oObE6AmhMP+tIrbIOlKDSUXDM6Hq8FcYZRJ3Lc9WfcNl0k2SncLSPSX8+7G7h4
zRNyhcEo4pN/N+rgMo7CSISHL4T+8vTjeN8PEfunvGmv6H1ggTcJCYTxoEK1Pzpj
487gdMcV8ceRED5MnBxxGf9RvJGEcM7tiCjAIkw101yN2XzkJMJ4m+89lMygn5sB
D1I7mbMhj7QbvubyHhk9RITiuddYfqdFgfSMplDJYvfrt+J4MR5ioQIrURZCOsfX
xlQnzBVwETBK0E9lwx74Y3fCqRMl3TaAJEttPsVoQYWVrmKzo+0PlceQZQ6J/M0q
Wh6y6kND7ly5cciTtmrjQMoQhOa60f/EqfIyGPoTDurEvFIvx97juKgsj8Y1Yhfq
B3ltiQWPXDquD9Slf1x8L2uILLM1+wg4Ieh/kkK+SCwAfIBgdz8kvQedPyoEzYf4
pHfB032s0ttoAHUs+s7nX/zfUY3NmCLywXnyTnMvyIGyCl+xxmCszg3RliLfaUyi
wFaTTJoV/jMlB4hdQsdcFQ==
-----END ENCRYPTED PRIVATE KEY-----`,
    refreshTokenExpiresIn: 360,
    refreshTokenPrivateKey: `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIrXdPg8g2p7QCAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECOWpLedGHAuRBIIEyFNqrZycVpW8
aT7NBLBYnaYgtLane3iYTvozawV4K30eatvtQSKWVL4SMd1MolmiCYnmE2IVnk0m
frfZ8T6PNPo6IebsMg+f6AgZ1wa3lsKXNlnwixbXIXLKbt5ylawug5y1Yw/MEOsb
yKD+/CFbsWuwVTAruaDA60rjQwbzmz5mKsBXaBnu8IeimBeT3pDOJR60IINnOxNi
jVgdU+2+4SlSCLIsZ/6+vAofYiROawl+/mPWZuoMPD8uH3KjoolaxxEVE3IUvkn1
kkUzcW/34/3PqiCKCbgKLj17su/oqpvbd1Fae92cZxJt+LyY7mPf8TMMRSre/VHO
Clhkm0ZumZ35U1L5CFoN8daGbS3MmvhxlMYeZd2RpB7BHz30xrwan1GsGm5q445w
VhqVG9y4j51v02BmGZdJHOvggouKHDqHu/bHFGjGINlvubQ/6NOgLsysD3w7kDyX
IibVVNy/44SO1ijznvirwsLKpsVbq7coCdK7SEsQSWvwhXtxK+0F/H/iAja0igQO
St7pwqd/A6w5M5ZrPfY7bZNtlpmnTX0iBUJ6VWgpQMzuEIQgKTjMI25wJHqLXH8+
Cr4f55TgKA8Y7zIfxTV4qCs2AeXdCOOKJqQ78l7O4QYzVtlITrIhP+Mis41u3wGw
cuFuNizz0B9K7DmUtd5enZuF6UfrPRzNX13pcJQf+r3ek7cjEqvdNxrRg2u8wjoU
iEkwLyX92uKJ30bwFEn3haJ9TApgEzcP8+XYiIK2ykvbDtPFq2v9yitSUscZU9Ew
ISTLOgjp8drGtO++fWIHBbBABoBX66HsxpQtNRsNwOTAaDaLy2++dEAKTyF4sKT9
v3xhHcygDhvfc/zAjK0Fqp5JpFK6yn1GQqoxcB68StaOTwkBYxizRjKENB1mmezh
Swvnre7DmP3TQ0bSGZm3p5YTw0iGB4i1kepLU0grZFGC2S9Dxq4f1bp59Zr2AoOf
U7NFZggrHizZzlNBdOg+XkGayhrmwaA+lLAR73hncB6CrNEcRxQnqQZOYWGQmFdR
0tJf/HFOy3Ha/3/u8ob/WWPQLR0MLM9RMmwfhX3HUtfnO6JeOB32dOa91X+Kizf+
w3oObE6AmhMP+tIrbIOlKDSUXDM6Hq8FcYZRJ3Lc9WfcNl0k2SncLSPSX8+7G7h4
zRNyhcEo4pN/N+rgMo7CSISHL4T+8vTjeN8PEfunvGmv6H1ggTcJCYTxoEK1Pzpj
487gdMcV8ceRED5MnBxxGf9RvJGEcM7tiCjAIkw101yN2XzkJMJ4m+89lMygn5sB
D1I7mbMhj7QbvubyHhk9RITiuddYfqdFgfSMplDJYvfrt+J4MR5ioQIrURZCOsfX
xlQnzBVwETBK0E9lwx74Y3fCqRMl3TaAJEttPsVoQYWVrmKzo+0PlceQZQ6J/M0q
Wh6y6kND7ly5cciTtmrjQMoQhOa60f/EqfIyGPoTDurEvFIvx97juKgsj8Y1Yhfq
B3ltiQWPXDquD9Slf1x8L2uILLM1+wg4Ieh/kkK+SCwAfIBgdz8kvQedPyoEzYf4
pHfB032s0ttoAHUs+s7nX/zfUY3NmCLywXnyTnMvyIGyCl+xxmCszg3RliLfaUyi
wFaTTJoV/jMlB4hdQsdcFQ==
-----END ENCRYPTED PRIVATE KEY-----`,

    public: {
      domain: 'tryyourideas.com',
      analyticsServer: 'https://juanlabrada.com',
      apiBase: variables[env].apiBase,
      googleOAuthClientId: 'undefined',
      googleOAuthRedirect: variables[env].googleOAuthRedirect,
      githubOAuthClientId: variables[env].githubOAuthClientId,
      githubOAuthRedirect: variables[env].githubOAuthRedirect,
      frontEndOrigin: variables[env].frontEndOrigin,
      accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyeRlVn7t5QKzI4yZO639
QQFKcdLTPoPL/wt8xMzpJx8BMB7ZGc8ssnXwhfLqs68Die1V9HMucDrfY9UWUx2m
ReLT9emhw7noaVh9hKX1Uie2otuatNzRzJ3cPbPTuE3IuP+GvD0m7pvvlosAVXJg
HHFM4loSsI1yIPRHbPwldTFs7speVZFSY/EOOtGTCuBkMLnn9Y3eTH3ATgODQvht
hrouY9DYbr8phjbDs3JV354Pj3KvsVdioB1GRKOTlT+LtTPfpzMAco1ZufQ3xWS6
SkZ5/uo05c+B1yaHdf7FdMPDkmPmxexIwPxScMfbf7d51WhKRFHW1v8vwzRHnl0X
+wIDAQAB
-----END PUBLIC KEY-----`,
      refreshTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyeRlVn7t5QKzI4yZO639
QQFKcdLTPoPL/wt8xMzpJx8BMB7ZGc8ssnXwhfLqs68Die1V9HMucDrfY9UWUx2m
ReLT9emhw7noaVh9hKX1Uie2otuatNzRzJ3cPbPTuE3IuP+GvD0m7pvvlosAVXJg
HHFM4loSsI1yIPRHbPwldTFs7speVZFSY/EOOtGTCuBkMLnn9Y3eTH3ATgODQvht
hrouY9DYbr8phjbDs3JV354Pj3KvsVdioB1GRKOTlT+LtTPfpzMAco1ZufQ3xWS6
SkZ5/uo05c+B1yaHdf7FdMPDkmPmxexIwPxScMfbf7d51WhKRFHW1v8vwzRHnl0X
+wIDAQAB
-----END PUBLIC KEY-----`,
      env
    }
  },
  routeRules: {
    // Set custom headers matching paths
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
    // Add cors headers
    '/api/v1/**': { cors: true },
    '/analytics/**': { cors: true },
    // Static page generated on-demand, revalidates in background
    '/blog/**': { swr: true },
    // Static page generated on-demand once
    '/articles/**': { static: true },
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})
