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

// Event handler on-page load/resize. Updates carousel values.
function getValues() {
  let slideWidth = slides[0].offsetWidth;
  let slidesGap = parseInt(window.getComputedStyle(carouselSlides).gap, 10);
  let slideInterval = slideWidth + slidesGap;
  carouselSlides.scrollTo({ left: 0 });

  return slideInterval;
}

// Get new values.
let slideInterval = getValues();
window.addEventListener("resize", () => (slideInterval = getValues()));

// Scrolls carousel
function scrollToSlide(index) {
  const scrollPosition = slideInterval * index;
  carouselSlides.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });
}

let currentSlide = 0;
// Go to next slide
btnNext.addEventListener("click", () => {
  const containerRightPos =
    carouselSlides.getBoundingClientRect().left +
    carouselSlides.getBoundingClientRect().width;
  const lastSlideRightPos =
    slides[slides.length - 1].getBoundingClientRect().left +
    slides[slides.length - 1].getBoundingClientRect().width;

    // With a 10px buffer for large mobile screens.
  const noMoreSlides = containerRightPos > lastSlideRightPos - 10;
console.log(containerRightPos, lastSlideRightPos);

  // Determine current slide if user has scrolled based on the scrolled position of the carousel.
  currentSlide = Math.floor(carouselSlides.scrollLeft / slideInterval);

  // This condition is valid only if one slide is visible at a time
  if (currentSlide < slides.length - 1) {
    if (noMoreSlides) {
      // Case where carousel shows more than one slides at a time.
      currentSlide = 0;
    } else {
      currentSlide++;
    }
  } else {
    currentSlide = 0;
  }
  scrollToSlide(currentSlide);
});

btnPrev.addEventListener("click", () => {
  currentSlide = Math.ceil(carouselSlides.scrollLeft / slideInterval);

  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  scrollToSlide(currentSlide);
});
