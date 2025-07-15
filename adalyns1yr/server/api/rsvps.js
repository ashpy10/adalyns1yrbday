import express from 'express';
import { getAllRsvps, getRsvpById, addRsvp, updateRsvp, deleteRsvp } from '../db/queries/rsvps.js';

const router = express.Router();

// GET all RSVPs
router.get('/', async (req, res) => {
  try {
    const rsvps = await getAllRsvps();
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

// GET RSVP by ID
router.get('/:id', async (req, res) => {
  try {
    const rsvp = await getRsvpById(req.params.id);
    if (!rsvp) return res.status(404).json({ error: 'RSVP not found' });
    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch RSVP' });
  }
});

// POST create RSVP
router.post('/', async (req, res) => {
  try {
    const { guest_name, is_attending, adult_count, child_count } = req.body;
    if (!guest_name || typeof is_attending !== 'boolean') {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newRsvp = await addRsvp({ guest_name, is_attending, adult_count, child_count });
    res.status(201).json(newRsvp);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create RSVP' });
  }
});

// PUT update RSVP
router.put('/:id', async (req, res) => {
  try {
    const { guest_name, is_attending, adult_count, child_count } = req.body;
    const updated = await updateRsvp(req.params.id, { guest_name, is_attending, adult_count, child_count });
    if (!updated) return res.status(404).json({ error: 'RSVP not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update RSVP' });
  }
});

// DELETE RSVP
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteRsvp(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'RSVP not found' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete RSVP' });
  }
});

export default router;
