import { Popover, Button } from "antd";
import { CheckCircleTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import ToDoDate from "./ToDoDate";
import "./ToDoItem.css";
import moment from "moment";

const ToDoItem = ({ task, title, date, description, onDelete}) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");

  const clickHandler = async (item) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      await fetch(
        `https://v1.nocodeapi.com/volkanizzma/google_sheets/PxksuZrOVcbawrTb?tabId=Sayfa1&row_id=${task.rowid}`,
        requestOptions
      );
      onDelete(item); // silme sonrası listeyi yenile
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const infoHandler = () => {

  };

  return (
    <div className="todo-item">
      <ToDoDate date={formattedDate} />
      <div className="todo-item-content">
        <div className="todo-item-title">{title}</div>
        <Button
          icon={<CheckCircleTwoTone />}
          onClick={()=>clickHandler(task)}
          className="todo-item-button"
        />
    </div>
    <div className="todo-item-description">
          <Popover content={description} trigger="click">
            <Button icon={<InfoCircleOutlined />} onClick={infoHandler} />
          </Popover>
      </div>
    </div>
  );
};

export default ToDoItem;
