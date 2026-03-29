# bentelega.github.io

Личный сайт-портфолио разработчика

🎨 **Two Design Versions Available:**
- [V1 - Refined Minimalism](portfolio.html) - Professional, clean design
- [V2 - Cyberpunk Maximalism](portfolio-v2/index.html) - Bold, distinctive design

📁 **See [COMPARISON.md](COMPARISON.md) for detailed comparison**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://bentelega.github.io/portfolio.html)

## О проекте

Современное портфолио для демонстрации навыков и проектов разработчика bentelega. Сайт включает информацию о навыках, опыте работы и контактных данных.

## Демонстрация

### V1 - Refined Minimalism
![Скриншот портфолио V1](static/images/portfolio-screenshot.png)
*Профессиональный, чистый дизайн*

**Живая версия**: [bentelega.github.io/portfolio.html](https://bentelega.github.io/portfolio.html)

### V2 - Cyberpunk Maximalism
**Тестовая версия**: Откройте `test-v2.html` в браузере
*Смелый, запоминающийся дизайн с неоновыми эффектами*

**Полная версия**: [portfolio-v2/index.html](portfolio-v2/index.html)

## Технологии

### V1 (Original)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Шрифты**: Inter, JetBrains Mono (Google Fonts)
- **Хостинг**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Дизайн**: Темная тема с градиентными акцентами

### V2 (Cyberpunk)
- **Frontend**: HTML5, CSS3, Enhanced JavaScript
- **Шрифты**: Playfair Display, Space Grotesk (Google Fonts)
- **Эффекты**: Частицы, анимации, неоновое свечение
- **Анимации**: Продвинутые переходы и трансформации
- **Дизайн**: Киберпанк эстетика с динамическими элементами

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
├── portfolio.html          # Основная страница портфолио V1
├── portfolio-v2/           # Новая версия портфолио
│   ├── index.html          # Портфолио V2 (киберпанк)
│   ├── css/
│   │   └── styles.css      # Стили V2 (1200+ строк)
│   └── js/
│       └── script.js       # Интерактивность V2 (900+ строк)
├── static/
│   ├── css/
│   │   └── portfolio.css   # Стили V1 (896 строк)
│   └── js/
│       └── portfolio.js    # Интерактивность V1 (260 строк)
├── test-v2.html            # Тестовая страница V2
├── COMPARISON.md           # Сравнение версий
├── deploy.sh               # Скрипт быстрого деплоя
└── CNAME                   # Домен: bentelega.github.io
```

## Возможности

### V1 (Original)
- **Адаптивный дизайн**: Полная поддержка десктопов, планшетов и мобильных устройств
- **Интерактивная навигация**: Мобильное меню, плавная прокрутка, подсветка активных секций
- **Анимации**: Эффекты при скролле, анимация счётчиков, эффект печатной машинки
- **Темный режим**: Современная цветовая схема с градиентными акцентами
- **SEO оптимизация**: Семантическая разметка, мета-теги

### V2 (Cyberpunk) - Дополнительно
- **Продвинутые анимации**: Частицы, плавные переходы, эффекты свечения
- **Эффекты терминала**: Анимированный кодовый блок с градиентной полосой
- **Неоновые границы**: Динамические светящиеся эффекты при наведении
- **Пульсирующий аватар**: Анимированный круговой аватар
- **Параллакс прокрутка**: Улучшенные эффекты при навигации
- **Улучшенный JavaScript**: Оптимизированные анимации с requestAnimationFrame

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
