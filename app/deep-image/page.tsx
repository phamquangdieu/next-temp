'use client';
import React, { useRef } from 'react';
import styles from './styles.module.css';
import { useGSAP } from '@gsap/react';
import gsap, { TweenLite, TweenMax } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeepImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const imgs: HTMLDivElement[] = gsap.utils.toArray('img');
      const colors = ['#b78254', '#5dd0d2', '#f0b6b5', '#ae88bd'];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.container}`,
          start: 'top top',
          end: '5000 50%',
          scrub: 1,
          pin: true,
          markers: true,
        },
        defaults: { duration: 0.5 },
      });

      const tl0 = gsap.timeline();
      tl0
        .to(
          `.${styles.img}`,
          {
            scale: 5.5,
            x: 1500,
            autoAlpha: 1,
            duration: 3,
            ease: 'power1.inOut',
          },
          'a'
        )
        .to(
          `.${styles.container}`,
          {
            background: `linear-gradient(
            0deg,
            rgba(0, 0, 0, .8) 0%,
            rgba(0, 0, 0, 0.2) 100%
          ),
          radial-gradient(circle at 20% 20%, #b78254, #222 )`,
            delay: 0.3,
          },
          'a'
        );

      const tl1 = gsap.timeline();
      tl1
        .fromTo(
          `.${styles.img1}`,
          { scale: 0, zIndex: -1 },
          {
            scale: 5.5,
            x: -1500,
            opacity: 1,
            duration: 4,
            zIndex: 10,
            ease: 'power1.inOut',
          },
          'b'
        )
        .to(
          `.${styles.container}`,
          {
            background: `linear-gradient(
                0deg,
                rgba(0, 0, 0, .8) 0%,
                rgba(0, 0, 0, 0.2) 100%
            ),
            radial-gradient(circle at 30% 30%, #5dd0d2, #333 )`,
            delay: 0.3,
          },
          'b'
        );
      const tl2 = gsap.timeline();
      tl2
        .fromTo(
          `.${styles.img2}`,
          { scale: 0, zIndex: -2 },
          {
            scale: 5.5,
            x: 1500,
            opacity: 1,
            duration: 5,
            zIndex: 20,
            ease: 'power1.inOut',
          },
          'c'
        )
        .to(
          `.${styles.container}`,
          {
            background: `linear-gradient(
                    0deg,
                    rgba(0, 0, 0, .8) 0%,
                    rgba(0, 0, 0, 0.2) 100%
                ),
                radial-gradient(circle at 50% 50%, #f0b6b5, #333  )`,
            delay: 0.3,
          },
          'c'
        );
      const tl3 = gsap.timeline();
      tl3
        .fromTo(
          `.${styles.img3}`,
          { scale: 0, zIndex: -3 },
          {
            scale: 5.5,
            x: -1500,
            opacity: 1,
            duration: 6,
            zIndex: 30,
            ease: 'power1.inOut',
          },
          'd'
        )
        .to(
          `.${styles.container}`,
          {
            background: `linear-gradient(
                0deg,
                rgba(0, 0, 0, .8) 0%,
                rgba(0, 0, 0, 0.2) 100%
            ),
            radial-gradient(circle at 80% 70%, #ae88bd, #333 )`,
            delay: 0.3,
          },
          'd'
        );
      tl.add(tl0, '<0.5').add(tl1, '<.5').add(tl2, '<.5').add(tl3, '<.5');

      //    .fromTo(
      //         `.${styles.img1}`,
      //         { scale: 0, zIndex: -1 },
      //         { scale: 5.5, x: -1500, opacity: 1,  duration: 4, zIndex: 10, ease: 'power1.inOut'}, '<.5')
      //     .to(
      //         `.${styles.container}`,
      //         { background: `linear-gradient(
      //             0deg,
      //             rgba(0, 0, 0, .8) 0%,
      //             rgba(0, 0, 0, 0.2) 100%
      //           ),
      //           radial-gradient(#eee,  #5dd0d2  )`, duration: 0})
      // .fromTo(
      //     `.${styles.img2}`,
      //     { scale: 0, zIndex: -2 },
      //     { scale: 5.5, x: 1500, opacity: 1,  duration: 5, zIndex: 20, ease: 'power1.inOut'}, '<.5')
      // .fromTo(
      //     `.${styles.img3}`,
      //     { scale: 0, zIndex: -3 },
      //     { scale: 5.5, x: -1500, opacity: 1,  duration: 6, zIndex: 30, ease: 'power1.inOut'}, '<.5')
    },
    { scope: ref }
  );
  return (
    <div ref={ref}>
      <div className={styles.container}>
        {/* <div className='w-full h-full z-0 bg-white'></div> */}
        <img
          className={styles.img}
          src="/deep-img/ghibli-1.jpeg"
          alt=""
          width={200}
        />
        <img
          className={styles.img1}
          src="/deep-img/ghibli-2.jpeg"
          alt=""
          width={200}
        />
        <img
          className={styles.img2}
          src="/deep-img/ghibli-3.jpeg"
          alt=""
          width={200}
        />
        <img
          className={styles.img3}
          src="/deep-img/ghibli-4.webp"
          alt=""
          width={200}
        />
      </div>
    </div>
  );
};

export default DeepImage;
