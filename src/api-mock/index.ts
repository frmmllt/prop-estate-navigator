
/**
 * Express-style mock API registry.
 * Import these handlers and wire them up with your API mocking library or local dev server!
 */

import * as auth from "./handlers/auth";
import * as users from "./handlers/users";
import * as properties from "./handlers/properties";
import * as templates from "./handlers/templates";

export const apiMockHandlers = {
  "POST /auth/login": auth.login,
  "GET /users": users.getUsers,
  "PUT /users/:email": users.updateUser,
  "GET /properties": properties.getProperties,
  "GET /properties/:id": properties.getPropertyById,
  "GET /templates": templates.getTemplates,
  "POST /templates": templates.addTemplate,
};

/**
 * Usage for future Express/MSW setup:
 * app.post("/auth/login", apiMockHandlers["POST /auth/login"]);
 * app.get("/properties", apiMockHandlers["GET /properties"]);
 * etc.
 *
 * All GET/PUT/POST endpoints expect Express-like (req, res) signatures.
 */
