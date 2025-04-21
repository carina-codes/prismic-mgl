import { PrismicText } from '@prismicio/react';
import { createClient } from '@/prismicio';
import Link from 'next/link';

export const metadata = { title: 'Blog Posts' };

export default async function Page() {
  const client = createClient();
  const blogPosts = await client.getAllByType('blog_post');

  return (
    <main className="page-style">
      <header>
        <div className="container">
          <h1>Blog Posts</h1>
        </div>
      </header>

      <section>
        <div className="container">
          <div>
            {blogPosts.map((post) => {
              const title = post.data?.title;
              const uid = post.uid;

              return (
                <article key={post.id}>
                  <Link href={`/blog/${uid}`}>
                    <h2>
                      <PrismicText field={title} />
                    </h2>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}