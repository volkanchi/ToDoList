import "./ToDoForm";
import ToDoForm from "./ToDoForm";
import "./NewToDo.css";

const NewToDo = ({onAddToDo, todos}) =>{
    return (
        <div className="new-todo-container">
            <ToDoForm onAddToDo={onAddToDo} todos={todos} ></ToDoForm>
        </div>
    )
}

export default NewToDo;