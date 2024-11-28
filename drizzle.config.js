// "use server";
// const { config } = require("dotenv");

// // Load environment variables from the `.env.local` file
// config({ path: ".env.local" });

// module.exports = {
//   dialect: "postgresql",
//   schema: "./configs/schema.jsx",
//   out: "./migrations",
//   dbCredentials: {
//     url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
//   },
//   verbose: true,
//   strict: true,
// };

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./configs/schema.jsx",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
});
