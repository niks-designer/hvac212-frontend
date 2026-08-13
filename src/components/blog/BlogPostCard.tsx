import Link from "next/link";

interface BlogPost {
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

export function BlogPostCard({ post }: { post: BlogPost }) {
    const date = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="space-y-6 overflow-hidden rounded-3xl bg-[#ececec] p-8 text-center lg:p-10 dark:bg-[#070F1D99]">
            <div className="font-19 italic">
                <span>{date}</span>
            </div>
            <h2 className="text-3xl leading-tight font-semibold">
                {post.title.rendered}
            </h2>
            <div
                className="font-19 line-clamp-3 leading-7"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link
                href={`/posts/${post.slug}`}
                className="theme-btn mt-3 w-48"
            >
                Read More
            </Link>
        </article>
    );
}
