import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "~/components/ui/input"
import { loginWithApple, loginWithGoogle } from "~/lib/auth-actions"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { auth } from "~/lib/firebase"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router"

function LoginScreen() {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn")
      if (!email) return

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {})
        .catch((err) => {})
    }
  }, [])

  useEffect(() => {
    if (!user) return

    navigate("/dashboard")
  }, [])

  return (
    <Card
      className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-[126%] mx-[0] border-transparent"
      style={{}}
    >
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold font-sans text-card-foreground">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-card-foreground/70 font-sans">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-card-foreground font-sans"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-white/40 bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-200"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
          >
            {"Sign In"}
          </Button>
        </form>

        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-card-foreground/60 font-sans">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => loginWithGoogle()}
            className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            onClick={() => loginWithApple()}
            className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Continue with Apple
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginScreen
