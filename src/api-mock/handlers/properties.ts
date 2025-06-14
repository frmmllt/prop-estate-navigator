
import fs from "fs";

const PROP_FILE = "public/data/properties.json";

export function getProperties(req: { query?: any; user?: any }, res: any) {
  let props;
  try {
    props = JSON.parse(fs.readFileSync(PROP_FILE, "utf-8"));
  } catch {
    props = [];
  }
  // Simulate filtering by section if user/role provided
  if (req.user && req.user.role !== "admin") {
    const allowed = req.user.sectionsAutorisees ?? [];
    props = props.filter(
      (p: any) => allowed.length === 0 || allowed.includes(p.section)
    );
  }
  res.json(props);
}

export function getPropertyById(req: { params: { id: string } }, res: any) {
  let props;
  try {
    props = JSON.parse(fs.readFileSync(PROP_FILE, "utf-8"));
  } catch {
    props = [];
  }
  const property = props.find((p: any) => p.id === req.params.id);
  if (!property) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(property);
}
