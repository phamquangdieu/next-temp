gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel1");
console.log(sections);

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#test1",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector("#test1").offsetWidth
  }
});