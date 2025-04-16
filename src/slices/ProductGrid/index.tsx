import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SkateboardProduct } from "./SkateboardProduct";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="s-02"
    >
      <div className="container">
        <div className="heading flex flex-col items-center gap-8 text-center">
          <h2>
            {slice.primary.heading}
          </h2>
          <PrismicRichText field={slice.primary.body} />
        </div>
        <div className="products">
          {slice.primary.product.map(({skateboard}) => (
            isFilled.contentRelationship(skateboard) && (
              <SkateboardProduct key={skateboard.id} id={skateboard.id} />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
