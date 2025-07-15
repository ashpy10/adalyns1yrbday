import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // loads .env so process.env.DATABASE_URL is available

console.log("[DEBUG] process.env.DATABASE_URL:", process.env.DATABASE_URL);

const db = new pg.Client(process.env.DATABASE_URL);

db.connect()
  .then(() => {
    console.log("🟢 Connected to Postgres via DATABASE_URL");
    console.log("Database URL:", process.env.DATABASE_URL ? "Set" : "NOT SET");
  })
  .catch((err) => {
    console.error("🔴 Postgres connection error:", err);
    console.error("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "NOT SET");
  });

export default db;
