export const config = {
  firebase: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    databaseUrl: process.env.FIREBASE_ADMIN_DATABASE_URL
  },
  cookie: {
    token: 'rjb_token'
  },
  routes: {
    home: '/',
    signin: '/signin',
    register: '/register',
    profile: '/profile'
  },
  clientURL: process.env.NEXT_PUBLIC_CLIENT_URL
};
