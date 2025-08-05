import styles from "./GlossyPickHeader.module.scss";

export default function GlossyPickHeader() {
    return (
        <header className={styles["glossy-pick-header"]}>
            <h3 className={styles["glossy-pick-header__title"]}>
                Glossy Pick
            </h3>
            <p className={styles["glossy-pick-header__subtitle"]}>
                단 하나, 당신만을 위한 글로시 말차
            </p>
        </header>
    );
}
