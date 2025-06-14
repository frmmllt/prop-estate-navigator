
import bcrypt from "bcryptjs";
import fs from "fs";

// In Lovable, "fs" will only work in local Node/mock env. Swap with fetch for browser!
export async function login(req: { body: { email: string; password: string } }, res: any) {
  // Load users from static file.
  let users;
  try {
    users = JSON.parse(fs.readFileSync("public/data/users.json", "utf-8"));
  } catch (e) {
    // fallback: hardcoded
    users = [
      {
        email: "admin@example.com",
        passwordHash: bcrypt.hashSync("password", 8),
        name: "Administrateur",
        role: "admin",
        sectionsAutorisees: [],
      },
      {
        email: "user@example.com",
        passwordHash: bcrypt.hashSync("password", 8),
        name: "Utilisateur",
        role: "user",
        sectionsAutorisees: ["A", "B"],
      },
    ];
  }

  const found = users.find((u: any) => u.email === req.body.email);
  if (!found) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const ok = await bcrypt.compare(req.body.password, found.passwordHash);
  if (!ok) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // Simulate JWT
  const fakeToken = btoa(
    JSON.stringify({
      email: found.email,
      role: found.role,
      name: found.name,
      iat: Date.now(),
    })
  );
  res.json({
    token: fakeToken,
    user: {
      email: found.email,
      name: found.name,
      role: found.role,
      sectionsAutorisees: found.sectionsAutorisees,
    },
  });
}
