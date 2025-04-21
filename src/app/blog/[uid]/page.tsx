import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation';

type Params = {
  uid: string;
};

export default async function BlogPost({ params }: { params: Params }) {
  const { uid } = params;

  if (!uid) {
    notFound();
    return null;
  }

  const client = createClient();
  const post = await client.getByUID('blog_post', uid).catch(() => null);

  if (!post) {
    notFound();
    return null;
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

// This function generates the static paths for the blog post UIDs
export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType('blog_post');

  // Return the params for each blog post
  return posts.map((post) => ({
    uid: post.uid,
  }));
}