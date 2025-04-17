import "./ToDoDate.css";
import moment from "moment";
const ToDoDate = ({ date }) => {
  const parsedDate = moment.isMoment(date) ? date : moment(new Date(date));
  const month = parsedDate.format("MMMM");
  const day = parsedDate.format("DD");
  const year = parsedDate.format("YYYY");

  return (
    <div className="todo-date">
      <div className="todo-date-month">{month}</div>
      <div className="todo-date-year">{year}</div>
      <div className="todo-date-day">{day}</div>
    </div>
  );
};

export default ToDoDate;
