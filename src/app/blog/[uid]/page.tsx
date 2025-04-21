import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export default async function BlogPost() {
  const client = createClient();
  const post = await client.getSingle('blog_post');

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
