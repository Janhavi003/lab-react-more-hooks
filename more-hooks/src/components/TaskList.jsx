import { useEffect, useReducer, useRef } from "react";
import "./TaskList.css"

const taskReducer = (state, action) => {
    switch(action.type){
        case "ADD_TASK":
            return [...state,{id: Date.now(), text: action.payload, hidden: false}]
        case "TOGGLE_TASK":
            return state.map ((task)=>(task.id === action.payload ? {...task , hidden: !task.hidden}:task))
        default:
            return state;
    }
}

const TaskList = () => {

    const [tasks, dispatch] = useReducer(taskReducer, [])
    const inputRef = useRef()

    useEffect(()=>{
        if (inputRef.current){
            inputRef.current.focus()
        }
    },[tasks]);

    const handleAddTask = (text) => dispatch({type:'ADD_TASK',payload:text});

    const handleToggleTask = (id) => {
        dispatch({type:"TOGGLE_TASK" , payload: id});
        inputRef.current.focus();
    }


    const handleBackToTop = () => {
        if (inputRef.current){
            inputRef.current.focus()
        }
    }
    return(
        <>
        <div className="container">
            <h2>Daily Tasks</h2>
        <div>
        <input type="text" placeholder="Enter your Task" ref={inputRef} onKeyDown={(e) => e.key === "Enter" && (handleAddTask(e.target.value),(e.target.value == ''))}/>
        </div>
        <ul>
            {tasks.map((task)=>(
                <li key={task.id}>
                    <span style = {{textDecoration: task.hidden ? 'line-through' : 'none'}}>{task.hidden ? 'task is hidden' : task.text}</span>
                    <button type='button' onClick={() => handleToggleTask(task.id)}>Toggle</button>
                </li>
            ))}
        </ul>
        <button className="back-to-top-button" onClick={handleBackToTop}>Back to Top</button>
        </div>
        </>
    )
}

export default TaskList