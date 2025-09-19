'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
// import styles from './styles.module.css'

const HorizontalScroll2 = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      let container = document.getElementById('container');
      let hello = document.querySelector('.hello');
      let sections = document.querySelectorAll('.module');
      let texts = document.querySelectorAll('h1');
      let imgs = document.querySelectorAll('img');

      // if (hello) {
      //     gsap.set(hello, { yPercent: -200, autoAlpha: 0 })
      //     gsap.fromTo(hello, { y: 800, autoAlpha: 1 }, {y: -800, duration: 10, repeat: -1})
      // }
      if (container) {
        let scrollTween = gsap.to(container, {
          //xPercent: -100 * (sections.length - 1),
          x: -(container.scrollWidth - window.innerWidth),
          ease: 'none', // <-- IMPORTANT!
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            // end: 3000,
            pin: true,
            scrub: 0.5,
            markers: true,
          },
        });
        imgs.forEach((img, index) => {
          gsap.from(`.box-${index + 1}`, {
            y: index % 2 === 0 ? -50 : 50,
            backgroundColor: '#1e90ff',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: `.box-${index + 1}`,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'center 20%',
              scrub: true,
              markers: true,
            },
          });
        });
      }
    },
    { scope: ref }
  );
  return (
    <div ref={ref}>
      <div className="introduction">
        <div
          className="uppercase hello"
          style={{
            color: 'red',
            WebkitTextFillColor: 'transparent',
            WebkitTextStrokeColor: 'red',
            WebkitTextStrokeWidth: 2,
          }}
        >
          {' '}
          Hello WORLD!!
        </div>
      </div>
      <div id="container">
        <div className="module dark">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-1 object-cover"
          />
        </div>
        <div className="module white">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-2 object-cover"
          />
        </div>
        <div className="module blue">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-3 object-cover"
          />
        </div>
        <div className="module orange">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-4 object-cover"
          />
        </div>
        <div className="module dark">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-5 object-cover"
          />
        </div>
        <div className="module white">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-6 object-cover"
          />
        </div>
        <div className="module blue">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-7 object-cover"
          />
        </div>
        <div className="module orange">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-8 object-cover"
          />
        </div>
        <div className="module dark">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-9 object-cover"
          />
        </div>
        <div className="module white">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-10 object-cover"
          />
        </div>
        <div className="module blue">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-11 object-cover"
          />
        </div>
        <div className="module orange">
          <img
            alt=""
            src="/img-2.jpeg"
            width={300}
            className="box-12 object-cover"
          />
        </div>
      </div>
      <div className="introduction"> Bye Gsap</div>
    </div>
  );
};

export default HorizontalScroll2;
