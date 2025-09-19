'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import styles from './styles.module.css';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline1 = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const hello = document.querySelector(`.${styles.hello}`);
      const tmpHello = new SplitType(`.${styles.hello}`, { types: 'chars' });
      const world = document.querySelector(`.${styles.world}`);
      const foo = document.querySelector(`.${styles.foo}`);
      const bar = document.querySelector(`.${styles.bar}`);
      const tmpWorld = new SplitType(`.${styles.world}`, { types: 'chars' });
      const tmpBar = new SplitType(`.${styles.bar}`, { types: 'chars' });
      const tmpFoo = new SplitType(`.${styles.foo}`, { types: 'chars' });
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
      });
      tl.fromTo(
        tmpHello.chars,
        {
          autoAlpha: 0,
          x: 0,
        },
        {
          autoAlpha: 1,
          x: 100,
          duration: 1,
          delay: 0.5,
          ease: 'power2',
          stagger: {
            each: 0.02,
            from: 'end',
          },
        },
        0.5
      )
        .fromTo(
          tmpWorld.chars,
          { x: 500 },
          {
            x: 0,
            delay: 1,
            duration: 1,
            ease: 'power2',
            stagger: {
              each: 0.02,
              from: 'start',
            },
          },
          0.5
        )
        .fromTo(
          tmpFoo.chars,
          {
            autoAlpha: 0,
            x: 0,
          },
          {
            autoAlpha: 1,
            x: 100,
            delay: 1.5,
            duration: 1,
            ease: 'power2',
            stagger: {
              each: 0.02,
              from: 'end',
            },
          },
          1
        )
        .fromTo(
          tmpBar.chars,
          { x: 500 },
          {
            x: 0,
            delay: 2,
            ease: 'power2',
            stagger: {
              each: 0.02,
              from: 'start',
            },
          },
          1
        );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={styles.container1}>
      <div className="part">
        <div className={styles.hello}>Hello</div>
      </div>
      <div className={styles.partRight}>
        <div className={styles.world}>world</div>
      </div>
      <div className="part">
        <div className={styles.foo}>Foo</div>
      </div>
      <div className={styles.partRight}>
        <div className={styles.bar}>Bar</div>
      </div>
    </div>
  );
};

export default Timeline1;
