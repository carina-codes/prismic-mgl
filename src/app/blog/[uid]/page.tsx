import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';

export default async function BlogPost({ params }: { params: { uid: string } }) {
  const client = createClient();

  try {
    const post = await client.getByUID('blog_post', params.uid);

    // Ensure that the data has the expected fields before rendering
    const title = post?.data?.title || 'Untitled';
    const content = post?.data?.content || 'No content available.';

    return (
      <main className="page-style">
        <header>
          <div className="container">
            <PrismicRichText field={title} />
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
    console.error("Error fetching the blog post:", error);
    return (
      <div className="container">
        <h1>Sorry, this post couldn't be found.</h1>
      </div>
    );
  }
}
