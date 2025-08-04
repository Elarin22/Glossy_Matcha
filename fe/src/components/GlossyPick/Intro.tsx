"use client";

import Image from "next/image";
import GlossyPickHeader from "./GlossyPickHeader";
import styles from "./Intro.module.scss";

export default function Intro() {
    return (
        <div className={styles.intro}>
            <GlossyPickHeader />
            <p className={styles["intro__description"]}>
                몇 가지 질문에 답하면, 당신에게 어울리는 글로시 말차 메뉴를
                추천해드려요.
            </p>
            <Image
                className={styles["intro__image"]}
                src="/images/glossy-pick/intro.svg"
                alt="글로시 말차 메뉴 이미지"
                width={970}
                height={420}
            />
            <button className="btn-g pc">시작하기</button>
        </div>
    );
}
