import { useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithCredential,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '246358053582-95e65gm2ti0chd85b9dmrs8dleiu63rn.apps.googleusercontent.com',
    androidClientId: '246358053582-95e65gm2ti0chd85b9dmrs8dleiu63rn.apps.googleusercontent.com',
    iosClientId: '1080386554290-cq3m5krr8cgutrkku7jq0nk90ij4ff37.apps.googleusercontent.com'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await firebaseSignInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return {
    user,
    signUpWithEmailAndPassword,
    loginWithEmailAndPassword,
    signOut,
    signInWithGoogle: () => promptAsync(),
  };
};
