'use client';
import React, { useRef } from 'react'
import styles from './styles.module.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const Openertext = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const topDiv = document.querySelector(`.${styles.top}`)
        const bottomDiv = document.querySelector(`.${styles.top}`)
        
        const tl = gsap.timeline({
            defaults: {duration: 1},
            scrollTrigger: {
                trigger: `.${styles.container}`,
                scrub: 1,
                pin: true,
                start: 'top top',
                end: '100% 50%',
                markers: true,
            }
        })
        tl.to('.t2', { top: '-100%', color: 'red' }, 'a')
        tl.to(`.t1`, { top: '100%', color: 'red' }, 'a')
        tl.fromTo(`.${styles.content}`, { y: 150, opacity: 0.5 }, {y: 0, opacity: 1 }, 'a')
    }, { scope: ref});
    return (
        <div ref={ref}>
            <div className={styles.container3}>Test</div>
            <div className={styles.container}>
                <div className='flex flex-col absolute top-0 h-full w-full bg-yellow-400'>
                    <div className='t2 flex-1 relative overflow-hidden bg-white z-50'>
                        <div className={styles.top}>
                            <div className={styles.topText}>
                                Hello 
                            </div>
                        </div>
                    </div>
                    
                    <div className='t1 flex-1 relative overflow-hidden bg-white z-50'>
                        <div className={styles.bottom}>
                            <div className={styles.bottomText}>
                                Hello 
                            </div>
                        </div>
                    </div>
                    <div className='absolute back-content top-0 z-1'>
                       <div className={styles.content}>12331231</div>
                    </div>
                </div>
                
            </div>
            {/* <div className={styles.container3}>Test</div> */}
        </div>
    );
}
 
export default Openertext;