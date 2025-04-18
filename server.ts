// server.ts
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

// Типизация данных
interface DataItem {
  id: string;
  [key: string]: unknown;
}

type Database = Record<string, DataItem[]>;

// Класс для работы с базой данных
class JSONDatabase {
  private filePath: string;
  private data: Database = {};

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async load(): Promise<void> {
    try {
      const fileContent = await Deno.readTextFile(this.filePath);
      this.data = JSON.parse(fileContent);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        this.data = {};
        await this.save();
      } else {
        throw err;
      }
    }
  }

  async save(): Promise<void> {
    await Deno.writeTextFile(this.filePath, JSON.stringify(this.data, null, 2));
  }

  getAll(collection: string): DataItem[] {
    return this.data[collection] || [];
  }

  getById(collection: string, id: string): DataItem | undefined {
    return this.getAll(collection).find(item => item.id === id);
  }

  async create(collection: string, item: Omit<DataItem, "id">): Promise<DataItem> {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }

    const newItem = { ...item, id: crypto.randomUUID() };
    this.data[collection].push(newItem);
    await this.save();
    return newItem;
  }

  async update(collection: string, id: string, updates: Partial<DataItem>): Promise<DataItem | null> {
    const items = this.getAll(collection);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return null;

    const updatedItem = { ...items[index], ...updates };
    this.data[collection][index] = updatedItem;
    await this.save();
    return updatedItem;
  }

  async delete(collection: string, id: string): Promise<boolean> {
    const items = this.getAll(collection);
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return false;

    this.data[collection].splice(index, 1);
    await this.save();
    return true;
  }
}

// Инициализация базы данных
const db = new JSONDatabase("db.json");
await db.load();

// Создание роутера
const router = new Router();

// Middleware для обработки JSON
router.use(async (ctx, next) => {
  if (ctx.request.hasBody) {
    try {
      const body = await ctx.request.body().value;
      ctx.state.body = body;
    } catch {
      ctx.throw(400, "Invalid JSON");
    }
  }
  await next();
});

// HTML шаблон для корневой страницы
const homePage = (endpoints: string[]) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON API Server</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 {
      color: #2c3e50;
    }
    .endpoint {
      background: #f4f4f4;
      padding: 15px;
      margin: 10px 0;
      border-radius: 5px;
    }
    code {
      background: #eee;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .method {
      display: inline-block;
      width: 80px;
      font-weight: bold;
    }
    .get { color: #2ecc71; }
    .post { color: #3498db; }
    .put { color: #f39c12; }
    .delete { color: #e74c3c; }
  </style>
</head>
<body>
  <h1>Welcome to JSON API Server</h1>
  <p>This is a simple REST API server using Deno and Oak with JSON file storage.</p>
  
  <h2>Available Collections:</h2>
  <ul>
    ${endpoints.map(e => `<li><code>${e}</code></li>`).join("")}
  </ul>
  
  <h2>API Endpoints:</h2>
  <div class="endpoint">
    <span class="method get">GET</span> <code>/collection</code> - Get all items in collection
  </div>
  <div class="endpoint">
    <span class="method get">GET</span> <code>/collection/:id</code> - Get single item by ID
  </div>
  <div class="endpoint">
    <span class="method post">POST</span> <code>/collection</code> - Create new item
  </div>
  <div class="endpoint">
    <span class="method put">PUT</span> <code>/collection/:id</code> - Update existing item
  </div>
  <div class="endpoint">
    <span class="method delete">DELETE</span> <code>/collection/:id</code> - Delete item
  </div>
  
  <h2>Try it out:</h2>
  <p>Use tools like <a href="https://www.postman.com/" target="_blank">Postman</a> or <code>curl</code> to interact with the API.</p>
</body>
</html>
`;

// Роуты API
router
  .get("/", (ctx) => {
    const collections = Object.keys(db.getAll(""));
    ctx.response.type = "text/html";
    ctx.response.body = homePage(collections);
  })
  .get("/:collection", (ctx) => {
    const items = db.getAll(ctx.params.collection);
    ctx.response.body = items;
  })
  .get("/:collection/:id", (ctx) => {
    const item = db.getById(ctx.params.collection, ctx.params.id);
    if (!item) ctx.throw(404, "Not found");
    ctx.response.body = item;
  })
  .post("/:collection", async (ctx) => {
    const newItem = await db.create(ctx.params.collection, ctx.state.body);
    ctx.response.status = 201;
    ctx.response.body = newItem;
  })
  .put("/:collection/:id", async (ctx) => {
    const updated = await db.update(
      ctx.params.collection,
      ctx.params.id,
      ctx.state.body
    );
    if (!updated) ctx.throw(404, "Not found");
    ctx.response.body = updated;
  })
  .delete("/:collection/:id", async (ctx) => {
    const success = await db.delete(ctx.params.collection, ctx.params.id);
    if (!success) ctx.throw(404, "Not found");
    ctx.response.status = 204;
  });

// Настройка приложения
const app = new Application();

// Логирование
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url.pathname} - ${rt}`);
});

// Замер времени выполнения
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Обработка CORS
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  await next();
});

// Подключение роутера
app.use(router.routes());
app.use(router.allowedMethods());

// Запуск сервера
const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
