import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import todos from './todos'

const reducer = combineReducers({
    todos
})

const store = configureStore({
    reducer,
})

export default store;