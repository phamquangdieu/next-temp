'use client';
import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css';
import { gsap } from "gsap";
    
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HorizontalScroll = () => {
    const container = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (document) {
            let sections = gsap.utils.toArray(`.${styles.panel}`);
            console.log(sections);
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: `.${styles.container}`,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + document.querySelector<HTMLElement>(`.${styles.container}`)?.offsetWidth
                }
            });
        }
    },
    { scope: container }
    )

    return (
        <div className={styles.wrapper} ref={container}>
            <div className={`res ${styles.container}`}>
                <div className={`${styles.description} ${styles.panel} ${styles.blue}`}>
                    <div>
                    SCROLL DOWN
                    <div className="scroll-down"><div className="arrow"></div></div>
                    </div>
                </div>

                <section className={`${styles.panel} ${styles.red}`}>
                    ONE
                </section>
                <section className={`${styles.panel} ${styles.orange}`}>
                    TWO
                </section>
                <section className={`${styles.panel} ${styles.purple}`}>
                    THREE
                </section>
            </div>
        </div>
    );
}
 
export default HorizontalScroll;