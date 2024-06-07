'use client';
import React, { useRef } from 'react';
import styles from './styles.module.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const ObserverDemo = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        let allSlides  = document.querySelectorAll(`.${styles.slide}`),
        allBg  = document.querySelectorAll(`.${styles.bg}`),
        outerWrappers : HTMLDivElement[] = gsap.utils.toArray(`.${styles.outer}`),
        innerWrappers : HTMLDivElement[] = gsap.utils.toArray(`.${styles.inner}`),
        animating : boolean,
        wrap = gsap.utils.wrap(0, allSlides.length),
        currentIndex = -1;

        function goToSlide(index : number, direction: number) {
            console.log(currentIndex, index);
            
            index = wrap(index);
            animating = true;
            const tl = gsap.timeline(
                { defaults: {duration: 1, ease: 'power1.inOut'}, onComplete: () => { animating = false} },
                );
            if (currentIndex >= 0 ) {
                console.log(currentIndex);
                
                gsap.set(allSlides[currentIndex], { zIndex: 0 })
                tl.to(allBg[currentIndex], { yPercent: 0 * direction })
                    .set(allSlides[currentIndex], { autoAlpha: 0 })
            }
            console.log(allSlides[index]);
            
            gsap.set(allSlides[index], { autoAlpha: 1, zIndex: 1})
            
            tl
            .fromTo([outerWrappers[index], innerWrappers[index]],
                { yPercent: i => i ? -100 * direction : 100 * direction },
                { yPercent: 0 }, 0)
                .fromTo(allBg[index], { yPercent: 15 * direction }, { yPercent: 0 }, 0)
            currentIndex = index;
        }
        Observer.create({
            type: 'wheel,touch, pointer',
            wheelSpeed: -1,
            onUp: () => !animating && goToSlide(currentIndex + 1, 1),
            onDown: () => !animating && goToSlide(currentIndex -1, -1),

            tolerance: 10,
        })
        goToSlide(0, 1);
        
    }, { scope: ref});
    return (
        <div ref={ref}>
            <div className={styles.container}>
                <div className={`${styles.slide} ${styles.first}`}>
                    <div className={styles.outer}>
                        <div className={styles.inner}>
                            <div className={styles.bg}>
                                <h1>Hello</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.slide} ${styles.second}`}>
                    <div className={styles.outer}>
                        <div className={styles.inner}>
                            <div className={styles.bg}>
                                <h1>Hello 2</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.slide} ${styles.third}`}>
                    <div className={styles.outer}>
                        <div className={styles.inner}>
                            <div className={styles.bg}>
                                <h1>Hello 3</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ObserverDemo;