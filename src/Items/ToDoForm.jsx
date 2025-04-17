import { useState } from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { DatePicker, Button } from "antd";
import "./ToDoForm.css";
import moment from "moment";

const ToDoForm = ({ onAddToDo, todos }) => {
  const [userInput, setUserInput] = useState({ title: "", date: null, description: "" });
  

  const titleChangeHandler = (e) => {
    setUserInput({ ...userInput, title: e.target.value });
  };

  const infoHandler = (e) => {
    setUserInput({ ...userInput, description: e.target.value });
  };

  const dateChangeHandler = (date, dateString) => {
    setUserInput({ ...userInput, date: date });
    console.log("Selected date:", dateString);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userInput.title.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (!userInput.date) {
      alert("Please select a date");
      return;
    }

    const formattedDate = userInput.date.format
      ? userInput.date.format("YYYY-MM-DD")
      : moment(userInput.date).format("YYYY-MM-DD");


    const maxRowId = todos.length > 0 ? Math.max(...todos.map((item) => item.row_id)) +1 : 2;
    const todoItem = {
      row_id: maxRowId,
      Title: userInput.title,
      Date: userInput.date,
      Description: userInput.description,
    };

    onAddToDo(todoItem);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = [[userInput.title.trim(), formattedDate, userInput.description]];

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/volkanizzma/google_sheets/PxksuZrOVcbawrTb?tabId=Sayfa1",
        requestOptions
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

  
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save to Google Sheets. Please try again.");
    }

    setUserInput({ title: "", date: null, description: "" }); // description sıfırlandı
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="todo-form">
        <div className="form-group">
          <label className="form-label">To Do</label>
          <input
            type="text"
            className="form-input"
            onChange={titleChangeHandler}
            value={userInput.title}
            placeholder="Enter your task"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-input"
            onChange={infoHandler}
            value={userInput.description} // description için value eklendi
            placeholder="Enter a description"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <DatePicker
            onChange={dateChangeHandler}
            value={userInput.date}
            placeholder="Select a date"
            style={{ width: "100%" }}
            className="form-input"
            inputReadOnly={true}
            format="YYYY-MM-DD"
          />
        </div>

        <Button
          type="primary"
          icon={<CheckCircleTwoTone />}
          htmlType="submit"
          className="form-button"
        >
          Add To Do
        </Button>
      </form>
    </div>
  );
};

export default ToDoForm;
