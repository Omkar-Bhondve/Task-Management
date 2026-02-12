import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../api/taskApi";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        toast.success("Task updated successfully!");
      } else {
        await createTask(formData);
        toast.success("Task created successfully!");
      }

      fetchTasks();
      closeModal();
    } catch (error) {
      const message = error.response?.data?.message || "Operation failed";
      toast.error(message);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskCompletion(taskId);
      toast.success("Task status updated!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        toast.success("Task deleted successfully!");
        fetchTasks();
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || "",
        completed: task.completed,
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      completed: false,
    });
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">
              Welcome back, <span className="username">{user?.username}</span>!
              👋
            </h1>
            <p className="dashboard-subtitle">Manage your tasks efficiently</p>
          </div>
          <button className="btn-add-task" onClick={() => openModal()}>
            <span className="btn-icon">+</span>
            Add New Task
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3 className="stat-value">{tasks.length}</h3>
              <p className="stat-label">Total Tasks</p>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3 className="stat-value">{pendingTasks}</h3>
              <p className="stat-label">Pending</p>
            </div>
          </div>
          <div className="stat-card stat-completed">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{completedTasks}</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>
        </div>

        <div className="tasks-section">
          <h2 className="section-title">Your Tasks</h2>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Create your first task to get started!</p>
              <button className="btn-create-first" onClick={() => openModal()}>
                Create Task
              </button>
            </div>
          ) : (
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${task.completed ? "completed" : ""}`}
                >
                  <div className="task-header">
                    <div className="task-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        id={`task-${task.id}`}
                      />
                      <label htmlFor={`task-${task.id}`}></label>
                    </div>
                    <h3 className="task-title">{task.title}</h3>
                  </div>

                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-footer">
                    <span className="task-date">
                      {new Date(task.created_at).toLocaleDateString()}
                    </span>
                    <div className="task-actions">
                      <button
                        className="btn-edit"
                        onClick={() => openModal(task)}
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(task.id)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
              <button className="btn-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter task description (optional)"
                  rows="4"
                />
              </div>

              {editingTask && (
                <div className="form-group-checkbox">
                  <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    checked={formData.completed}
                    onChange={(e) =>
                      setFormData({ ...formData, completed: e.target.checked })
                    }
                  />
                  <label htmlFor="completed">Mark as completed</label>
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
