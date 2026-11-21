import Image from "next/image";
import Link from "next/link";
import jewelry from "./jewelry.webp";
import styles from "./HeroSection.module.css";

export default function HeroSection({
  collectionHref = "/collections",
}: {
  collectionHref?: string;
}) {
  return (
    <section className={styles.hero} aria-label="Jewelry collection">
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.kicker}>The gold &amp; pearl edit</p>
          <h1 className={styles.title}>
            A little gold.<br />
            <em>A little glow.</em>
          </h1>
          <p className={styles.description}>
            Sculptural hoops and soft pearls. Discover the pieces that make
            everyday dressing feel personal.
          </p>
          <Link className={styles.link} href={collectionHref}>
            Shop the collection <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.frame}>
          <Image
            className={styles.photo}
            src={jewelry}
            alt="Sculptural gold hoops and a baroque pearl pendant on burgundy velvet"
            sizes="(max-width: 767px) 92vw, (max-width: 1440px) 48vw, 680px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
