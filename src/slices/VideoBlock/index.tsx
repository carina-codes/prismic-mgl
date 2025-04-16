import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LazyYouTubePlayer } from "./LazyYouTubePlayer";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="s-03 p-tb"
    >
      <div className="container">
        <h2 className="sr-only"></h2>
        <div className="aspect-video">
          <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;
