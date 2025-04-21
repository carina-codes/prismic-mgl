import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return (
    <main className="page-style">
      <header>
        <div className="container">
          <PrismicRichText field={page.data.title} />
        </div>
      </header>

      <article>
        <div className="container">
          <PrismicRichText field={page.data.content} />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => ({
    uid: page.uid,
  }));
}