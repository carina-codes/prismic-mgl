import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export default async function BlogPost({ params }: { params: { uid: string } }) {
  const client = createClient();

  try {
    const post = await client.getByUID('blog_post', params.uid);

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
  } catch (error) {
    console.error('Error fetching the blog post:', error);
    return (
      <div className="container">
        <h1>Sorry, this post couldn&apos;t be found.</h1>
      </div>
    );
  }
}