"use client";


import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // current page path

  if (loading) return <p>Loading...</p>;

  // If not logged in → go to login with redirect url
  if (!user) {
    router.replace(`/login?redirect=${pathname}`);
    return null;
  }

  return children;
}
