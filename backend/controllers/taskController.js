const pool = require("../config/db");
const { validationResult } = require("express-validator");

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id],
    );

    res.status(200).json({
      success: true,
      count: tasks.rows.length,
      data: tasks.rows,
    });
  } catch (error) {
    console.error("Get tasks error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching tasks",
    });
  }
};

// Get single task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (task.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task.rows[0],
    });
  } catch (error) {
    console.error("Get task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching task",
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description } = req.body;

    const newTask = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, description || ""],
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask.rows[0],
    });
  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error creating task",
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Check if task exists and belongs to user
    const taskExists = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (taskExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, completed, id, req.user.id],
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask.rows[0],
    });
  } catch (error) {
    console.error("Update task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error updating task",
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to user
    const taskExists = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (taskExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [
      id,
      req.user.id,
    ]);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error deleting task",
    });
  }
};

// Toggle task completion status
const toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists and belongs to user
    const task = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (task.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await pool.query(
      "UPDATE tasks SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id],
    );

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask.rows[0],
    });
  } catch (error) {
    console.error("Toggle task error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error toggling task status",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};
