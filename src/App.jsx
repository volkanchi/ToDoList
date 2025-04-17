import { useEffect, useState } from "react";
import "./App.css";
import NewToDo from "./Items/NewToDo";
import ToDos from "./Items/ToDos";
function App() {
  const [todos, setTodos] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/volkanizzma/google_sheets/PxksuZrOVcbawrTb?tabId=Sayfa1"
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error fetching tasks:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Fetched data object:", responseData);

      if (responseData && Array.isArray(responseData.data)) {
        setTodos(responseData.data); // Görevler 'data' özelliği içinde
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch tasks. Please try again.");
      setTodos([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addToDo = (todo) => {
    setTodos((prevState) => {
      return [...prevState, todo];
    });
  };

  const deleteToDo = (todo) => {
    setTodos((prevState) => {
      return prevState.filter((item) => item.row_id !== todo.row_id);
    });
  };

  return (
    <div>
      <NewToDo onAddToDo={addToDo} todos={todos}></NewToDo>
      <ToDos todos={todos} onDelete={deleteToDo}></ToDos>
    </div>
  );
}

export default App;
