import React from 'react';
import './ListItem.css'

const ToDoItem = ({
  dataItem: {title, description, completed},
  itemIndex,
  deleteListElement
}) => {
    return <li>
        <h4 className='taskTitle'>{itemIndex}. {title}</h4>
        <p className='taskDesc'>{description}</p>
        <div className='checkboxContainer'>
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" name="completed" checked={completed}/>
        </div>
        <article className='itemBtnContainer'>
        <button onClick={deleteListElement}>Delete</button>
        <button>Edit</button>
        </article>
    </li>
};

export default ToDoItem;