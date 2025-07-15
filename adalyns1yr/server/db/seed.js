import db from "./client.js";

async function seed() {
  try {
    console.log("🔄 Starting seed script...");

    // Debug: Check current database and tables
    const dbResult = await db.query("SELECT current_database() as db_name");
    console.log("[DEBUG] Connected to database:", dbResult.rows[0].db_name);
    
    const tablesResult = await db.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
    console.log("[DEBUG] Available tables:", tablesResult.rows.map(row => row.tablename));
    
    // Check specifically for birthdayrsvps table
    const birthdayrsvpsCheck = await db.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'birthdayrsvps') as exists");
    console.log("[DEBUG] birthdayrsvps table exists:", birthdayrsvpsCheck.rows[0].exists);

    // Clear existing data
    await db.query("DELETE FROM birthdayrsvps");

    // Insert test data
    await db.query("INSERT INTO birthdayrsvps (guest_name, is_attending, adult_count, child_count) VALUES " +
      "('John Doe', true, 2, 1), " +
      "('Jane Smith', false, 1, 0), " +
      "('Jim Beam', true, 3, 2)");

    console.log("✅ Test data inserted successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await db.end();
  }
}

seed();