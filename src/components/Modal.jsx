// Компонент работает на клиенте
"use client";
// Импорт текстовых констант
import { TEXTS } from "../constants/texts";

// Компонент модального окна с деталями задачи
export default function Modal({ todo, users, onClose }) {
  // Если нет выбранной задачи – ничего не рендерим
  if (!todo) return null;
   // Деструктуризация данных задачи с значениями по умолчанию
  const { id = null, userId = null, completed = false, title = "" } = todo;
  // Поиск пользователя по userId и определение статуса задачи
  const user = users?.find(u => u?.id === userId) ?? null;
  const statusText = completed ? TEXTS.statusDone : TEXTS.statusNotDone;

  return (
    // Формирование оверлея и модального окна с деталями задачи и пользователя
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal show d-block" onClick={(e) => e.stopPropagation()}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{title || TEXTS.noTitle}</h2>
            </div>
            <div className="modal-body">
              <div className="card mb-3">
                <div className="card-body">
                  <p className="mb-2">
                    <strong>{TEXTS.statusLabel}</strong>: {statusText}
                  </p>
                  <p className="mb-2">{TEXTS.id(id)}</p>
                  <p className="mb-0">{TEXTS.userId(userId)}</p>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  {user ? (
                    <>
                      <p className="mb-2">{TEXTS.name(user.name || TEXTS.unknownUser)}</p>
                      <p className="mb-0">{TEXTS.email(user.email || TEXTS.noEmail)}</p>
                    </>
                  ) : (
                    <p className="mb-0">{TEXTS.userNotFound}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {TEXTS.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}