import React, { useState } from 'react';
import './ListItem.css'

const ToDoItem = ({
    dataItem: { title, description, completed },
    itemIndex,
    deleteListElement,
    handleCheckbox,
    handleEditItem
    //   showEdit,
    //   hideEdit
}) => {

    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [editValues, setEditValues] = useState({ title, description });

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditValues({
            ...editValues,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        handleEditItem(itemIndex - 1, editValues);
        setEditDialogVisible(false);
    };

    const showEditDialog = (e) => {
        e.stopPropagation();
        setEditValues({ title, description });
        setEditDialogVisible(true);
    };

    const hideEditDialog = (e) => {
        e.stopPropagation();
        setEditDialogVisible(false);
    };

    return <li className={completed ? 'completed' : ''}>
        {editDialogVisible ? (
        <form onSubmit={handleEditSubmit} className="editTaskForm">
            <div>
            <label htmlFor="title">Task Title</label>
            <input
                type="text"
                name="title"
                value={editValues.title}
                onChange={handleEdit}
            />
            </div>
            <div className='descriptionEditContainer'>
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                value={editValues.description}
                onChange={handleEdit}
            />
            </div>
            <button type="submit">Save</button>
            <button type='button' onClick={hideEditDialog}>Cancel</button>
        </form>
        ):(
        <>
        <h4 className='taskTitle'>{itemIndex}. {title}</h4>
        <p className='taskDesc'>{description}</p>
        <div className='checkboxContainer'>
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" name="completed" checked={completed} onChange={handleCheckbox} />
        </div>
        <article className='itemBtnContainer'>
            <button onClick={deleteListElement}>Delete</button>
            <button onClick={showEditDialog}>Edit</button>
        </article>
        </>
        )}
    </li>
};

export default ToDoItem;