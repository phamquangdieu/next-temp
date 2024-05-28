gsap.registerPlugin(ScrollTrigger);

let container = document.getElementById("container");
let sections = document.querySelectorAll('.module')
let texts = document.querySelectorAll('h1')
let imgs = document.querySelectorAll('img')
// console.log(-(container.scrollWidth - container.clientWidth));
let scrollTween = gsap.to(container, {
  //xPercent: -100 * (sections.length - 1),
  x: -2720,
  ease: "none", // <-- IMPORTANT!
  scrollTrigger: {
    trigger: container,
    start: "top top",
    // end: 3000,
    pin: true,
    scrub: 0.5,
    marker: true,
  },
});   
        // texts.forEach(text =>{
        //     gsap.to(text, {
        //         rotate: 360,
        //         duration: 1,
        //         scrollTrigger: {
        //             trigger: text,
        //             // markers: true,
        //             start: 'right center',
        //             containerAnimation: scrollTween,
        //             toggleActions: 'play none none reverse'
        //         }
        //     })
        // })

        imgs.forEach((img, index) =>{
          gsap.from(`.box-${index + 1}`, {
            y: index % 2 === 0 ? -50 : 50,
            backgroundColor: "#1e90ff",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: `.box-${index + 1}`,
              containerAnimation: scrollTween,
              start: "left center",
              end: "center 20%",
              scrub: true
            }
          });
        })

        var tl = gsap.timeline({repeat: 2, repeatDelay: 1});
        tl.to(".box-1", {
          y: -130,
          duration: 2,
          ease: "none",
          opacity: 1,
        });
        tl.to(".box-1", {
          y: -130,
          duration: 1,
          ease: "none",
          opacity: 0,
        });

        tl.to(".box-2", {
          y: -120,
          backgroundColor: "#1e90ff",
          ease: "none",
          opacity: 0,
        });
        // tl.reversed(!tl.reversed());
        // gsap.to(".box-3", {
        //   y: 100,
        //   backgroundColor: "#1e90ff",
        //   ease: "none",
        //   scrollTrigger: {
        //     trigger: ".box-3",
        //     containerAnimation: scrollTween,
        //     start: "top 50%",
        //     end: "center 20%",
        //     scrub: true
        //   }
        // });
        // gsap.to(".box-4", {
        //   y: -120,
        //   backgroundColor: "#1e90ff",
        //   ease: "none",
        //   scrollTrigger: {
        //     trigger: ".box-3",
        //     containerAnimation: scrollTween,
        //     // start: "left -30%",
        //     // end: "center 20%",
        //     scrub: true,
        //     markers: true,
        //   }
        // });