import { createClient } from '@/prismicio';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Content } from '@prismicio/client';

export default async function BlogPage() {
  const client = createClient();

  const page = await client.getSingle('blog').catch(() => null);
  const posts = await client.getAllByType('post', {
    orderings: {
      field: 'my.post.published_date',
      direction: 'desc',
    },
  });

  if (!page) return notFound();

  const typedPage = page as Content.BlogDocument;

  return (
    <main className="page-style">
      <section>
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">{typedPage.data.title}</h1>
        </div>
      </section>

      <article>
        <div className="container space-y-8">
          {posts.map((post) => {
            const formattedDate = post.data.published_date
              ? new Date(post.data.published_date).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null;

            return (
              <div key={post.id} className="border-b pb-6">
                <Link
                  href={`/blog/${post.uid}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline"
                >
                  {post.data.title}
                </Link>

                {formattedDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Published on {formattedDate}
                  </p>
                )}

                {post.data.excerpt && (
                  <p className="mt-2 text-gray-700">{post.data.excerpt}</p>
                )}

                <Link
                  href={`/blog/${post.uid}`}
                  className="inline-block mt-2 text-sm text-blue-500 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
}