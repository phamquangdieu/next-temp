'use client';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css';
import gsap from 'gsap';

// const HomepageImg = () => {
//     const ref = useRef<HTMLDivElement>(null)
//     useGSAP(() => {
//         const loop = horizontalLoop(`.${styles.marqueeItem}`, {
//           repeat: -1,
//           paused: false,
//           speed: 1
//         });
        
//         /*
//         This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
        
//         Features:
//          - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
//          - When each item animates to the left or right enough, it will loop back to the other side
//          - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
//          - The returned timeline will have the following methods added to it:
//            - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
//            - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
//            - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
//            - current() - returns the current index (if an animation is in-progress, it reflects the final index)
//            - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
//          */
//         function horizontalLoop(itemClass: string, config: any) {
//           let items : HTMLDivElement[] = gsap.utils.toArray(itemClass);
//           config = config || {};
//           let tl = gsap.timeline({
//               repeat: config.repeat,
//               paused: config.paused,
//               defaults: { ease: "none" },
//               onReverseComplete: () => {
//                 tl.totalTime(tl.rawTime() + tl.duration() * 100)
//               }
//             }),
//             length = items.length,
//             startX = items[0].offsetLeft,
//             times : any = [],
//             widths: any = [],
//             xPercents: any = [],
//             curIndex = 0,
//             pixelsPerSecond = (config.speed || 1) * 100,
//             snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
//             // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth.
//             // So we snap to 5 percentage points to make things look more natural
//             totalWidth,
//             curX,
//             distanceToStart,
//             distanceToLoop,
//             item,
//             i;
//           gsap.set(items, {
//             // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
//             xPercent: (i, el) => {
//             //   let w = (widths[i] = Number(gsap.getProperty(el, "width", "px")));
//               let w = (widths[i] = parseFloat(`${gsap.getProperty(el, "width", "px")}`));
//               xPercents[i] = snap(
//                 (Number(gsap.getProperty(el, "x", "px")) / w) * 100 +
//                   Number(gsap.getProperty(el, "xPercent"))
//               );
              
              
//               return xPercents[i];
//             }
//           });
//           console.log(widths, xPercents );
          
//           gsap.set(items, { x: 0 });
//           totalWidth =
//             items[length - 1].offsetLeft +
//             (xPercents[length - 1] / 100) * widths[length - 1] -
//             startX +
//             items[length - 1].offsetWidth *
//               Number(gsap.getProperty(items[length - 1], "scaleX")) +
//             (parseFloat(config.paddingRight) || 0);
//             console.log(totalWidth)
//           for (i = 0; i < length; i++) {
//             item = items[i];
//             curX = (xPercents[i] / 100) * widths[i];
            
//             distanceToStart = item.offsetLeft + curX - startX;
//             distanceToLoop =
//               distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));
//               console.log(distanceToLoop, distanceToStart);
              
//             tl.to(
//               item,
//               {
//                 xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
//                 duration: distanceToLoop / pixelsPerSecond
//               },
//               0
//             )
//               .fromTo(
//                 item,
//                 {
//                   xPercent: snap(
//                     ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
//                   )
//                 },
//                 {
//                   xPercent: xPercents[i],
//                   duration:
//                     (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
//                   immediateRender: false
//                 },
//                 distanceToLoop / pixelsPerSecond
//               )
//               .add("label" + i, distanceToStart / pixelsPerSecond);
//             times[i] = distanceToStart / pixelsPerSecond;
//           }
          
//           return tl;
//         }
        
//     }, {scope: ref})
//     return (
//         <div ref={ref} className={styles.container}>
//             <h1>Marquee</h1>
//             <div className={`${styles.marquee} js-marquee`}>
//             <div className={styles.marqueeInner}>
//                 <span className={styles.marqueeItem}>
//                 <img className={styles.img} src="/deep-img/ghibli-1.jpeg" alt='' width={200} />
//                 </span>
//                 <span className={styles.marqueeItem}>
//                 <img className={styles.img} src="/deep-img/ghibli-2.jpeg" alt='' width={200} />
//                 </span>
//                 <span className={styles.marqueeItem}>
//                 <img className={styles.img} src="/deep-img/ghibli-3.jpeg" alt='' width={200} />
//                 </span>
//                 <span className={styles.marqueeItem}>
//                 <img src="https://placehold.co/600x400/purple/white" />
//                 </span>
//                 <span className={styles.marqueeItem}>
//                 <img src="https://placehold.co/600x400/red/white" />
//                 </span>
//                 <span className={styles.marqueeItem}>
//                 <img src="https://placehold.co/600x400/teal/white" />
//                 </span>
//             </div>
//             </div>
//         </div>
//     );
// }
 
// export default HomepageImg;

const Homepage = () => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        var colors = ["red","#6fb936", "#ccc", "#ff9500", 'lightblue'];
        var wrap = gsap.utils.wrap(-200, 800);

        var wrap1 = gsap.utils.wrap(-200, 800);
        
        //initially colorize each box and position in a row
        gsap.set(`.${styles.box}`, {
          backgroundColor: (i) => colors[i % colors.length],
          y: (i) => -100 + i * -200
        });
        gsap.set(`.${styles.box2}`, {
            backgroundColor: (i) => colors[i % colors.length],
            y: (i) => i * 200
          });
        
        
        
        gsap.to(`.${styles.box}`, {
          duration: 15,
          ease: "none",
          y: "-=1000", //move each box 500px to right
          modifiers: {
            y: gsap.utils.unitize(wrap) //force y value to wrap when it reaches -100
          },
          repeat: -1
        });

        gsap.to(`.${styles.box2}`, {
            duration: 15,
            ease: "none",
            // delay: 2,
            y: "+=1000", //move each box 500px to right
            modifiers: {
              y: gsap.utils.unitize(wrap1) //force y value to wrap when it reaches -100
            },
            repeat: -1
          });
        
        
       
        
    }, { scope: ref });
    return ( 
        <div ref={ref} className='flex'>
            <div className={styles.nav}>
                <div className={styles.wrapper}>
                    <div className={styles.boxes}>
                        <div className={styles.box}>
                            <img className={styles.img} src="/deep-img/ghibli-1.jpeg" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box}>
                        <img className={styles.img} src="/deep-img/ghibli-2.jpeg" alt=''  />
                        <div className={styles.layer} />
                        </div>
                        <div className={styles.box}>
                            <img className={styles.img} src="/deep-img/ghibli-3.jpeg" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box}>
                            <img className={styles.img} src="/deep-img/ghibli-4.webp" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box}>
                        <img className={styles.img} src="/deep-img/ghibli-2.jpeg" alt=''  />
                        <div className={styles.layer} />
                        </div>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.boxes}>
                        <div className={styles.box2}>
                            <img className={styles.img} src="/deep-img/ghibli-3.jpeg" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box2}>
                        <img className={styles.img} src="/deep-img/ghibli-4.webp" alt=''  />
                        <div className={styles.layer} />
                        </div>
                        <div className={styles.box2}>
                            <img className={styles.img} src="/deep-img/ghibli-1.jpeg" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box2}>
                            <img className={styles.img} src="/deep-img/ghibli-3.jpeg" alt=''  />
                            <div className={styles.layer} />
                        </div>
                        <div className={styles.box2}>
                        <img className={styles.img} src="/deep-img/ghibli-2.jpeg" alt=''  />
                        <div className={styles.layer} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Homepage;

