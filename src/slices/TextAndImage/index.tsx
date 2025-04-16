"use client"; // this allows Javascript on the page

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { ButtonLink } from "@/components/ButtonLink";

declare module "react" {
  interface CSSProperties {
    "--index"?:number;
  }
}

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {

  const theme = slice.primary.theme;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]", 
        theme === "Black" && "s-black p-tb", 
        theme === "Gray" && "s-gray p-tb", 
        theme === "White" && "s-white p-tb", 
      )}
      style={{ "--index": index }}
    >
      <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div className={clsx(
          "flex flex-col items-center gap-8 text-center md:items-start md:text-left", slice.variation === "imageOnLeft" && "md:order-2"
        )}>
          <div className="heading">
            <h2>
              <PrismicText field={slice.primary.heading} />
            </h2>
          </div>
          <PrismicRichText field={slice.primary.body} />
          <ButtonLink 
            field={slice.primary.button}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
        {/* <PrismicNextImage field={slice.primary.background_image} /> */}
        <PrismicNextImage field={slice.primary.foreground_image} className="w-100" />
      </div>
    </section>
  );
};

export default TextAndImage;
