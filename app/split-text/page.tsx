'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'
import SplitType from 'split-type'


gsap.registerPlugin(ScrollTrigger);

// const myTexts = new SplitText('.text-test', { type: 'chars'});
// const chars = myTexts.chars;


const SpitText = () => {
    const ref = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        
        var split = new SplitType(".text-test", {types: "chars"});
        
        gsap.set(split.chars, { yPercent: 100 })
        //now animate each character into place from 100px above, fading in:
        function activeScroll () {
            gsap.to(split.chars, {
                duration: 1, 
                yPercent: -100,
                opacity: 0,
                stagger: {
                    from: 'center',
                    ease: 'linear',
                    amount: 0.5
                },
                scrollTrigger: {
                    trigger: '.text-test',
                    start: 'top top',
                    end: 0,
                    scrub: 1,
                    markers: true
                },
            })
        }
        gsap.to(split.chars, {
            duration: 0.5, 
            yPercent: 0, 
            ease: "linear",
            visibility: 'visible',
            stagger: {
                from: 'center',
                ease: 'power1.out',
                amount: 0.5
            },
            onComplete: activeScroll
        });

        
    },
    { scope: ref })
    return (
        <>
        <div className='h-[100vh]'>
            <div className='container flex text-center justify-center' ref={ref}>
                <div
                    style={{ fontFamily: 'sans-serif', 'WebkitTextFillColor': 'transparent', 'WebkitTextStrokeColor': '#8b7a27', 'WebkitTextStrokeWidth': 2}}
                    className='text-[#8b7a27] text-test uppercase text-[4rem] font-bold p-10 invisible fill'>
                    Hello world!!
                </div>
            </div>
        </div>
        <div className='h-[100vh]'>hello</div>
        </>
    );
}
 
export default SpitText;