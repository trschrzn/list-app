import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()){
            return;
        }
        props.addTask(name);
        setName("");
    }

    function handleChange(e) {
        setName(e.target.value);
    }
    
    return(
        <form onSubmit={handleSubmit}>    
          <input
            type="text"
            className='textInput'
            id="new-todo-input"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
            
          <button type="submit" id='addButton' className='addButton'>&#43;</button>
        </form>
    );
}
export default Form;