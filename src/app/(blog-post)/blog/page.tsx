import { createClient } from '@/prismicio';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Content } from '@prismicio/client';

export default async function BlogPage() {
  const client = createClient();

  const page = await client.getSingle('blog').catch(() => null);
  const posts = await client.getAllByType('post', {
    orderings: {
      field: 'document.first_publication_date',
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
        <div className="container space-y-4">
          {posts.map((post) => (
            <div key={post.id}>
              <Link
                href={`/blog/${post.uid}`}
                className="text-blue-600 hover:underline text-xl"
              >
                {post.data.title}
              </Link>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}