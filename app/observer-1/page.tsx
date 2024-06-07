'use client'
import React, { useRef } from 'react'
import styles from './styles.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { find } from 'lodash'

gsap.registerPlugin(Observer);

const Obeserver1 = () => {
    const ref = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        const sections: HTMLDivElement[] = gsap.utils.toArray(`.${styles.slide}`);
        const rootImages: HTMLImageElement[]  = gsap.utils.toArray(`.${styles.image}`);
        const images = rootImages.reverse();
        console.log(sections, images);
        
        const slideImages : HTMLImageElement[] = gsap.utils.toArray(`.${styles.slide_img}`);
        const outerWrappers: HTMLDivElement[] = gsap.utils.toArray(`.${styles.slide_outer}`);
        const innerWrappers: HTMLDivElement[] = gsap.utils.toArray(`.${styles.slide_inner}`);
        const count = document.querySelector(`.${styles.count}`);
        const wrap = gsap.utils.wrap(0, sections.length);
        console.log(count);
        

        let animating : boolean;
        let currentIndex = 0;
        
        // gsap.set(outerWrappers, { xPercent: 100 });
        // gsap.set(innerWrappers, { xPercent: -100 });

        // gsap.set(`.${styles.slide}:nth-of-type(1) .${styles.slide_outer}`, { xPercent: 0 });
        // gsap.set(`.${styles.slide}:nth-of-type(1) .${styles.slide_inner}`, { xPercent: 0 });
        
        function gotoSection(index: number, direction: number) {
            
            
         animating = true;
         index = wrap(index);
         
        
         let tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => {
           animating = false;
          },
         });
        
         let currentSection = sections[currentIndex];
         let heading = currentSection.querySelector(`.${styles.slide_heading}`);
         let nextSection = sections[index];
         let nextHeading = nextSection.querySelector(`.${styles.slide_heading}`);
        
         gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
         gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
         gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });
        
         tl
          .set(count, { textContent: String(index + 1) }, 0.32)
          
          .fromTo(
           outerWrappers[index],
           {
            xPercent: 100 * direction
           },
           { xPercent: 0 },
           0
          )
          .fromTo(
           innerWrappers[index],
           {
            xPercent: -100 * direction
           },
           { xPercent: 0 },
           0
          )
          .to(
           heading,
           {
            "--width": 800,
            xPercent: 30 * direction
           },
           0
          )
          .fromTo(
           nextHeading,
           {
            "--width": 800,
            xPercent: -30 * direction
           },
           {
            "--width": 200,
            xPercent: 0
           },
           0
          )
          .fromTo(
           images[index],
           {
            xPercent: 125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
           },
           { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
           0
          )
          .fromTo(
           images[currentIndex],
           { xPercent: 0, scaleX: 1, scaleY: 1 },
           {
            xPercent: -125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
           },
           0
          )
          .fromTo(
           slideImages[index],
           {
            scale: 2
           },
           { scale: 1 },
           0
          )
          .timeScale(0.8);
        
         currentIndex = index;
        }
        
        Observer.create({
            type: "wheel,touch,pointer",
            preventDefault: true,
            wheelSpeed: -1,
            onUp: () => {
            if (animating) return;
            gotoSection(currentIndex + 1, +1);
            },
            onDown: () => {
            if (animating) return;
            gotoSection(currentIndex - 1, -1);
            },
            tolerance: 10
        });
        
        document.addEventListener("keydown", logKey);
        
        function logKey(e: KeyboardEvent) {
         if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
          gotoSection(currentIndex - 1, -1);
         }
         if (
          (e.code === "ArrowDown" ||
           e.code === "ArrowRight" ||
           e.code === "Space" ||
           e.code === "Enter") &&
          !animating
         ) {
          gotoSection(currentIndex + 1, 1);
         }
        }
        
    }, {scope: ref})
    return (
        <div ref={ref} className={styles.container}>
            <section className={styles.slide}>
                <div className={styles.slide_outer}>
                    <div className={styles.slide_inner}>
                        <div className={styles.slide_content}>
                            <div className={styles.slide_container}>
                                <h2 className={styles.slide_heading}>SCROLL</h2>
                                <figure className={styles.slide_img_cont}>
                                    <img className={styles.slide_img} src='https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400' alt='' />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<section className={styles.slide}>
 <div className={styles.slide_outer}>
  <div className={styles.slide_inner}>
   <div className={styles.slide_content}>
    <div className={styles.slide_container}>
     <h2 className={styles.slide_heading}>SWIPE</h2>
     <figure className={styles.slide_img_cont}>
      <img className={styles.slide_img} src='https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400' alt='' />
     </figure>
    </div>
   </div>
  </div>
 </div>
</section>

<section className={styles.slide}>
 <div className={styles.slide_outer}>
  <div className={styles.slide_inner}>
   <div className={styles.slide_content}>
    <div className={styles.slide_container}>
     <h2 className={styles.slide_heading}>SCROLL</h2>
     <figure className={styles.slide_img_cont}>
      <img className={styles.slide_img} src='https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400' alt='' />
     </figure>
    </div>
   </div>
  </div>
 </div>
</section>

<section className={styles.slide}>
 <div className={styles.slide_outer}>
  <div className={styles.slide_inner}>
   <div className={styles.slide_content}>
    <div className={styles.slide_container}>
     <h2 className={styles.slide_heading}>SWIPE</h2>
     <figure className={styles.slide_img_cont}>
      <img className={styles.slide_img} src='https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400' alt='' />
     </figure>
    </div>
   </div>
  </div>
 </div>
</section>

            <section className={styles.overlay}>
                <div className={styles.overlay_content}>
                    <p className={styles.overlay_count}>0<span className={styles.count}>1</span></p>
                    <figure className={styles.overlay_img_cont}>
                        <img className={styles.image} src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800" />
                        <img className={styles.image} src="https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800" />
                        <img className={styles.image} src="https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800" />
                        <img className={styles.image} src="https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800" />
                    </figure>
                </div>
            </section>
        </div>
    );
}
 
export default Obeserver1;