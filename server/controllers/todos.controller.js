// Get all Todos
function getTodos(req, res, db) {
	db.select("*")
		.from("todos")
		.then((todo) => {
			res.status(200).json(todo);
		})
		.catch((error) => {
			res.status(500).json({ error: "Internal Server Error" });
		});
}

// Get one Todo task
function getOneTodo(req, res, db) {
	const id = Number(req.params.taskId);

	db.select("*")
		.from("todos")
		.where({ id: id })
		.then((todo) => {
			if (todo.length === 0) {
				res.status(404).json({ error: "todo not found" });
			} else {
				res.status(200).json(todo);
			}
		})
		.catch((error) => {
			res.status(500).json({ error: "Internal Server Error" });
		});
}

// post todos
function postTodos(req, res, db) {
	const { id, title, todo } = req.body;

	if (title || !todo) {
		return res.status(400).json({ error: "Title & Todo are required" });
	}
	db("todos")
		.returning("*")
		.insert({ id: id, title: title, todo: todo })
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((error) => {
			res.status(500).json({ error: "Internal Server Error" });
		});
}

// update todo
function updateTodo(req, res, db) {
	const id = Number(req.params.taskId);
	const { title, todo } = req.body;
	db("todos")
		.where({ id: id })
		.update({ title: title, todo: todo })
		.then((response) => {
			if (response === 0) {
				res.status(404).json({ error: "Todo not found" });
			} else {
				res.status(201).json(response);
			}
		})
		.catch((error) => {
			res.status(500).json({ error: "Internal Server Error" });
		});
}

// delete todo
function deleteTodo(req, res, db) {
	const id = Number(req.params.taskId);
	db("todos")
		.where({ id })
		.del()
		.then((response) => {
			if (response === 0) {
				res.status(404).json({ error: "Todo not found" });
			} else {
				res.status(200).json(response);
			}
		})
		.catch((error) => {
			res.status(500).json({ error: "Internal Server Error" });
		});
}

module.exports = {
	getTodos,
	getOneTodo,
	postTodos,
	updateTodo,
	deleteTodo,
};
