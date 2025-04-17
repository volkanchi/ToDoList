
import ToDoItem from "./ToDoItem";
import "./NewToDo.css";

const ToDos = ({todos, onDelete}) => {
    

  return (
    <div>
      {todos.length === 0 && <div>No tasks found.</div>}
      {todos.length > 0 && (
        <div>
          {todos.map((task, index) => (
            <ToDoItem
              key={index}
              task={task}
              title={task.Title}
              date={task.Date}
              description={task.Description}
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToDos;
