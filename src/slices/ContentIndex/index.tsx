"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = ({ slice }: ContentIndexProps) => {
  const [items, setItems] = useState<Content.PostDocument[]>([]);

  useEffect(() => {
    async function fetchContent() {
      const client = createClient();
      const contentType = slice.primary.content_type;

      if (contentType === "post") {
        const response = await client.getByType("post", {
          pageSize: Number(slice.primary.items_to_show) || 3,
          orderings: {
            field: "document.first_publication_date",
            direction: "desc",
          },
        });

        setItems(response.results as Content.PostDocument[]);
      } else {
        console.warn(`Unsupported content_type: ${contentType}`);
      }
    }

    fetchContent();
  }, [slice]);

  return (
    <section className="s-02 s-black ft-blogs">
      <div className="container">
        <div className="heading flex flex-col items-center gap-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {slice.primary.title}
            </h2>
        </div>
        <div className="ft-blog-row">
          {items.map((item) => (
            <div key={item.id} className="ft-blog p-4">
              <a
                href={`/blog/${item.uid}`}
                className="text-blue-600 text-lg font-semibold hover:underline"
              >
                {item.data.title}
              </a>
              <p className="mt-2 text-sm text-gray-500">
                {item.data.published_date &&
                  new Date(item.data.published_date).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </p>
              <p className="text-gray-300 mt-2 mb-6 line-clamp-3">
                {item.data.excerpt}
              </p>
              <a
                href={`/blog/${item.uid}`}
                className="text-blue-600 text-lg font-semibold hover:underline"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-6 text-center">
          <a
            href={`/blog/`}
            className="button-link-style"
          >
            Read the blog →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContentIndex;