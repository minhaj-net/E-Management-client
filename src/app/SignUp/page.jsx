"use client";
import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Image,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { creatUser, logIn } = useAuth();
  
  const router = useRouter();
  const params = useSearchParams();
  //  const redirect = params.get("redirect") 
   const redirect = params.get("redirect") || "/"; // fallback "/"

  const onSubmit = (data) => {
    console.log("Register:", data);
    logIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
         router.push(redirect); 
        console.log("after  sign in ", user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleGoogleLogin = () => {
    console.log("Google Login  amar sonar bangla ami tomai valobashi");
    creatUser()
      .then((res) => {
        const user = res.user;
         router.push(redirect); 
        console.log("after google sign in ", user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div className="relative w-full max-w-md" data-aos="zoom-in">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 animate-pulse">
              <Sparkles className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/70">Sign in to continue to E-Management</p>
          </div>

          <div className="space-y-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="group" data-aos="fade-up" data-aos-delay="100">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors"
                    size={20}
                  />
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="group" data-aos="fade-up" data-aos-delay="200">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div
                className="text-right"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <button className="text-sm text-purple-300 hover:text-purple-200 transition-colors">
                  Forgot Password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-lg"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Sign In
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            <div
              className="relative my-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/70">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div
            className="mt-6 text-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <p className="text-white/70">
              Don't have an account?{" "}
              <button className="text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(30px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-40px) translateX(-40px);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
