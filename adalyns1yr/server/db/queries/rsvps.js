import db from '../client.js';

// Get all RSVPs
export async function getAllRsvps() {
  const result = await db.query('SELECT * FROM birthdayrsvps ORDER BY created_at DESC');
  return result.rows;
}

// Get RSVP by ID
export async function getRsvpById(id) {
  const result = await db.query('SELECT * FROM birthdayrsvps WHERE id = $1', [id]);
  return result.rows[0];
}

// Add a new RSVP
export async function addRsvp({ guest_name, is_attending, adult_count, child_count }) {
  console.log('Starting database insert...');
  try {
    const result = await db.query(
      `INSERT INTO birthdayrsvps (guest_name, is_attending, adult_count, child_count)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [guest_name, is_attending, adult_count, child_count]
    );
    
    console.log('Database insert successful:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

// Update an RSVP
export async function updateRsvp(id, { guest_name, is_attending, adult_count, child_count }) {
  const result = await db.query(
    `UPDATE birthdayrsvps SET guest_name = $1, is_attending = $2, adult_count = $3, child_count = $4
     WHERE id = $5 RETURNING *`,
    [guest_name, is_attending, adult_count, child_count, id]
  );
  return result.rows[0];
}

// Delete an RSVP
export async function deleteRsvp(id) {
  const result = await db.query('DELETE FROM birthdayrsvps WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}
