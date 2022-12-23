import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { config } from './config';

if (getApps().length === 0) {
  initializeApp(
    process.env.NODE_ENV !== 'production'
      ? { projectId: 'reverse-job-board' }
      : {
          credential: cert({
            privateKey: config.privateKey,
            clientEmail: config.clientEmail,
            projectId: config.projectId
          })
        }
  );
} else {
  getApp();
}

export const firestoreAdmin = getFirestore();
export const authAdmin = getAuth();
