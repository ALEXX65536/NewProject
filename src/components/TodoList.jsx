// Импорт компонента карточки задачи и текстовых констант
import TodoCard from "./TodoCard";
import { TEXTS } from "../constants/texts";
// Компонент списка задач
const TodoList = ({ todos, onClick }) => {
  // Если задач нет — выводим сообщение
  if (!todos?.length) {
    return <p>{TEXTS.noTasks}</p>;
  }
   // Список карточек задач
  return (
    <div className="row row-cols-1 g-3 todos-list">
      {todos.map((todo, index) => (
        <div key={todo?.id || TEXTS.todoKey(index)} className="col">
          <TodoCard todo={todo} onClick={onClick} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;