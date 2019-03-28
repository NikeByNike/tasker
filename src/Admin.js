import React, {useState} from 'react';
import {Face, PlaylistPlus} from "mdi-material-ui";

import "./item.css";


const Admin = ({setPerson, setTask, items}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [select, setSelect] = useState('');
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [patron, setPatron] = useState('');

  const addPerson = () => {
    const newPerson = {
      id: Date.now(),
      title: `${surName} ${name} ${patron}`.trim(),
      tasks: []
    };
    setPerson(newPerson);
    setName('');
    setSurName('');
    setPatron('');
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: taskTitle.trim(),
      type: 1
    };
    setTask(select, newTask);
    setSelect('');
    setTaskTitle('');
  };

  return (
    <div className="Admin">
      <div>
        <input onChange={e => setSurName(e.target.value)} value={surName} placeholder="Фамилия..." type="text"/>
        <input onChange={e => setName(e.target.value)} value={name} placeholder="Имя..." type="text"/>
        <input onChange={e => setPatron(e.target.value)} value={patron} placeholder="Отчество..." type="text"/>
        <button
          disabled={!(!!name || !!surName || !!patron)}
          onClick={() => addPerson()}
          children={<div>Добавить<Face/></div>}
        />
      </div>
      <div>
        <select placeholder="Работник..." value={select} onChange={e => setSelect(e.target.value)}>
          <option value="" disabled selected hidden>Работник...</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>
        <input onChange={e => setTaskTitle(e.target.value)} value={taskTitle} placeholder="Задача..." type="text"/>
        <button
          disabled={!(!!select && !!taskTitle)}
          onClick={() => addTask()}
          children={<div>Добавить<PlaylistPlus/></div>}
        />
      </div>
    </div>
  )
};

export default Admin;