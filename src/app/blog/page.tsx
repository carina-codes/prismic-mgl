import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import Link from 'next/link'

type BlogPost = Content.BlogPostDocument

export default async function BlogPage() {
  const client = createClient()
  const posts = await client.getAllByType('blog_post')

  return (
    <main className="page-style">
      <section className="s-30">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">
            Blog
          </h1>
          <ul className="space-y-6">
            {posts.map((post: BlogPost) => (
              <li key={post.id}>
                <Link href={`/blog/${post.uid}`}>
                  <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                    {post.data.title[0]?.text}</h2>
                </Link>
                <p className="text-gray-600 text-sm">
                  {new Date(post.first_publication_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
