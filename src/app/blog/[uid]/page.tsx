import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation'; // Optional: handles 404 for missing posts

type Params = {
  uid: string;
};

export default async function BlogPost({ params }: { params: Params }) {
  const client = createClient();
  const post = await client.getByUID('blog_post', params.uid).catch(() => null);

  if (!post) {
    notFound(); // Optionally handles 404 if the post is not found
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