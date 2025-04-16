import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import { ButtonLink } from "@/components/ButtonLink";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <main
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation} 
    >
      <section className="s-01 relative h-dvh overflow-hidden">
        <div className="container">
          <div className="flex flex-col items-center gap-8 text-center">
            <PrismicRichText field={slice.primary.heading} />
            <PrismicRichText field={slice.primary.body} />
            <ButtonLink field={slice.primary.button} icon="skateboard">
              {slice.primary.button.text}
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
