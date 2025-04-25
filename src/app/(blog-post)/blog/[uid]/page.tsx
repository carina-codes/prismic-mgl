import { createClient } from '@/prismicio';
import { notFound } from 'next/navigation';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ uid: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { uid } = await params;
  const client = createClient();
  const post = await client.getByUID('post', uid).catch(() => null);

  if (!post) return notFound();

  return (
    <main className="page-style">
      <section>
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">{post.data.title}</h1>
          <p>
            {post.data.published_date &&
              new Date(post.data.published_date).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
          </p>
        </div>
      </section>

      <article>
        <div className="container">
          <PrismicRichText field={post.data.content} />
        </div>
      </article>

      <div className="container">
        <Link href="/blog" className="text-blue-600 text-sm hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}