// Generates the two secrets the admin gate needs. Run locally; paste the
// output into Vercel's environment variables. Never commit the results.
//
//   node scripts/hash-password.mjs "your-password-here"
//
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}
if (password.length < 12) {
  console.error("Use at least 12 characters — this is the only lock on /admin.");
  process.exit(1);
}

const salt = randomBytes(16);
const key = scryptSync(password, salt, 64);

console.log("\nADMIN_PASSWORD_HASH=" + `scrypt:${salt.toString("hex")}:${key.toString("hex")}`);
console.log("AUTH_SECRET=" + randomBytes(32).toString("base64url"));
console.log("\nAdd both in Vercel -> Settings -> Environment Variables.");
console.log("The password itself is never stored anywhere.\n");
