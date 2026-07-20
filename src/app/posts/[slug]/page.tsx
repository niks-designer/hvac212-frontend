export const dynamic = "force-dynamic";

import { getPostBySlug, getPosts } from "@/lib/wordpress";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background)" }}>
      <header style={{ backgroundColor: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/" className="mb-4 inline-block font-semibold" style={{ color: "var(--color-blue)" }}>
            ← Back to Posts
          </Link>
          <h1 className="text-4xl font-bold" style={{ color: "var(--color-heading)" }}>
            {post.title.rendered}
          </h1>
          <p className="mt-2" style={{ color: "var(--color-muted)" }}>{date}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-lg p-8" style={{ backgroundColor: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
    </div>
  );
}
