const body = document.body;

fetch("http://localhost:3000/allTodos")
	.then((res) => res.json())
	.then((data) => {
		console.log(data[0]);
		for (let i = 0; i < data.length; i++) {
			const todos = document.createElement("p");
			body.appendChild(todos);
			todos.textContent = data[i].title + "-----" + data[i].todo;
		}
	});
