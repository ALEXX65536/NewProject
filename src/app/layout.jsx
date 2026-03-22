// Подключение глобальных стилей и зависимостей
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.sass";
import { TEXTS } from "../constants/texts";

// Главный layout всего приложения
export default function RootLayout({ children }) {
  return (
    // Базовая HTML-структура страницы
    <html lang="ru">
      <head>
          <meta charSet="UTF-8" />
          <title>{TEXTS.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="../favicon_newproject.png" type="image/x-icon"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}