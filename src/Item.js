import React from 'react';
import {ArrowLeftDropCircle, ArrowRightDropCircle, CloseCircleOutline} from "mdi-material-ui";

import "./item.css";

const Item = ({isAdmin, item, setItem, delTask, delPerson}) => {

  const getClass = (type) => {
    return type === 1
      ? "task work"
      : type === 2
      ? "task test"
      : type === 3
        ? "task done"
        : "task"
  };

  const setType = (id, type) => {
    const newItemTasks = item.tasks.map(task => {
      if (task.id === id) {
        return {...task, type}
      } else {
        return {...task}
      }
    });
    setItem({...item, tasks:newItemTasks});
  };

  return (
    <div className="card">
      <span>
        {item.title}
        {isAdmin ?
          <CloseCircleOutline
            className="close"
            onClick={() => delPerson(item.id)}
          />
        : null}
      </span>
      <div className="content">
        <div className="head">
          <span>В работе</span>
          <span>Проверка</span>
          <span>Выполнено</span>
        </div>
        <div className="body">
          {item.tasks.map(task => (
            <div key={task.id} className={getClass(task.type)}>
            <span>
              {isAdmin ?
              <>
                {task.type !== 1
                  ?
                  <ArrowLeftDropCircle
                    className="left"
                    onClick={() => setType(task.id, task.type-1)}
                  />
                  : null}
              </>
                : <>
                  {task.type === 2
                    ?
                    <ArrowLeftDropCircle
                      className="left"
                      onClick={() => setType(task.id, task.type-1)}
                    />
                    : null}
                </>
              }
              {(task.type !== 1 && isAdmin)
                ?
                <ArrowLeftDropCircle
                  className="left"
                  onClick={() => setType(task.id, task.type-1)}
                />
                : null}
              {task.text}
              {isAdmin ?
                <>
                {
                  task.type !== 3
                    ?
                    <ArrowRightDropCircle
                      className="right"
                      onClick={() => setType(task.id, task.type + 1)}
                    />
                    :
                    <CloseCircleOutline
                      className="close"
                      onClick={() => delTask(task.id)}
                    />
                }
                </>
              : <>
                  {
                    task.type === 1
                      ?
                      <ArrowRightDropCircle
                        className="right"
                        onClick={() => setType(task.id, task.type + 1)}
                      />
                      : null
                  }
                </>}
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Item;