// Компонент выполняется на клиенте
"use client";
// Импорт хуков, компонентов и стилей
import { useTodos } from "../hooks/useTodos";
import Filters from "../components/Filters";
import TodoList from "../components/TodoList";
import Modal from "../components/Modal";
import { TEXTS } from "../constants/texts";
import "../styles/globals.sass";

// Главная страница приложения
const Home = () => {
  // Получение данных и логики из хука useTodos
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    status,
    setStatus,
    selectedTodo,
    setSelectedTodo,
    filteredTodos,
    resetFilters,
  } = useTodos();

  return (
    // Основной контейнер страницы
    <div className="container">
      <h1>{TEXTS.title}</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <Filters {...{ search, setSearch, status, setStatus, resetFilters }} />

      <p className="mb-3 text-secondary">{TEXTS.found(filteredTodos.length)}</p>

      {loading ? (
        <div className="d-flex align-items-center">
          <span className="me-2">{TEXTS.loading}</span>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{TEXTS.loading}</span>
          </div>
        </div>
      ) : (
        <TodoList todos={filteredTodos} onClick={setSelectedTodo} />
      )}

      {selectedTodo && (
        <Modal
          {...{ todo: selectedTodo, users }}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </div>
  );
};

export default Home;