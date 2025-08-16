import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// clés de stockage
const K_ACCESS = "helvio.accessToken";
const K_REFRESH = "helvio.refreshToken";
const K_USER = "helvio.username";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem(K_ACCESS));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem(K_REFRESH));
  const [username, setUsername] = useState(() => localStorage.getItem(K_USER));

  const isAuthenticated = !!accessToken;

  function saveSession({ accessToken, refreshToken, username }) {
    if (accessToken) {
      localStorage.setItem(K_ACCESS, accessToken);
      setAccessToken(accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(K_REFRESH, refreshToken);
      setRefreshToken(refreshToken);
    }
    if (username) {
      localStorage.setItem(K_USER, username);
      setUsername(username);
    }
  }

  function clearSession() {
    localStorage.removeItem(K_ACCESS);
    localStorage.removeItem(K_REFRESH);
    localStorage.removeItem(K_USER);
    setAccessToken(null);
    setRefreshToken(null);
    setUsername(null);
  }

  async function login({ username, password }) {
    const res = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      // 401/403 etc.
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || "Unauthorized");
    }

    const data = await res.json(); // { accessToken, refreshToken }
    saveSession({ accessToken: data.accessToken, refreshToken: data.refreshToken, username });
    return true;
  }

  async function logout() {
    try {
      if (refreshToken) {
        await fetch("http://localhost:8081/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (_) {
      // on ignore les erreurs réseau pour le logout
    } finally {
      clearSession();
    }
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      accessToken,
      refreshToken,
      username,
      login,
      logout,
      saveSession,
      clearSession,
    }),
    [isAuthenticated, accessToken, refreshToken, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
