import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return;

  try {
    const decoded = jwtDecode<{ sub?: string }>(token);
    return decoded.sub;
  } catch {
    if (token.startsWith("local-")) {
      try {
        return atob(token.slice("local-".length)).split(":")[0];
      } catch {
        return token;
      }
    }

    return token;
  }
};
