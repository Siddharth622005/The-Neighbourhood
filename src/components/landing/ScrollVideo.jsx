import { useEffect, useRef } from "react";

export default function ScrollVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Preload metadata so duration is available
    video.preload = "auto";

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0 || !video.duration) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      video.currentTime = progress * video.duration;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: "400vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-surface-cream">
        <video
          ref={videoRef}
          src="/tree-animation.webm"
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
