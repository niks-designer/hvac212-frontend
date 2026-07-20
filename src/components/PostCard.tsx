import Link from "next/link";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
}

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="rounded-lg border p-6 transition-shadow"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
    >
      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-2xl font-bold" style={{ color: "var(--color-heading)" }}>
          {post.title.rendered}
        </h2>
      </Link>
      <p className="mb-4 text-sm" style={{ color: "var(--color-muted)" }}>{date}</p>
      <div
        className="line-clamp-3"
        style={{ color: "var(--color-subtle)" }}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <Link
        href={`/posts/${post.slug}`}
        className="mt-4 inline-block font-semibold transition-colors"
        style={{ color: "var(--color-blue)" }}
      >
        Read More →
      </Link>
    </article>
  );
}
