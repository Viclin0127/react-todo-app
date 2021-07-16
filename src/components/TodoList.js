import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm';

function TodoList() {
    const [todos, setTodos] = useState([]);

    // a callback function let child component sends todo back to parent
    const clickedAddTodo = (todo) => {
        // TODO: add a notification?
        if(!todo.text || /^\s*$/.test(todo.text)) return
        
        const newTodos = [todo, ...todos]
        setTodos(newTodos);

    };

    const renderTodoList = ()=>{
        todos.map((todo, index)=>{
            return (
                <div key={index}>{todo.text}</div>
            )
        })
    }

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm clickedAddTodo={clickedAddTodo}/>
            {renderTodoList()}
        </div>
    )
}

export default TodoList
