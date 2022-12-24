import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { config } from '../config';

getApps().length === 0
  ? process.env.NODE_ENV !== 'production'
    ? initializeApp({ projectId: config.firebase.projectId })
    : initializeApp({
        credential: cert({
          privateKey: config.firebase.privateKey,
          clientEmail: config.firebase.clientEmail,
          projectId: config.firebase.projectId
        })
      })
  : getApp();

export const firestore = getFirestore();
export const auth = getAuth();
