'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'
import styles from './styles.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MenuScroll = () => {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.set(`.${styles.content}:not(.${styles.initial})`, { autoAlpha: 0 })
    var headlines : HTMLDivElement[] = gsap.utils.toArray(`.${styles.text}`);
 
    
    var totalDuration = 500;
    var singleDuration = totalDuration / headlines.length;
    
    const lineTimeline = gsap.timeline();
    
    ScrollTrigger.create({    
      trigger: `.${styles.pinUp}`,
      start: "top top",
      end: "+=" + totalDuration,
      markers: true,
      pin: true,
      scrub: true,
      animation: lineTimeline,
    });
    
    lineTimeline
    .to(`.${styles.sideline}`, { duration: 1 }, 0)
    .to(`.${styles.sideline}`, { duration: 0.9, scaleY: 1, ease: "none" }, 0)
    
    
    
    
    
    headlines.forEach((elem , i) => {    
      
      const smallTimeline = gsap.timeline(); 
        
      const content = document.querySelector(`.${styles.contentWrap}`);
      const relevantContent = content?.querySelector(`span.content-` + i);  
      console.log(content, relevantContent);
      
      ScrollTrigger.create({    
        
        trigger: ".wrapper",
            
        start: "top -=" + ( singleDuration * i ),
        end: "+=" + singleDuration,
        
        //markers: true,
    
        animation: smallTimeline,
        toggleActions: relevantContent?.classList.contains(`${styles.remaining}`) ? "play none play reverse" : "play reverse play reverse",
        
      });
      if (relevantContent) {
        smallTimeline 
        .to(elem , { duration: 0.25, color: "orange", scale: 1.25, ease: 'none' }, 0) 
        .set(relevantContent, { autoAlpha: 1 }, 0.1)
      ;
      }
      
     
    });
    
    
    // -------------------------------------------------------------------------------------------------------------
    
    
    var showYowza = gsap.timeline()
        showYowza.to(`.${styles.below} span`, { autoAlpha: 1, y: 0 })
    
    ScrollTrigger.create({    
        trigger: `.${styles.below}`,
        start: "top center",
    
        //endTrigger: ".footer",
        end: "bottom bottom",
    
        //scrub: 1,
    
        //markers: true,
        animation: showYowza,
    
        toggleActions: "none play none reverse"
        //toggleActions: "play reverse play reverse"
    });
  },
  { scope: container});
  return (
    <div ref={container} className={styles.container}>
      <div className={styles.spacer}>
        <span>Start Scrolling!</span>
      </div>

      <div className="wrapper">
        <div className={styles.pinUp}>
          
          <div className={styles.contentWrap}>
            <span className={`${styles.content} content-0 ${styles.initial}`}>Greensock</span>
            <span className={`${styles.content} content-1`}>ScrollTrigger</span>
            <span className={`${styles.content} content-2`}>Creativity</span>
            <span className={`${styles.content} content-3`}>Versatility</span>
            <span className={`${styles.content} content-4 ${styles.remaining}`}>Awesomeness</span>
          </div>  
          
          
            <div className={styles.sideline}></div>
          
          
          <div className={styles.textWrap}>
            <div className={styles.text}>Greensock</div>
            <div className={styles.text}>ScrollTrigger</div>
            <div className={styles.text}>Creativity</div>
            <div className={styles.text}>Versatility</div>
            <div className={styles.text}>Awesomeness</div>  
          </div>
          
        </div>
      </div>


      <div className={styles.below}>
        <span>Yowza!</span>
      </div>  


      <div className={styles.footer}>
        <span>Nothing to see here!</span>
      </div>  

    </div>
  );
}
 
export default MenuScroll;