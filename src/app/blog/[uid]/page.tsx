import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation';

export default async function BlogPost({}) {
  // Get the dynamic segment directly from the URL
  const uid = window.location.pathname.split('/')[2];  // Assuming the structure is /blog/[uid]

  if (!uid) {
    notFound();  // Show a 404 page if no UID is present
    return null;
  }

  const client = createClient();
  const post = await client.getByUID('blog_post', uid).catch(() => null);

  if (!post) {
    notFound();  // Show a 404 page if the post is not found
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

  return posts.map((post) => ({
    uid: post.uid,  // Return the `uid` for each blog post
  }));
}