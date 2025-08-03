import Image from "next/image";

export default function About() {
    return (
        <main>
            <section className="main-banner">
                <h2 className="sr-only">브랜드 소개 페이지</h2>
                <Image
                    src="/images/about/main-banner2.svg"
                    alt="브랜드 소개 매인 배너"
                    width={1920}
                    height={600}
                />
            </section>
        </main>
    );
}
