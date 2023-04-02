import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()){
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  

  const editingTemplate = (
    <form className="editForm" onSubmit={handleSubmit}>
      <label htmlFor={props.id}>
        New name for {props.name}
      </label>  
      <input
        type="text"
        className='textInput'
        id={props.id}
        value={newName || props.name}
        onChange={handleChange}
        ref={editFieldRef}
      />
      <div className="groupBtn">
        <button 
        type="button"
        className='btn btn-danger' 
        onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>

        <button className='btn'>
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div> 
      
    </form>
  );

  const viewTemplate = (
    <div className='todo'>
      <div className='check'>
        <input 
          id={props.id} 
          type="checkbox" 
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
    </div>

    <div className='groupBtn'>
        <button 
        type="button" 
        className='btn' 
        onClick={() => setEditing(true)} 
        ref={editButtonRef}>
          Edit 
          <span className="visually-hidden">{props.name}</span>
        </button>

        <button type="button" className='btn btn-danger' onClick={() => props.deleteTask(props.id)}>
          Delete 
          <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li className='todo'>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
