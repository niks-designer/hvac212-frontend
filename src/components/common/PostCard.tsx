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
      className="rounded-lg border p-6 transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-2xl font-bold">
          {post.title.rendered}
        </h2>
      </Link>
      <p className="mb-4 text-sm">{date}</p>
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <Link
        href={`/posts/${post.slug}`}
        className="mt-4 inline-block font-semibold transition-colors"
      >
        Read More →
      </Link>
    </article>
  );
}
