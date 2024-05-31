'use client';
import React, { useRef } from 'react'
import styles from './styles.module.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import SplitType from 'split-type'

gsap.registerPlugin(Observer);

const Observer2 = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {

        let sections = document.querySelectorAll("section"),
        images = document.querySelectorAll(`.${styles.bg}`),
        headings : HTMLDivElement[] = gsap.utils.toArray(".section-heading"),
        outerWrappers = gsap.utils.toArray(`.${styles.outer}`),
        innerWrappers = gsap.utils.toArray(`.${styles.inner}`),
        splitHeadings = headings.map(heading => new SplitType(heading, { types: "chars,words,lines", lineClass: "clip-text" })),
        currentIndex = -1,
        wrap = gsap.utils.wrap(0, sections.length),
        animating: boolean;
        

        // gsap.set(outerWrappers, { yPercent: 100 });
        // gsap.set(innerWrappers, { yPercent: -100 });

        function gotoSection(index: number, direction: number) {
            index = wrap(index); // make sure it's valid
            animating = true;
            
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => {
                        animating = false;
                    }
                });
            if (currentIndex >= 0) {
                // The first time this function runs, current is -1
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl
                    .to(images[currentIndex], { yPercent: 0 * dFactor })
                    .set(sections[currentIndex], { autoAlpha: 0 });
            }
            console.log(currentIndex, index);
            
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl
                .fromTo([outerWrappers[index], innerWrappers[index]], { 
                    yPercent: i => i ? -100 * dFactor : 100 * dFactor
                    }, { 
                    yPercent: 0 
                    }, 0)
                .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(splitHeadings[index].chars, { 
                    autoAlpha: 0, 
                    yPercent: 150 * dFactor,
                    }, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "power2",
                    stagger: {
                    each: 0.02,
                    from: "random"
                    }
                }, 0.2);

            currentIndex = index;
        }

        Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true
        });

        gotoSection(0, 1);

// original: https://codepen.io/BrianCross/pen/PoWapLP
// horizontal version: https://codepen.io/GreenSock/pen/xxWdeMK

    }, {scope: ref})
    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.header}>
                <div>Animated Sections</div>
                <div><a href="https://codepen.io/BrianCross/pen/PoWapLP">Original By Brian</a></div>
            </div>
            <section className={styles.first}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                    <div className={`${styles.bg} ${styles.one}`}>
                        <h2 className="section-heading">Scroll down</h2>
                    </div>
                </div>
            </div>

            </section>
            <section className={styles.second}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div className={styles.bg}>
                            <h2 className="section-heading">Animated with GSAP</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.third}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div className={styles.bg}>
                            <h2 className="section-heading">GreenSock</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.fourth}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div className={styles.bg}>
                            <h2 className="section-heading">Animation platform</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.fifth}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div className={styles.bg}>
                            <h2 className="section-heading">Keep scrolling</h2>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
 
export default Observer2;