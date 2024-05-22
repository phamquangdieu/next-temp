import React, { useEffect } from 'react'
import styles from './styles.module.css';

const HorizontalScroll = () => {
    return (
        <div className={styles.wrapper}>
            <div id="test1" className={styles.container}>
                <div className={`panel1 ${styles.description} ${styles.panel} ${styles.blue}`}>
                    <div>
                    SCROLL DOWN
                    <div className="scroll-down"><div className="arrow"></div></div>
                    </div>
                </div>

                <section className={`panel1 ${styles.panel} ${styles.red}`}>
                    ONE
                </section>
                <section className={`panel1 ${styles.panel} ${styles.orange}`}>
                    TWO
                </section>
                <section className={`panel1 ${styles.panel} ${styles.purple}`}>
                    THREE
                </section>
            </div>
        </div>
    );
}
 
export default HorizontalScroll;