import { useDispatch } from 'react-redux';
import { deleteTodo, toggleStatus } from '../store/todoSlice';

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	return (
		<li>
			<input
				type='checkbox'
				checked={todo.completed}
				onChange={() => dispatch(toggleStatus(todo.id))}
			/>
			<span>{todo.title}</span>
			<span
				style={{ color: 'red', cursor: 'pointer' }}
				onClick={() => dispatch(deleteTodo(todo.id))}
			>
				&times;
			</span>
		</li>
	);
}

export default TodoItem;
