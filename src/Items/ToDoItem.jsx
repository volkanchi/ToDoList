import { Popover, Button } from "antd";
import { CheckCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import ToDoDate from "./ToDoDate";
import "./ToDoItem.css";
import moment from "moment";

const ToDoItem = ({ task, title, date, description, onTaskUpdate, durum }) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");

  const completeHandler = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = {
      row_id: task.row_id,
      Title: task.title,
      Date: task.date,
      Description: task.description,
      Durum: false,
    };

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    try {
      console.log("Sending PATCH request with row_id:", task.row_id);
      const response = await fetch(
        `https://v1.nocodeapi.com/chelebi/google_sheets/GyGHDytbieNlsNnz?tabId=Sayfa1&row_id=${task.row_id}`,
        requestOptions
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Task updated successfully:", task.row_id);
      onTaskUpdate(task);
    } catch (error) {
      console.error("Tamamlama hatası:", error);
      alert("Görev tamamlanırken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="todo-item">
      <ToDoDate date={formattedDate} />
      <div className="todo-item-content">
        <div className="todo-item-title">{title}</div>
        <Button
          icon={<CheckCircleTwoTone />}
          onClick={completeHandler}
          className="todo-item-button"
          disabled={!durum} // Eğer durum false ise buton devre dışı bırakılır
        >
          Tamamlandı
        </Button>
      </div>
      <div className="todo-item-description">
        <Popover content={description} trigger="click">
          <Button icon={<InfoCircleOutlined />} />
        </Popover>
      </div>
    </div>
  );
};

export default ToDoItem;
