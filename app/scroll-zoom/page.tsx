'use client'
import React, { useRef } from 'react'
import styles from './styles.module.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const ScrollZoom = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
/* 
This GSAP effect lets you zoom in on a particular spot of the target - you define the scale and the origin as an Array of x/y normalized values.
Like {scale: 3, origin: [0.25, 0.8]} would zoom in on the spot that's 25% from the left, and 80% from the top of the element/image.
It will return an animation that controls the xPercent, yPercent, and scale (as well as any other values you pass in, like a normal tween).
It won't let the edges collapse toward the center. It's best to put the element into a container that has overflow: hidden.

Example: 

gsap.effects.zoom(".photo", {
  scale: 3,
  origin: [0.25, 0.8],
  duration: 1,
  ease: "power1.inOut"
});
 */
    gsap.registerEffect({
        name: "zoom",
        effect: (targets: any, config: any) => {
            console.log(config);
            
            
            const vars = {transformOrigin: "0px 0px", ...config},
                    { scale, origin } = config,
                    clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
                    console.log(-100 * (scale - 1));
            delete vars.origin;
            vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
            vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
            vars.overwrite = "auto";
            return gsap.to(targets, vars);
        },
        extendTimeline: true,
        defaults: {origin: [0.5, 0.5], scale: 2}
  });
  
  // for each section, we define the zoom data here
  const zoomData = [
    {scale: 1, origin: [0.5, 0.5]},
    {scale: 3, origin: [0.6, 1]},
    {scale: 1, origin: [0.5, 0.5]},
    {scale: 2, origin: [0.8, 0.4]}
  ];
  
  // now loop through each section and create the ScrollTrigger accordingly.
  // when that section enters from either direction, it'll fire off the zoom animation.
  const sections : HTMLElement[] = gsap.utils.toArray("section");
  console.log(sections);
  
  sections.forEach((section, index) => {
    const zoom = zoomData[index];
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      end: "+=125%",
      onToggle(self) {
        if (self.isActive) { // if it enters forward or backward
          gsap.effects.zoom(`.${styles.photo}`, {
            scale: zoom.scale,
            origin: zoom.origin,
            duration: 1,
            ease: "power1.inOut"
          });
        }
      }
    });
  });
    }, { scope: ref})
    return (
        <div ref={ref} className={styles.container}>
            <div className={styles.rightSide}>
            <div className={styles.photo}></div>
            </div>
            <section>
                <h1>ScrollTrigger Zoom by Section</h1>
            </section>
            <section>
                <h1>Section 2</h1>
            </section>
            <section>
                <h1>Section 3</h1>
            </section>
            <section>
                <h1>Section 4</h1>
            </section>
        </div>
    );
}
 
export default ScrollZoom;