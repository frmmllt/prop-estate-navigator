
import bcrypt from "bcryptjs";

type Role = "admin" | "user";

interface DemoUser {
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
  sectionsAutorisees?: string[];
}

// For demo: store plain passwords here, hash at runtime for UX simplicity
const demoUsersData = [
  {
    email: "admin@example.com",
    password: "password",
    name: "Administrateur",
    role: "admin",
    sectionsAutorisees: [],
  },
  {
    email: "user@example.com",
    password: "password",
    name: "Utilisateur",
    role: "user",
    sectionsAutorisees: ["A", "B"],
  },
];

const users: DemoUser[] = demoUsersData.map((u) => ({
  ...u,
  passwordHash: bcrypt.hashSync(u.password, 8),
}));

/**
 * Simulates an async login API. Verifies email & password, "issues" a fake JWT.
 */
export async function mockLogin(email: string, password: string) {
  // Simulate server processing
  await new Promise((resolve) => setTimeout(resolve, 650));
  
  const foundUser = users.find((u) => u.email === email);
  
  if (!foundUser) return { success: false, error: "Invalid credentials" };
  
  const isPasswordValid = await bcrypt.compare(password, foundUser.passwordHash);
  if (!isPasswordValid) return { success: false, error: "Invalid credentials" };
  
  // Simulate issuing a token (this is only a simple fake, not real JWT)
  const fakeToken = btoa(
    JSON.stringify({
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
      iat: Date.now(),
    })
  );

  // Only include safe public user info, no password hashes!
  const userPayload = {
    email: foundUser.email,
    name: foundUser.name,
    role: foundUser.role,
    sectionsAutorisees: foundUser.sectionsAutorisees,
  };

  return { success: true, token: fakeToken, user: userPayload };
}

/**
 * Simulates validating a token with a backend (parsing, not verifying).
 */
export function mockValidateToken(token: string) {
  try {
    // This is ONLY for mock/demo purposes! Not real verification.
    const raw = atob(token);
    const payload = JSON.parse(raw);
    if (payload && payload.email) return payload;
    return null;
  } catch {
    return null;
  }
}

