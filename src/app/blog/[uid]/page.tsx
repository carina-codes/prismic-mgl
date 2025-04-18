import { createClient } from '@/prismicio'
import { notFound } from 'next/navigation'
import { PrismicRichText } from '@prismicio/react'
import { Content } from '@prismicio/client'

type BlogPost = Content.BlogPostDocument

type Params = {
  params: { uid: string }
}

export default async function BlogPostPage({ params }: Params) {
  const client = createClient()

  // Fetch the blog post by UID
  const post = await client.getByUID('blog_post', params.uid).catch(() => null)

  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound()
  }

  return (
    <main className="page-style">
      <section className="s-30">
        <div className="container">
          <article>
            <PrismicRichText field={post.data.title} />
            <PrismicRichText field={post.data.content} />
          </article>
        </div>
      </section>
    </main>
  )
}
