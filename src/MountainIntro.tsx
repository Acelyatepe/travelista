import type { Lang } from "./data";

export default function MountainIntro({ lang }: { lang: Lang }) {
  const label = {
    tr: "Travelista ana sayfa seyahat videosu",
    en: "Travelista homepage travel video",
    de: "Travelista Reisevideo auf der Startseite",
  }[lang];

  return (
    <section className="homepage-video" aria-label={label}>
      <video
        src="/images/home/travelista-hero.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />
    </section>
  );
}
