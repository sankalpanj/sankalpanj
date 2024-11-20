import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

console.log(process.env.TURSO_CONNECTION_URL);

export default defineConfig({
  schema: ["./src/db/schema.ts", "./src/db/member-schema.ts"],
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
