
/**
 * Helper to decode base64 (JWT "payload").
 */
function decodeBase64(str: string) {
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch {
    return null;
  }
}

/**
 * Decode a (fake) JWT and extract its payload.
 */
export function decodeJWT(token: string): { [key: string]: any } | null {
  if (!token) return null;
  try {
    // For proper JWT: header.payload.signature -- this is a fake (payload only?) for demo
    // So fallback: treat token as base64 payload only
    // If you use a real JWT, use split('.') and atob the middle part
    const rawPayload =
      token.includes(".") && token.split(".").length >= 2
        ? token.split(".")[1]
        : token;
    const decoded = decodeBase64(rawPayload);
    return decoded ? JSON.parse(decoded) : null;
  } catch {
    return null;
  }
}

/**
 * Get user role from JWT token ("admin" or "user")
 */
export function getRoleFromJWT(token: string | null): string | null {
  if (!token) return null;
  const payload = decodeJWT(token);
  return payload?.role || null;
}
