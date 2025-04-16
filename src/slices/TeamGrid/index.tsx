import React from "react";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Skater } from "./Skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid = async ({ slice }: TeamGridProps) => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="s-04 p-tb"
    >
      <div className="container">
        <div className="heading flex flex-col items-center gap-8 text-center">
          <h2>
            <PrismicText field={slice.primary.heading} />
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {skaters.map((skater, index) => (
            <React.Fragment key={index}>
              {skater.data.first_name && <Skater index={index} skater={skater}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;