/**
 * Carousel functionality
 *
 * Get DOM Elements
 * Perform size calculations
 * Next Slide Listener
 * Previous Slide Listener
 */

// Carousel parent.
const carouselContainer = document.querySelector(".carousel-container");

// Get carousel slides array.
const slides = Array.from(document.querySelectorAll(".slide"));

// Get the elem containing ALL carousel items.
const carouselSlides = document.querySelector(".carousel-slides");

// Carousel buttons.
const btnNext = document.querySelector(".ctrl-next");
const btnPrev = document.querySelector(".ctrl-prev");

// Get width of a slide elem.
let slideWidth = slides[0].getBoundingClientRect().width;

// The number of slides
const lastIndex = slides.length - 1;

// Gap between slides.
let slidesGap = parseInt(window.getComputedStyle(carouselSlides).gap, 10);

// Total gap distance, multiply each gap with the number of slides
let slidesTotalGap = slidesGap * lastIndex;

// Width of the carousel parent container.
let carContWidth = carouselContainer.getBoundingClientRect().width;

// Compute the combined width of all slides & their gaps.
let slidesWidth = slideWidth * slides.length + slidesTotalGap;

// Disable carousel when all items are visible.
if (carContWidth > slidesWidth) {
  btnNext.disabled = true;
  btnPrev.disabled = true;
} else {
  btnNext.disabled = false;
  btnPrev.disabled = false;
}

// Get the leftmost position of the carousel parent container.
let carContLeftPos = carouselContainer.getBoundingClientRect().left;

// Get current time, to prevent fast clicks.
let currentTimeC = Date.now();

btnNext.addEventListener("click", () => {
  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeC < 600) return;

  // Update time for future clicks
  currentTimeC = Date.now();

  // Get the rightmost position of the elem based on the viewport by adding to its left position its width value.
  const carContRightPos = carContLeftPos + carContWidth;

  // Get the rightmost position of the last arr elem(slide). This is needed to reset the carousel when the last slide comes into view & the forward btn is pressed.
  let lastSlideRightPos =
    slides[lastIndex].getBoundingClientRect().left + slideWidth;

  // While last elem of the slides arr is more to the right of the carousel container keep pushing all slides to the left, else reset!
  // Or else if the last elem of the arr is not visible push slides to the left until it is. The value the carousel is pushed is the width of the slide + the gap margin.

  if (carContRightPos < lastSlideRightPos) {
    carouselSlides.style.transform += `translateX(-${
      slideWidth + slidesGap
    }px)`;
  } else {
    carouselSlides.style.transform = `translateX(0px)`;
  }

  // Update last slide's most right position, for when the btn is clicked again.
  lastSlideRightPos =
    slides[lastIndex].getBoundingClientRect().left + slideWidth + 10;
});

btnPrev.addEventListener("click", () => {
  // 600ms is the translateX transition, so I need to stop clicks if the transition hasn't finished.
  if (Date.now() - currentTimeC < 600) return;

  // Update time for future clicks
  currentTimeC = Date.now();

  // Update the leftmost position of the carousel parent container.
  carContLeftPos = carouselContainer.getBoundingClientRect().left;

  // Get the leftmost position of the first slide. This is needed to reset the carousel when the first elem comes into view & the previous btn is pressed.
  let firstSlideLeftPos = slides[0].getBoundingClientRect().left;

  // While first elem of the slides arr is more to the left of the carousel container keep pushing right, else move all slides the width of the container + the right padding.
  if (carContLeftPos > firstSlideLeftPos) {
    carouselSlides.style.transform += `translateX(${slideWidth + slidesGap}px)`;
  } else {
    // Move the carousel to the end of the slides. The total distance of the slides minus the one already in view.
    carouselSlides.style.transform = `translateX(${
      -slidesWidth + slideWidth
    }px)`;
  }

  // Update last slide's most right position.
  firstSlideLeftPos = slides[0].getBoundingClientRect().left;
});

window.addEventListener("resize", () => {
  carouselSlides.style.transform = `translateX(0px)`;
});
