import { auth, firestore } from '../firebase/client';
import { createContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { config } from '../config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

interface AuthContextInterface {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  register: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  reset: () => void;
}

export const AuthContext = createContext({} as AuthContextInterface);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        createUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          joinedAt: user.metadata.creationTime,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL
        });
        const token = await user.getIdToken();
        setCookie(config.cookie.token, token);
        setUser(user);
        setIsSuccess(true);
      } else {
        deleteCookie(config.cookie.token);
        setUser(null);
      }
    });

    return unsubscribe;
  }, [user]);

  const createUser = async (user: any) => {
    try {
      await setDoc(doc(firestore, 'users', user.uid), user);
    } catch (error) {
      if (error instanceof FirebaseError) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        signOut();
      }
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof FirebaseError) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(config.routes.home);
    } catch (error) {
      if (error instanceof FirebaseError) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await signOutUser(auth);
    } catch (error) {
      if (error instanceof FirebaseError) setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsError(false);
    setIsSuccess(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        isSuccess,
        register,
        signIn,
        signOut,
        reset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
