// Импорт функций для тестирования компонентов React и необходимых констант
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/Filters";
import { TEXTS } from "../constants/texts";
import { STATUS } from "../constants/status";
// Мокаем debounce, чтобы он выполнялся синхронно (сам до этого не додумался, к сожалению)
jest.mock("lodash.debounce", () => jest.fn(fn => fn));
// Тесты для компонента Filters
describe("Компонент Filters", () => {
  // Мок-функции для свойств
  const mockSetSearch = jest.fn();
  const mockSetStatus = jest.fn();
  const mockResetFilters = jest.fn();
  // Свойства по умолчанию для тестов
  const defaultProps = {
    search: "",
    setSearch: mockSetSearch,
    status: STATUS.ALL,
    setStatus: mockSetStatus,
    resetFilters: mockResetFilters,
  };
  // Очистка моков перед каждым тестом
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Проверка отображения основных элементов интерфейса
  it("Отображает поле поиска, выпадающий список и кнопку сброса", () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByPlaceholderText(TEXTS.searchPlaceholder)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: TEXTS.resetFilters })).toBeInTheDocument();
  });
  // Проверка корректного отображения значения поиска из свойств
  it("Отображает значение поиска из свойств", () => {
    render(<Filters {...defaultProps} search="тест" />);
    const input = screen.getByPlaceholderText(TEXTS.searchPlaceholder);
    expect(input).toHaveValue("тест");
  });
  // Проверка обновления значения и вызова setSearch при изменении текста
  it("При изменении текста обновляет значение и вызывает setSearch", () => {
    render(<Filters {...defaultProps} />);
    const input = screen.getByPlaceholderText(TEXTS.searchPlaceholder);

    fireEvent.change(input, { target: { value: "новая задача" } });
    expect(input).toHaveValue("новая задача");
    expect(mockSetSearch).toHaveBeenCalledWith("новая задача");
  });
// Проверка вызова setStatus при выборе статуса
  it("При выборе статуса вызывает setStatus", () => {
    render(<Filters {...defaultProps} />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: STATUS.COMPLETED } });
    expect(mockSetStatus).toHaveBeenCalledWith(STATUS.COMPLETED);
  });
// Проверка вызова resetFilters при клике на кнопку сброса
  it("При клике на кнопку сброса вызывает resetFilters", () => {
    render(<Filters {...defaultProps} />);
    const button = screen.getByRole("button", { name: TEXTS.resetFilters });

    fireEvent.click(button);
    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });
// Проверка синхронизации поля ввода при изменении внешнего значения search 
  it("Синхронизирует поле ввода при изменении внешнего search", () => {
    const { rerender } = render(<Filters {...defaultProps} search="" />);
    const input = screen.getByPlaceholderText(TEXTS.searchPlaceholder);
    expect(input).toHaveValue("");

    rerender(<Filters {...defaultProps} search="новое значение" />);
    expect(input).toHaveValue("новое значение");
  });
// Проверка корректного отображения всех вариантов статуса
  it("Отображает все варианты статуса из TEXTS.filterOptions", () => {
    render(<Filters {...defaultProps} />);
    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");
    expect(options).toHaveLength(TEXTS.filterOptions.length);
    TEXTS.filterOptions.forEach((option, idx) => {
      expect(options[idx]).toHaveValue(option.value);
      expect(options[idx]).toHaveTextContent(option.label);
    });
  });
});