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
        const results = await client.getAllByType("post", {
          pageSize: slice.primary.items_to_show || 3,
          orderings: {
            field: "document.first_publication_date",
            direction: "desc",
          },
        });

        setItems(results as Content.PostDocument[]);
      } else {
        console.warn(`Unsupported content_type: ${contentType}`);
      }
    }

    fetchContent();
  }, [slice]);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">{slice.primary.title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`/blog/${item.uid}`} className="text-blue-600 hover:underline">
              {item.data.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContentIndex;