const Habit = require('../models/Habit');

// @desc    Get all habits for logged-in user
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: habits.length,
      habits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habits',
      error: error.message
    });
  }
};

// @desc    Get a specific habit
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    // Check if habit belongs to user
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this habit'
      });
    }

    res.status(200).json({
      success: true,
      habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching habit',
      error: error.message
    });
  }
};

// @desc    Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { title, description, category, frequency } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const newHabit = new Habit({
      title,
      description,
      category,
      frequency,
      userId: req.user._id
    });

    await newHabit.save();

    res.status(201).json({
      success: true,
      message: 'Habit created successfully',
      habit: newHabit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating habit',
      error: error.message
    });
  }
};

// @desc    Update a habit
exports.updateHabit = async (req, res) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    // Check if habit belongs to user
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this habit'
      });
    }

    // Update habit
    const { title, description, category, frequency, isActive } = req.body;
    if (title) habit.title = title;
    if (description !== undefined) habit.description = description;
    if (category) habit.category = category;
    if (frequency) habit.frequency = frequency;
    if (isActive !== undefined) habit.isActive = isActive;

    await habit.save();

    res.status(200).json({
      success: true,
      message: 'Habit updated successfully',
      habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating habit',
      error: error.message
    });
  }
};

// @desc    Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    // Check if habit belongs to user
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this habit'
      });
    }

    await Habit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting habit',
      error: error.message
    });
  }
};

// @desc    Mark habit as completed for today
exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    // Check if habit belongs to user
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this habit'
      });
    }

    // Check if already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyCompleted = habit.completedDates.some(date => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });

    if (alreadyCompleted) {
      return res.status(400).json({
        success: false,
        message: 'Habit already completed today'
      });
    }

    // Add completion date
    habit.completedDates.push(new Date());
    
    // Update streak
    habit.currentStreak += 1;
    if (habit.currentStreak > habit.longestStreak) {
      habit.longestStreak = habit.currentStreak;
    }

    await habit.save();

    res.status(200).json({
      success: true,
      message: 'Habit marked as completed',
      habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing habit',
      error: error.message
    });
  }
};

// @desc    Get statistics for a habit
exports.getHabitStats = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }

    // Check if habit belongs to user
    if (habit.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this habit'
      });
    }

    const stats = {
      totalCompletions: habit.completedDates.length,
      currentStreak: habit.currentStreak,
      longestStreak: habit.longestStreak,
      completedDates: habit.completedDates
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
