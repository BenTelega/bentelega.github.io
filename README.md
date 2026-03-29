# bentelega.github.io

Личный сайт-портфолио разработчика

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://bentelega.github.io/portfolio.html)

## О проекте

Современное портфолио для демонстрации навыков и проектов разработчика bentelega. Сайт включает информацию о навыках, опыте работы и контактных данных.

## Демонстрация

![Скриншот портфолио](static/images/portfolio-screenshot.png)
*Пример визуального дизайна портфолио*

Посмотреть живую версию: [bentelega.github.io/portfolio.html](https://bentelega.github.io/portfolio.html)

## Технологии

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Шрифты**: Inter, JetBrains Mono (Google Fonts)
- **Хостинг**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Дизайн**: Темная тема с градиентными акцентами

## Начало работы

### Локальный запуск
```bash
# Клонировать репозиторий
git clone https://github.com/bentelega/bentelega.github.io.git
cd bentelega.github.io

# Запустить локальный сервер
python3 -m http.server 8080

# Открыть в браузере
open http://localhost:8080/portfolio.html
```

### Деплой
```bash
# Быстрый деплой через скрипт
./deploy.sh

# Или вручную
git add .
git commit -m "описание изменений"
git push
```

## Структура проекта

```
bentelega.github.io/
├── index.html              # Заглушка/главная страница
├── portfolio.html          # Основная страница портфолио
├── static/
│   ├── css/
│   │   └── portfolio.css   # Стили (896 строк)
│   └── js/
│       └── portfolio.js    # Интерактивность (260 строк)
├── deploy.sh               # Скрипт быстрого деплоя
└── CNAME                   # Домен: bentelega.github.io
```

## Возможности

- **Адаптивный дизайн**: Полная поддержка десктопов, планшетов и мобильных устройств
- **Интерактивная навигация**: Мобильное меню, плавная прокрутка, подсветка активных секций
- **Анимации**: Эффекты при скролле, анимация счётчиков, эффект печатной машинки
- **Темный режим**: Современная цветовая схема с градиентными акцентами
- **SEO оптимизация**: Семантическая разметка, мета-теги

## Что я узнал

- Практика создания современных одностраничных приложений без фреймворков
- Оптимизация производительности и загрузки
- Работа с Intersection Observer API для анимаций
- Создание адаптивных макетов с CSS Grid и Flexbox
- Организация кода и структуры проекта

## Планы на будущее

- [ ] Добавить секцию с реальными проектами
- [ ] Интегрировать блог или новостную ленту
- [ ] Добавить форму обратной связи
- [ ] Реализовать светлую тему
- [ ] Добавить поддержку нескольких языков

## Лицензия

MIT License - свободное использование и модификация. См. [LICENSE](LICENSE) для подробностей.

## Контакты

- Email: contact@bentelega.github.io
- Telegram: [@bentelega](https://t.me/bentelega)
- GitHub: [bentelega](https://github.com/bentelega)

---
