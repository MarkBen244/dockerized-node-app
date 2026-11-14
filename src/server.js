
const express = require("express");
const path = require("path");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the frontend
app.use(express.static(path.join(__dirname, "../public")));

// Application health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        message: "Application is running successfully"
    });
});

// Database health check
app.get("/db-health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "connected",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id ASC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Could not retrieve tasks"
        });
    }
});

// Create a task
app.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                error: "Task title is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title.trim()]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Could not create task"
        });
    }
});

// Update task completion status
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { completed } = req.body;

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                error: "Completed must be true or false"
            });
        }

        const result = await pool.query(
            "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
            [completed, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Could not update task"
        });
    }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Could not delete task"
        });
    }
});

// Start server only when this file is run directly
if (require.main === module) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
