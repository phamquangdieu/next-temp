import React from 'react'
// import styles from './styles.module.css'

const p1 = `gsap.to(".box-1", {
    y: -130,
    duration: 2,
    ease: "elastic",
    scrollTrigger: {
        trigger: ".box-1",
        containerAnimation: scrollTween,
        start: "left center",
        toggleActions: "play none none reset"
    }
});`

const p2 = `ScrollTrigger.create({
    trigger: ".box-3",
    containerAnimation: scrollTween,
    toggleclassName: "active",
    start: "center 60%"
});`

const p3 = `ScrollTrigger.create({
    trigger: ".green",
    containerAnimation: scrollTween,
    start: "center 65%",
    end: "center 51%",
    onEnter: () => console.log("enter"),
    onLeave: () => console.log("leave"),
    onEnterBack: () => console.log("enterBack"),
    onLeaveBack: () => console.log("leaveBack"),
    onToggle: self => console.log("active", self.isActive)
});`
const HorizontalScroll2 = () => {
    return (
        <>
        <div className="introduction">
            <div className='uppercase hello'> Hello WORLD!!</div>
            <div className='box-1 w-24 h-24 border-2 border-yellow-200 text-sm opacity-0'>BOX-1</div>
            <div className='box-2 w-24 h-24 border-2 border-red-200 text-sm'>BOX-2</div>
            <div className='box-1 w-24 h-24 border-2 border-yellow-200 text-sm opacity-0'>BOX-1</div>
        </div>
        <div id="container">
                <div className="module dark">
                    <img alt='' src='/img-2.jpeg' width={300} className='box-1 object-cover' />
                </div>
                <div className="module white">
                <img alt='' src='/img-2.jpeg' width={300} className='box-2 object-cover' />
                </div>
                <div className="module blue">
                <img alt='' src='/img-2.jpeg' width={300} className='box-3 object-cover' />
                </div>
                <div className="module orange">
                <img alt='' src='/img-2.jpeg' width={300} className='box-4 object-cover' />
                </div>
                <div className="module dark">
                    <img alt='' src='/img-2.jpeg' width={300} className='box-5 object-cover' />
                </div>
                <div className="module white">
                <img alt='' src='/img-2.jpeg' width={300} className='box-6 object-cover' />
                </div>
                <div className="module blue">
                <img alt='' src='/img-2.jpeg' width={300} className='box-7 object-cover' />
                </div>
                <div className="module orange">
                <img alt='' src='/img-2.jpeg' width={300} className='box-8 object-cover' />
                </div>
                <div className="module dark">
                    <img alt='' src='/img-2.jpeg' width={300} className='box-9 object-cover' />
                </div>
                <div className="module white">
                <img alt='' src='/img-2.jpeg' width={300} className='box-10 object-cover' />
                </div>
                <div className="module blue">
                <img alt='' src='/img-2.jpeg' width={300} className='box-11 object-cover' />
                </div>
                <div className="module orange">
                <img alt='' src='/img-2.jpeg' width={300} className='box-12 object-cover' />
                </div>
            </div>
            <div className="introduction"> Bye Gsap</div>
            </>
    );
}
 
export default HorizontalScroll2   ;