import {
  initializeApp,
  cert,
  getApp,
  AppOptions,
  ServiceAccount,
  getApps
} from 'firebase-admin/app';
import { config } from '../config';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const credentials: ServiceAccount = {
  projectId: config.firebase.projectId,
  privateKey: config.firebase.privateKey,
  clientEmail: config.firebase.clientEmail
};

const options: AppOptions = {
  credential: cert(credentials),
  databaseURL: process.env.databaseURL
};

const createFirebaseAdminApp = (config: AppOptions) => {
  if (getApps().length === 0) {
    return initializeApp(config);
  } else {
    return getApp();
  }
};

const firebaseAdminApp = createFirebaseAdminApp(options);

export const firestore = getFirestore();
export const auth = getAuth();
