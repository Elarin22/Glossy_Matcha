"use client";

import Image from "next/image";
import styles from "./MatchaGenerator.module.scss";
import Intro from "./Intro";

export default function MatchaGenerator() {
    return (
        <main className={styles["matcha-generator"]}>
            <section>
                <h2 className="sr-only">글로시 말차 체험형 콘텐츠 페이지</h2>
                <Image
                    className={styles["matcha-generator__banner"]}
                    src="/images/glossy-pick/main-banner.svg"
                    alt="체험형 콘텐츠 메인 배너"
                    width={1920}
                    height={720}
                    priority
                />
            </section>
            <section className={styles["matcha-generator__section"]}>
                <Intro />
            </section>
        </main>
    );
}
