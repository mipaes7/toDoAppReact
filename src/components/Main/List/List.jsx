import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './List.css';
import todoData from './data/todos.json';
import ToDoItem from "./ListItem";

function ToDoList() {

    const [todos, setTodos] = useState(todoData.todos);
    const [values, setValues] = useState({
        title: '',
        description: '',
        completed: false
    });

    const [formComponentVisible, setFormComponentVisible] = useState(false);

    const renderToDos = () => todos.map((item, i) => <ToDoItem
        key={uuidv4()}
        dataItem={item}
        itemIndex={i + 1}
        deleteListElement = {() => { deleteItem(i) }}
    />)

    const clearList = () => setTodos([]);

    const resetList = () => setTodos(todoData.todos);

    const deleteItem = (i) => {
        const remainingItems = todos.filter((item, index) => index !== i);
        setTodos(remainingItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;

        const newTask = { title, description };

        setTodos([newTask, ...todos]);
        setValues({title: '', description: '', completed: false});
        setFormComponentVisible(false);
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };

    const showFormComponent = (e) => {
        e.stopPropagation();
        setFormComponentVisible(true);
    };

    const hideFormComponent = () => {
        setFormComponentVisible(false);
    };

    return <section className="listContainer">
        <article>
            <div className="btnsContainer">
                <button onClick={showFormComponent}>Add Task</button>
                <button onClick={clearList}>Clear List</button>
                <button onClick={resetList}>Reset List</button>
            </div>
        </article>
        {
            formComponentVisible && 
        <article className="formContainer">
            <form onSubmit={handleSubmit} className="addTaskForm">
                <div>
                    <label htmlFor="title">Task</label>
                    <input type="text" name="title" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" onChange={handleChange} />
                </div>

                {
                    values.title && values.description ?
                        <button type="submit">ADD</button> :
                        <i>All fields must be filled</i>
                }

            </form>
            <button onClick={hideFormComponent}>Close</button>
        </article>
        }
        <article className="toDosContainer">
            <ul>
                {renderToDos()}
            </ul>
        </article>
    </section>
};

export default ToDoList;