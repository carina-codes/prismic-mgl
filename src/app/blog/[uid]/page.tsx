import { createClient } from '@/prismicio';
import { PrismicRichText } from '@prismicio/react';
import { notFound } from 'next/navigation';
import { GetStaticPropsContext } from 'next';

type Params = {
  uid: string;
};

export default async function BlogPost({ params }: { params: Params }) {
  const { uid } = params;
  
  if (!uid) {
    // If there's no uid, return a 404
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

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType('blog_post');

  return posts.map((post) => ({
    uid: post.uid, // generates static paths for each post's UID
  }));
}

// Adjusting the typing of GetStaticPropsContext for the params
export async function getStaticProps({ params }: GetStaticPropsContext<Params>) {
  const { uid } = params || {};

  if (!uid) {
    return {
      notFound: true,
    };
  }

  const client = createClient();
  const post = await client.getByUID('blog_post', uid).catch(() => null);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      post, // pass post data to the component
    },
  };
}