'use client';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { gsap } from 'gsap';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HorizontalScroll = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (document) {
        let sections = gsap.utils.toArray(`.${styles.panel}`);

        // master horizontal scroll tween
        const scrollTween = gsap.to(sections, {
          x: `-${4000 - window.innerWidth}px`,
          ease: 'none',
        });

        // ScrollTrigger controlling the horizontal scroll
        ScrollTrigger.create({
          trigger: `.${styles.container}`,
          pin: true,
          scrub: 1,
          animation: scrollTween,
          end: () =>
            '+=' +
            document.querySelector<HTMLElement>(`.${styles.container}`)
              ?.offsetWidth,
        });

        // .box-1 animation
        const box1Tween = gsap.to('.box-1', {
          y: -130,
          duration: 2,
          ease: 'elastic',
        });

        ScrollTrigger.create({
          trigger: '.box-1',
          animation: box1Tween,
          containerAnimation: scrollTween,
          toggleActions: 'play none none reset',
        });

        // .box-2 animation
        const box2Tween = gsap.to('.box-2', {
          y: -250,
          backgroundColor: '#1e90ff',
          ease: 'none',
        });

        ScrollTrigger.create({
          trigger: '.box-2',
          animation: box2Tween,
          containerAnimation: scrollTween,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        });
      }
    },
    { scope: container }
  );

  return (
    <div className={styles.wrapper} ref={container}>
      <div className={`res ${styles.container}`}>
        <div className={`${styles.description} ${styles.panel} ${styles.blue}`}>
          <div>
            SCROLL DOWN
            <div className="scroll-down">
              <div className="arrow"></div>
            </div>
          </div>
        </div>

        <section className={`${styles.panel} ${styles.red}`}>
          ONE
          <div className="box-1 h-24 w-24 bg-transparent border-white border-2 text-gray-100">
            box-1
          </div>
        </section>
        <section className={`${styles.panel} ${styles.orange}`}>
          TWO
          <div className="box-2 h-24 w-24 bg-transparent border-yellow border-2 text-gray-100">
            box-1
          </div>
        </section>
        <section className={`${styles.panel} ${styles.purple}`}>THREE</section>
      </div>
    </div>
  );
};

export default HorizontalScroll;
