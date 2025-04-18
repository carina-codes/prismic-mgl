import { createClient } from '@/prismicio'
import { PrismicRichText } from '@prismicio/react'

export default async function AboutPage() {
  const client = createClient()
  const page = await client.getSingle('about') 

  return (
    <main className="page-style">
      <section className="s-20">
        <div className="container">
          <h1>
            {page.data.heading}
          </h1>
          <PrismicRichText field={page.data.content} />
        </div>
      </section>
    </main>
  )
}
