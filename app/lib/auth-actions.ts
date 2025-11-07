import { signInWithPopup, signInWithEmailLink } from "firebase/auth"
import { auth, googleProvider, appleProvider, setupRecaptcha } from "./firebase"

// Google
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider)

// Apple
export const loginWithApple = () => signInWithPopup(auth, appleProvider)

export const sendOtp = async (email: string) => {
  signInWithEmailLink(auth, email, window.location.href)
}
