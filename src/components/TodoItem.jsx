function TodoItem({ todo, removeTodo, toggleTodoComplete }) {
	return (
		<li>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => toggleTodoComplete(todo.id)}
			/>
			<span>{todo.text}</span>
			<span
				style={{ color: 'red', cursor: 'pointer' }}
				onClick={() => removeTodo(todo.id)}
			>
				&times;
			</span>
		</li>
	);
}

export default TodoItem;
