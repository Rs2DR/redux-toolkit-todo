import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList({ removeTodo, toggleTodoComplete }) {
	const todos = useSelector(state => state.todos.todos);
	return (
		<ul>
			{todos.map((todo, index) => (
				<TodoItem
					key={index}
					todo={todo}
					removeTodo={removeTodo}
					toggleTodoComplete={toggleTodoComplete}
				/>
			))}
		</ul>
	);
}

export default TodoList;
