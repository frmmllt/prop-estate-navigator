
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const TEMPLATES_FILE = "public/data/templates.json";

export function getTemplates(req: any, res: any) {
  let templates;
  try {
    templates = JSON.parse(fs.readFileSync(TEMPLATES_FILE, "utf-8"));
  } catch {
    templates = [];
  }
  res.json(templates);
}

export function addTemplate(req: { body: any }, res: any) {
  // In real world, write to disk/db. Here, simulate.
  const newTempl = { ...req.body, id: uuidv4() };
  res.json(newTempl);
}
