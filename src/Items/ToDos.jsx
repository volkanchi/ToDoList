import { useState, useEffect } from "react";
import { Tooltip, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ToDoItem from "./ToDoItem";
import "./NewToDo.css";

const ToDos = ({ todos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    console.log("Todos:", todos); // todos içeriğini kontrol edin
    const filtered = todos.filter(
      (task) =>
        task.Durum === true || task.Durum === "TRUE" && // Durum boolean veya string "TRUE" ise
        task.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [todos, searchTerm]);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleTaskUpdate = (updatedTask) => {
    // Tamamlanan görevi listeden kaldır
    setFilteredTodos((prevTodos) =>
      prevTodos.filter((task) => task.row_id !== updatedTask.row_id)
    );
  };

  return (
    <div>
      <div className="search-container">
        <Tooltip title="Search">
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={toggleSearch}
          />
        </Tooltip>
        {isSearchVisible && (
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ marginLeft: "10px", width: "300px" }}
          />
        )}
      </div>
      {filteredTodos.length === 0 && <div>No tasks found.</div>}
      {filteredTodos.length > 0 && (
        <div>
          {filteredTodos.map((task, index) => (
            <ToDoItem
              key={index}
              task={task}
              title={task.Title}
              date={task.Date}
              description={task.Description}
              durum={task.Durum}
              onTaskUpdate={handleTaskUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToDos;
