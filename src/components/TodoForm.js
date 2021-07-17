import React, {useState} from 'react'

function TodoForm(props) {
    const [input, setInput] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();     // remove automate refresh when clicking add button

        props.clickedAddTodo({
            date: new Date(),
            text: input
        })

        setInput("");
    }

    const inputChanged = (e) => {
        setInput(e.target.value)
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input className="todo-input" type="text" placeholder="Add a todo" name="text" value={input} onChange={inputChanged}/>
            <button className="todo-button">Add todo</button>
        </form>
    )
}

export default TodoForm

