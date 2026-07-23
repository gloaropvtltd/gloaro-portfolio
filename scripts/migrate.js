import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with: node --env-file=.env.local scripts/migrate.js");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(path.join(__dirname, "schema.sql"), "utf8");

const statements = schema
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
  console.log("Ran:", statement.split("\n")[0].slice(0, 60));
}

console.log("Migration complete.");
