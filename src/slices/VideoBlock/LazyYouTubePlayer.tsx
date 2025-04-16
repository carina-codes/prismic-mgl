"use client"

import { KeyTextField } from "@prismicio/client";
import { useRef, useState, useEffect } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const currentContainerRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry])=>{
        if (entry.isIntersecting){
          setIsInView(true);
          console.log("it's in view");
        } 
      }, {threshold: 0, rootMargin: "1500px"}
    );

    if (currentContainerRef) {
      observer.observe(currentContainerRef)
    }

    return ()=>{
      if (currentContainerRef) {
        observer.observe(currentContainerRef)
      }
    }

  })
 
  return (
    <div className="relative h-full w-full" ref={containerRef}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}&playsinline=1&modestbranding=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="pointer-events-none h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}