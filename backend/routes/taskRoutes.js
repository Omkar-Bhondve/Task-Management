const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

// All routes are protected
router.use(authMiddleware);

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get("/", getTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get("/:id", getTaskById);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post(
  "/",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 255 })
      .withMessage("Title must not exceed 255 characters"),
    body("description").optional().trim(),
  ],
  createTask,
);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put(
  "/:id",
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 255 })
      .withMessage("Title must not exceed 255 characters"),
    body("description").optional().trim(),
    body("completed")
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
  updateTask,
);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", deleteTask);

// @route   PATCH /api/tasks/:id/toggle
// @desc    Toggle task completion status
// @access  Private
router.patch("/:id/toggle", toggleTaskCompletion);

module.exports = router;
