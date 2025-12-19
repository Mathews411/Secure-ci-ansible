if (!process.env.DB_PASSWORD || !process.env.API_KEY) {
  console.error("❌ Missing required secrets");
  process.exit(1);
}

console.log("✅ Secure Node app running");
