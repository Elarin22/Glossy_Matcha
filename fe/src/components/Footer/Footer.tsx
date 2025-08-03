'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
    return (
    <footer className={styles.footer}>
        <div className={styles.container}>
        {/* Social Icons */}
        <div className={styles.socialIcons}>
            <a 
            href="https://map.naver.com/p/entry/place/1265323075?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202508011801&locale=ko&svcName=map_pcv5&searchType=place&lng=126.6397881&lat=33.5457978&c=15.00,0,0,0,dh"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            >
            <img src="/images/icon/naver-icon.png" alt="네이버 지도" className={styles.icon} />
            </a>
            <a 
            href="https://www.instagram.com/glossy_matcha/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            >
            <img src="/images/icon/instagram-icon.png" alt="인스타그램" className={styles.icon} />
            </a>
        </div>

        {/* Company Info */}
        <div className={styles.companyInfo}>
            <div className={styles.companyName}>(주) 컬쳐히어로제주</div>
            <div className={styles.infoRow}>
                <span className={styles.infoItem}>대표자 | 윤종석</span>
            </div>
            <div className={styles.infoRow}>
                <span className={styles.infoItem}>연락처 | 0507-1449-7847 |</span>
                <span className={styles.infoItem}>jay@culturehero.net</span>
            </div>
            <div className={styles.infoRow}>
                <span className={styles.infoItem}>사업자번호 | 779-81-02082</span>
            </div>
            <div className={styles.infoRow}>
                <span className={styles.infoItem}>주소 | 제주시 조천읍 조함해안로 112</span>
            </div>
        </div>
        </div>
    </footer>
    );
}

export default Footer