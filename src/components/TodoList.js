import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm';
import {RiCloseCircleLine} from "react-icons/ri"

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        var todosFromLS = localStorage.getItem("todos");
        if (todosFromLS) {
            todosFromLS = todosFromLS.split("<seg>");
            var newTodos = [];
            for (var i = 0; i < todosFromLS.length; i++){
                newTodos.push(JSON.parse(todosFromLS[i]))
            }
            setTodos(newTodos);
        }
    },[])

    // a callback function let child component sends todo back to parent
    const clickedAddTodo = (todo) => {
        // TODO: add a notification?
        // Validate the input todo
        if(!todo.text || /^\s*$/.test(todo.text)) return
        
        const newTodos = [todo, ...todos]
        setTodos(newTodos);
        setToLocalStorage(newTodos)
    };

    const removeTodo = (date)=>{
        const updatedTodos = [...todos].filter(todo => todo.date!==date);

        setTodos(updatedTodos);
        setToLocalStorage(updatedTodos)
    };

    const setToLocalStorage = (todos)=>{
        localStorage.clear()
        if (todos.length !== 0){

            var todosString = ""
            todos.map((todo, index)=>{
                (index === 0) ? todosString = JSON.stringify(todo) : todosString += "<seg>" + JSON.stringify(todo)
            })
            localStorage.setItem("todos", todosString)
        }
    }

    const renderTodoList = () =>{
        if (todos.length === 0) return

        return todos.map((todo, index)=>{
            return (
                <div key={index} className="todo-row">
                    <div className="todo-item">
                        {todo.text} 
                    </div>
                    <div className="todo-remove" onClick={()=>removeTodo(todo.date)}> <RiCloseCircleLine /></div>
                </div>
            )
        })
    }

    return (
        <div className="todo-main">
            <div className="todo-title">
                <h1>Todo List</h1>
            </div>
            <TodoForm clickedAddTodo={clickedAddTodo}/>
            {renderTodoList()}
        </div>
    )
}

export default TodoList
