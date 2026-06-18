import { notFound } from "next/navigation";
import Link from "next/link";

// Импортируем все MDX-посты
const posts = {
  "hermes-kanban-orchestration": {
    title: "Как работает Kanban-оркестрация в Hermes Agent",
    date: "2026-05-28",
    slug: "hermes-kanban-orchestration",
  },
  "aiogram-bot-guide": {
    title: "Сборка Telegram-бота на Aiogram 3.x",
    date: "2026-05-15",
    slug: "aiogram-bot-guide",
  },
  "telegram-mini-apps": {
    title: "Telegram Mini Apps: от идеи до запуска",
    date: "2026-04-20",
    slug: "telegram-mini-apps",
  },
  "openrouter-llm-gateway": {
    title: "OpenRouter: универсальный шлюз для LLM",
    date: "2026-03-10",
    slug: "openrouter-llm-gateway",
  },
  "docker-compose-telegram-bots": {
    title: "Docker Compose для Telegram-ботов: best practices",
    date: "2026-02-05",
    slug: "docker-compose-telegram-bots",
  },
  "hermes-agent-setup": {
    title: "Hermes Agent: настройка своего AI-агента в терминале",
    date: "2026-01-15",
    slug: "hermes-agent-setup",
  },
} as const;

type PostKey = keyof typeof posts;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug as PostKey];

  if (!post) {
    notFound();
  }

  let MDXContent;
  try {
    MDXContent = (await import(`@/blog/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <Link
          href="/blog"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          &larr; Назад к блогу
        </Link>
        <time className="block text-sm text-zinc-500">{post.date}</time>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXContent />
      </div>
    </article>
  );
}
