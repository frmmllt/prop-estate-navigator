
import fs from "fs";

const USERS_FILE = "public/data/users.json";

export function getUsers(req: any, res: any) {
  let users;
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    users = [];
  }
  res.json(users);
}

export function updateUser(req: { params: { email: string }, body: any }, res: any) {
  // In production, update user in DB. Here, just mock.
  let users;
  try {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    users = [];
  }
  const idx = users.findIndex((u: any) => u.email === req.params.email);
  if (idx === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  users[idx] = { ...users[idx], ...req.body };
  // In mock, just return user (do NOT write to disk)
  res.json(users[idx]);
}
