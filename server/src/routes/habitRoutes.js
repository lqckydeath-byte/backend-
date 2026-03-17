const express = require('express');
const {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats
} = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', getAllHabits);
router.post('/', createHabit);
router.get('/:id', getHabitById);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
router.post('/:id/complete', completeHabit);
router.get('/:id/stats', getHabitStats);

module.exports = router;
