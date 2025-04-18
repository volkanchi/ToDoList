import { useState } from "react";
import { Tooltip, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ToDoItem from "./ToDoItem";
import "./NewToDo.css";

const ToDos = ({ todos, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredTodos = todos.filter((task) =>
    task.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
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
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToDos;
