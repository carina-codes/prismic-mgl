import { FC } from "react"
import { notFound } from "next/navigation"
import { createClient } from "@/prismicio"
import { Content } from "@prismicio/client"
import { PrismicRichText } from "@prismicio/react"

/**
 * Props for the BlogPostPage.
 */
export type BlogPostPageProps = {
  params: { uid: string }
}

/**
 * Page component for a single blog post.
 */
const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const client = createClient()

  const post: Content.BlogPostDocument | null = await client
    .getByUID("blog_post", params.uid)
    .catch(() => null)

  if (!post) {
    notFound()
  }

  return (
    <main className="page-style">
      <section className="s-30">
        <div className="container">
          <article data-uid={params.uid}>
            <PrismicRichText field={post.data.title} />
            <PrismicRichText field={post.data.content} />
          </article>
        </div>
      </section>
    </main>
  )
}

export default BlogPostPage