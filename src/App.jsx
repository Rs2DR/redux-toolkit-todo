import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

function App() {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

	const addTodo = () => {
		if (text.trim().length) {
			setTodos([
				...todos,
				{
					id: new Date().toISOString(),
					text,
					completed: false,
				},
			]);
		}
	};

	const removeTodo = todoId => {
		setTodos(todos.filter(todo => todo.id !== todoId));
	};

	const toggleTodoComplete = todoId => {
		setTodos(
			todos.map(todo => {
				if (todo.id !== todoId) return todo;

				return {
					...todo,
					completed: !todo.completed,
				};
			})
		);
	};

	return (
		<div className='App'>
			<InputField text={text} handleInput={setText} handleSubmit={addTodo} />
			<TodoList
				todos={todos}
				removeTodo={removeTodo}
				toggleTodoComplete={toggleTodoComplete}
			/>
		</div>
	);
}

export default App;
