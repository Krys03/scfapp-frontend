import { useAuthContext } from "./AuthProvider";

export function useAuth() {
  const ctx = useAuthContext();
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
