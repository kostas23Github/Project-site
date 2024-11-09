/**
 * Animation of navbar's logo(K character) using GSAP library. 
*/

const logo = document.querySelector(".k-container > img");
const logoTooltip = document.querySelector(".k-container > #k-tooltip");


const initialAnimation = gsap.timeline({ repeat: -1, repeatDelay: 5 })
.to(logo, {scale: 0.5, duration: 0.1}, 1)
.to(logo, {scale: 2, duration: .1})
.to(logo, {scale: 1, duration: .1})
.to(logoTooltip, {opacity: 1, delay: .1})
.to(logoTooltip, {opacity: 0, duration: .1, delay: 1.5});


const animation = function () {
  const parent = document.querySelector(".logo-container");
  const parentWidth = parent.offsetWidth; // Width of logo-container.

  let siblingHeight = document.querySelector(
    ".logo-container > span"
  ).offsetHeight; // Height of sibling text elem.

  let verticalMove = siblingHeight;

  // On mobile devices, the above space(padding) is smaller so I shorten the vertical movement distance.
  if (window.innerWidth <= 500) verticalMove = siblingHeight - 5;

  let tl = gsap.timeline(); // Initialize timeline.

  // Create rotation animations.
  tl.to(
    logo,
    {
      // The leaning forward motion.
      rotation: 5,
      duration: 0.2,
      ease: "power1.inOut",
      repeat: 27,
      yoyo: true,
    },
    0
  )
    .to(
      logo,
      {
        // The leaning backward motion.
        rotation: -5,
        duration: 0.2,
        ease: "power1.inOut",
        repeat: 27,
        yoyo: true,
      },
      0.2 // Starts when the first leaning forward motion is finished.
    )
    .to(
      logo,
      {
        // When all previous rotation animations have finished it levels(rotates to 0).
        rotation: 0,
        duration: 0.2,
      },
      5.6
    );
  // Add to the timeline the moving motions, (x:0, y:0 is the starting position).
  tl.to(logo, { y: -verticalMove, duration: 0.5 }, 0) // Starts at time = 0(at the start of the animation), moves up.
    .to(logo, { x: parentWidth, duration: 5 }, 0.5) // Moves to the right.
    .to(logo, { y: 0, duration: 0.5 }, 5.5) // Moves down.
    .to(
      logo, // These last 3 animations perform the jerk motion.
      {
        x: parentWidth - verticalMove / 2,
        duration: 0.2,
        ease: "elastic.out(2, 0.3)", // Bouncing effect
      },
      6
    )
    .to(logo, { x: parentWidth + 6, duration: 0.2 }, 6.5)
    .to(
      parent,
      { x: -siblingHeight - 6, duration: 0.5, ease: "power1.in" },
      6.1
    ) // The -6 is the gap value
    .add(() => {
      logoTooltip.textContent = "Thanks!";
    })
    .to(logoTooltip, { x: parentWidth })
    .to(logoTooltip, {opacity: 1})
    .to(logoTooltip, {opacity: 0, delay: 1});
};

// Execute listener once!
logo.addEventListener("mouseover", () => {
  logoTooltip.style.opacity = 0;
  initialAnimation.kill();
  animation();
}, { once: true });