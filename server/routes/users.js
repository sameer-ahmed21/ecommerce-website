const express = require('express');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.patch('/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "role must be 'user' or 'admin'" });
    }
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You can't change your own role" });
    }

    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });

    if (target.role === 'admin' && role === 'user') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "Can't remove the last remaining admin" });
      }
    }

    target.role = role;
    await target.save();
    res.json({ user: target });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ message: 'User not found' });
    console.error(err);
    res.status(500).json({ message: 'Failed to update role' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You can't delete your own account" });
    }

    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });

    if (target.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: "Can't delete the last remaining admin" });
      }
    }

    await target.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ message: 'User not found' });
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
