import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const res = await axios.get(
				'https://jsonplaceholder.typicode.com/todos?_limit=10'
			);

			return res.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
			dispatch(removeTodo({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const toggleStatus = createAsyncThunk(
	'todos/toggleStatus',
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find(todo => todo.id === id);

		try {
			await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					completed: !todo.completed,
				},
			});
			dispatch(toggleTodoComplete({ id }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async function (text, { rejectWithValue, dispatch }) {
		try {
			const todo = {
				title: text,
				userId: 1,
				completed: false,
			};

			const res = await axios.post(
				'https://jsonplaceholder.typicode.com/todos',
				{
					headers: {
						'Content-Type': 'application/json',
					},
					data: {
						todo,
					},
				}
			);
			dispatch(addTodo(res.data));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const setError = (state, action) => {
	state.status = 'failed';
	state.error = action.payload;
};

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload.data.todo);
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
		},
		toggleTodoComplete(state, action) {
			const toggledTodo = state.todos.find(
				todo => todo.id === action.payload.id
			);
			if (toggledTodo) {
				toggledTodo.completed = !toggledTodo.completed;
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodos.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, setError)
			.addCase(deleteTodo.rejected, setError)
			.addCase(toggleStatus.rejected, setError)
			.addCase(addNewTodo.rejected, setError);
	},
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
