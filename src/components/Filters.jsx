// Импорт React-хуков, debounce и текстовых констант
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { TEXTS } from "../constants/texts";

// Компонент фильтров (поиск + статус + сброс)
const Filters = ({ search, setSearch, status, setStatus, resetFilters }) => {
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const debouncedSetSearch = useMemo(
    () => debounce(setSearch, 400),
    [setSearch]
  );

  const handleInputChange = ({ target }) => {
    setInputValue(target.value);
    debouncedSetSearch(target.value);
  };

  return (
    <div className="filters mb-4 p-3 bg-white rounded shadow-sm">
      <div className="row g-2 align-items-end">
        <div className="col-12 col-md-5">
          <label className="form-label visually-hidden" htmlFor="todo-search">
            {TEXTS.searchPlaceholder}
          </label>
          <input
            id="todo-search"
            className="form-control"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={TEXTS.searchPlaceholder}
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label visually-hidden" htmlFor="todo-status">
            {TEXTS.statusLabel}
          </label>
          <select
            id="todo-status"
            className="form-select"
            value={status || ''}
            onChange={({ target }) => setStatus(target.value)}
          >
            {TEXTS.filterOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-3 d-grid">
          <button onClick={resetFilters} className="btn btn-outline-secondary">
            {TEXTS.resetFilters}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;