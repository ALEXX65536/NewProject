// Импорт функций для тестирования компонентов React
import { render, screen } from "@testing-library/react";
import Home from "../app/page.jsx";
// Мокаем хук useTodos
jest.mock("../hooks/useTodos", () => ({
  useTodos: jest.fn(),
}));
// Мокаем дочерние компоненты для упрощения теста
jest.mock("../components/Filters", () => () => <div data-testid="filters-mock" />);
jest.mock("../components/TodoList", () => () => <div data-testid="todo-list-mock" />);
jest.mock("../components/Modal", () => () => null);
jest.mock("../styles/globals.sass", () => ({}));
// Импорт констант и мокнутого хука
import { TEXTS } from "../constants/texts";
import { STATUS } from "../constants/status";
import { useTodos } from "../hooks/useTodos";
// Тесты для главного компонента Home
describe("Главный компонент Home", () => {
  it("Отображает заголовок и фильтры без ошибок", () => {
    useTodos.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      search: '',
      setSearch: jest.fn(),
      status: STATUS.ALL,
      setStatus: jest.fn(),
      selectedTodo: null,
      setSelectedTodo: jest.fn(),
      filteredTodos: [],
      resetFilters: jest.fn(),
    });
    // Рендер компонента
    render(<Home />);
    // Проверка основных элементов интерфейса
    expect(screen.getByText(TEXTS.title)).toBeInTheDocument();
    expect(screen.getByTestId("filters-mock")).toBeInTheDocument();
    expect(screen.getByText(TEXTS.found(0))).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText(TEXTS.loading)).not.toBeInTheDocument();
  });
});