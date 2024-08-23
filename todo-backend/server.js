const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require('./models/db');
const app = express();
const PORT = 3000;

const {getTodos, getOneTodo, postTodos, updateTodo, deleteTodo} = require('./controllers/todos.controller');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => getTodos(req, res, db)); 
app.get('/todos/:taskId', (req, res) => getOneTodo(req, res, db));
app.post("/todos", (req, res) => postTodos(req, res, db));
app.put('/todos/:taskId/editTask', (req, res) => updateTodo(req, res, db));
app.delete("/todos/:taskId/deleteTask", (req, res) => deleteTodo(req, res, db));

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
})