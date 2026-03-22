// Импорт текстовых констант
import { TEXTS } from "../constants/texts";
// Компонент карточки задачи
const TodoCard = ({ todo, onClick }) => {
   // Если нет данных – ничего не рендерим
  if (!todo) return null;
  // Деструктуризация данных задачи с значениями по умолчанию
  const { title = "", completed = false, userId = null } = todo;
  // Определение текста статуса задачи
  const statusText = completed ? TEXTS.statusDone : TEXTS.statusNotDone;
  // Обработчик клика по карточке
  const handleClick = () => onClick(todo);

  return (
    // Карточка задачи (с возможностью клика для открытия модального окна)
    <div
      className="card h-100 todo-card"
      role="button"
      onClick={handleClick}
    >
      <div className="card-body">
        <h3 className="card-title h6">{title || TEXTS.noTitle}</h3>
        <p className="card-text mb-1">
          <strong>{TEXTS.statusLabel}</strong>: {statusText}
        </p>
        <p className="card-text text-muted">{TEXTS.userId(userId)}</p>
      </div>
    </div>
  );
};

export default TodoCard;