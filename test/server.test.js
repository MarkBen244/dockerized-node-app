
const request = require("supertest");

jest.mock("../src/db", () => ({
    query: jest.fn()
}));

const app = require("../src/server");
const pool = require("../src/db");

describe("Application Health Check", () => {
    test("GET /health should return a healthy status", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body).toEqual({
            status: "healthy",
            message: "Application is running successfully"
        });
    });
});

describe("Task Retrieval", () => {
    test("GET /tasks should return all tasks", async () => {
        const tasks = [
            { id: 1, title: "Learn Docker", completed: false },
            { id: 2, title: "Learn Jest", completed: true }
        ];

        pool.query.mockResolvedValueOnce({ rows: tasks });

        const response = await request(app).get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(tasks);
    });
});

describe("Task Creation", () => {
    test("POST /tasks should create a task successfully", async () => {
        const newTask = {
            id: 1,
            title: "Learn automated testing",
            completed: false
        };

        pool.query.mockResolvedValueOnce({ rows: [newTask] });

        const response = await request(app)
            .post("/tasks")
            .send({ title: "Learn automated testing" });

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(newTask);
    });

    test("POST /tasks should reject an empty title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({ title: "   " });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Task title is required");
    });

    test("POST /tasks should reject a missing title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Task title is required");
    });
});

describe("Task Updates", () => {
    test("PATCH /tasks/:id should update task completion status", async () => {
        const updatedTask = {
            id: 1,
            title: "Learn automated testing",
            completed: true
        };

        pool.query.mockResolvedValueOnce({ rows: [updatedTask] });

        const response = await request(app)
            .patch("/tasks/1")
            .send({ completed: true });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updatedTask);
    });

    test("PATCH /tasks/:id should reject an invalid completion value", async () => {
        const response = await request(app)
            .patch("/tasks/1")
            .send({ completed: "yes" });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Completed must be true or false");
    });
});

describe("Task Deletion", () => {
    test("DELETE /tasks/:id should delete a task successfully", async () => {
        const deletedTask = {
            id: 1,
            title: "Learn automated testing",
            completed: false
        };

        pool.query.mockResolvedValueOnce({ rows: [deletedTask] });

        const response = await request(app).delete("/tasks/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: "Task deleted successfully",
            task: deletedTask
        });
    });

    test("DELETE /tasks/:id should return 404 when task does not exist", async () => {
        pool.query.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).delete("/tasks/999");

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Task not found");
    });
});
