import React, {useEffect, useState} from 'react';
import './App.css';
import Item from './Item';
import {initialState} from "./const";
import Admin from "./Admin";
import logo from "./logo.svg";

const App = () => {
  const [err, setErr] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [items, setItems] = useState(initialState);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (+token === 'admin password') {
      setAdmin(true);
    }
  }, []);

  const setItem = (id, newItem) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return {...newItem};
      }
      return item;
    });
    setItems(newItems);
  };

  const setPerson = (newPerson) => {
    let newItems = [...items];
    newItems.push(newPerson);
    setItems(newItems);
  };

  const setTask = (id, newTask) => {
    const newItems = items.map(item => {
      if (item.id === +id) {
        let newItem = {...item};
        newItem.tasks.push(newTask);
        return newItem;
      }
      return item;
    });
    setItems(newItems);
  };

  const delTask = (personId, id) => {
    const newItems = items.map(item => {
      if (item.id === personId) {
        return {
          ...item,
          tasks: item.tasks.filter(task => task.id !== id)
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const delPerson = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const handleLogin = () => {
    if (login === "admin" && password === "password") {
      localStorage.setItem('token', 'admin password');
      setAdmin(true)
    } else setErr(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAdmin(false)
  };

    return (
      <div className="App">
        <div className={err ? "header err" : "header"}>
          <div className="App-logo">
            <img src={logo} alt=""/>
          </div>
          {admin
            ?
            <>
            <button
              onClick={() => handleLogout()}
              children="Выйти"
            />
            <span>Admin</span>
            </>
            :
            <>
            <input
              onChange={e => {
              setErr(false);
              setLogin(e.target.value);
            }}
              value={login}
              placeholder="Логин..."
              type="text"
            />
            <input
              onChange={e => {
              setErr(false);
              setPassword(e.target.value);
          }} value={password}
              placeholder="Пароль..."
              type="text"
            />
            <button
              onClick={() => handleLogin()}
              children="Войти"
            />
            </>
            }
        </div>
        <header className="App-header">
          {admin
            ?
            <Admin
              items={items}
              setTask={(id, newTask) => setTask(id, newTask)}
              setPerson={(newPerson) => setPerson(newPerson)}
            />
            : null}
          {items.map(item => (
            <Item
              isAdmin={admin}
              key={item.id}
              item={item}
              delPerson={(id) => delPerson(id)}
              delTask={(id) => delTask(item.id, id)}
              setItem={(newItem) => setItem(item.id, newItem)}
            />
          ))}
        </header>
      </div>
    );
};

export default App;
