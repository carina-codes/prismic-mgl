import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation';

export default async function BlogPost({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  const post = await client.getByUID('blog_post', params.uid);

  if (!post) {
    notFound();
  }

  return (
    <main className="page-style">
      <header>
        <div className="container">
          <PrismicRichText field={post.data.title} />
        </div>
      </header>

      <article>
        <div className="container">
          <PrismicRichText field={post.data.content} />
        </div>
      </article>
    </main>
  );
}