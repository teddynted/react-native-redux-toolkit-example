import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'todos',
    initialState: {
        todos: null,
    },
    reducers: {
        addEditDeleteTodoSuccess: (state, action) => {
            state.todos = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { addEditDeleteTodoSuccess } = slice.actions
export const addEditDeleteTodo = (todos) => async dispatch => {
    try {
        dispatch(addEditDeleteTodoSuccess(todos));
    } catch (e) {
        return console.error(e.message);
    }
}