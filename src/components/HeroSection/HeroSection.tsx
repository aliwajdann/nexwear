import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import campaign from "./campaign.png";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  title?: string;
  since?: string;
  description?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function HeroSection({
  title = "Aurelle",
  since = "2024",
  description = "Fine jewelry made to be worn every day. Each piece is shaped by hand, built to catch the light and to stay with you for years.",
  imageAlt = "Model wearing pearl earrings, a gold chain necklace and rings",
  ctaLabel,
  ctaHref,
}: HeroSectionProps) {
  // --chars scales the title so it fills the width whatever the brand name is
  // --img-ratio keeps the image box the same shape as campaign.png
  const vars = {
    "--chars": String(title.length),
    "--img-ratio": `${campaign.width} / ${campaign.height}`,
  } as CSSProperties;

  return (
    <section className={styles.hero} aria-label={`${title} hero`}>
      <div className={styles.inner} style={vars}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.imageLayer}>
          <div className={styles.imageWrap}>
            <Image
              src={campaign}
              alt={imageAlt}
              fill
              priority
              quality={85}
              sizes="(min-width: 900px) 60vw, 115vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.meta}>
          <p className={styles.since}>[ Since {since} ]</p>
          <div className={styles.copy}>
            <p className={styles.description}>{description}</p>
            {ctaHref && ctaLabel ? (
              <Link href={ctaHref} className={styles.cta}>
                {ctaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
