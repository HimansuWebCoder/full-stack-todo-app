const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./models/db");
const app = express();
const PORT = 3000;

const {
	getTodos,
	getOneTodo,
	postTodos,
	updateTodo,
	deleteTodo,
} = require("./controllers/todos.controller");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(
	"/script",
	express.static(path.join(__dirname, "../todo-frontend/script")),
);
app.use(
	"/styles",
	express.static(path.join(__dirname, "../todo-frontend/styles")),
);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../todo-frontend/index.html"));
});

app.get("/create", (req, res) => {
	res.sendFile(path.join(__dirname, "../todo-frontend/create.html"));
});

app.get("/todos/:taskId/deleteTask", (req, res) => {
	res.sendFile(path.join(__dirname, "../todo-frontend/todos.html"));
});

app.get("/allTodos", (req, res) => getTodos(req, res, db));
app.get("/todos/:taskId", (req, res) => getOneTodo(req, res, db));
app.post("/todos", (req, res) => postTodos(req, res, db));
app.put("/todos/:taskId/editTask", (req, res) => updateTodo(req, res, db));
app.delete("/todos/:taskId/deleteTask", (req, res) => deleteTodo(req, res, db));

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
