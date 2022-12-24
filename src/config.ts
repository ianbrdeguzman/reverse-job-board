export const config = {
  firebase: {
    projectId:
      process.env.NODE_ENV === 'production'
        ? process.env.FIREBASE_ADMIN_PROJECT_ID
        : 'reverse-job-board',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  cookie: {
    auth: 'rjb_auth_token'
  }
};
