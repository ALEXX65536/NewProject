// Компонент/хук выполняется на клиенте
"use client";
// Импорт React-хуков и констант API, статусов и лимитов
import { useEffect, useState, useMemo } from "react";
import { API } from "../constants/api";
import { STATUS } from "../constants/status";
import { LIMITS } from "../constants/limits";
// Пользовательский хук для работы с задачами и пользователями
export const useTodos = () => {
  // Состояния для данных, загрузки и ошибок
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Состояния фильтров и выбранной задачи
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(STATUS.ALL);
  const [selectedTodo, setSelectedTodo] = useState(null);
  // Эффект загрузки данных при первом рендере
  useEffect(() => {
    const loadData = async () => {
      try {
        // Формируем URL для загрузки задач и пользователей
        const urls = [
          `${API.BASE_URL}${API.TODOS}`,
          `${API.BASE_URL}${API.USERS}`
        ];
        // Параллельная загрузка данных
        const [todosRes, usersRes] = await Promise.all(
          urls.map(url => 
            fetch(url).then(res => {
              // Проверка корректности ответа API
              if (!res.ok) {
                throw new Error(`${API.API_ERROR}: ${res.status}`);
              }
              return res.json();
            })
          )
        );
              // Проверка корректности ответа API
        if (!Array.isArray(todosRes) || !Array.isArray(usersRes)) {
          throw new Error(`${API.INVALID_API_RESPONSE}`);
        }
        // Сохраняем данные в состояние
        setTodos(todosRes);
        setUsers(usersRes);
        setError(null);
      } catch (e) {
        setError(e.message);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  // Мемоизированный список задач с фильтрацией, сортировкой и лимитом
  const filteredTodos = useMemo(() => (
    todos
      .filter(({ title = "" }) => title.toLowerCase().includes(search.toLowerCase()))
      .filter(({ completed = false }) => (
        status === STATUS.COMPLETED ? completed :
        status === STATUS.ACTIVE ? !completed :
        true
      ))
      .sort((a, b) => (a.title || "").localeCompare(b.title || ""))
      .slice(0, LIMITS.TODOS)
  ), [todos, search, status]);
  // Сброс фильтров к состоянию по умолчанию
  const resetFilters = () => {
    setSearch("");
    setStatus(STATUS.ALL);
  };
  // Возврат данных и функций для использования в компонентах
  return {
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
    resetFilters
  };
};