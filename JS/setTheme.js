/**
 * Set document's theme
 *
 * setTheme -> Event handler for user theme change.
 * (function) -> Immediately Invoked Function Expression, or IIFE to check if local storage has a user preference and update theme.
 *
*/

const sunBtn = document.getElementById("light-mode-btn");
const moonBtn = document.getElementById("dark-mode-btn");

function setTheme(theme) {
  // Toggle current theme value.
  const newTheme = theme === "dark" ? "light" : "dark";

  // Set html theme.
  document.documentElement.setAttribute("data-theme", newTheme);

  // Save current theme state, to keep its value even on page load.
  localStorage.setItem("theme", newTheme);

  // Update logo & profile img.
  document.querySelector(
    ".k-container > img"
  ).src = `./assets/icons/Logo_${newTheme}.png`;
  document.querySelector(
    ".profile-img-container > img"
  ).src = `./assets/profile_pic_${newTheme}.png`;

  // Update theme-btns.
  sunBtn.classList.toggle("visible");
  sunBtn.animate(
    [
      {
        transform: "rotate(360deg)",
      },
    ],
    { duration: 400 }
  );
  moonBtn.classList.toggle("visible");
  moonBtn.animate(
    [
      {
        transform: "rotate(360deg)",
      },
    ],
    { duration: 400 }
  );
}

// Executes on load & checks for saved theme or system preference.
(function () {
  // Retrieve theme value.
  const savedTheme = localStorage.getItem("theme");

  // If a stored theme exists.
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    if (savedTheme === "dark") {
      // Update UI
      moonBtn.classList.add("visible");
      sunBtn.classList.remove("visible");
      document.querySelector(
        ".k-container > img"
      ).src = `./assets/icons/Logo_dark.png`;
      document.querySelector(
        ".profile-img-container > img"
      ).src = `./assets/profile_pic_dark.png`;
    }
    // Check user color theme preference
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Update UI
    document.documentElement.setAttribute("data-theme", "dark");
    moonBtn.classList.add("visible");
    sunBtn.classList.remove("visible");

    document.querySelector(
      ".k-container > img"
    ).src = `./assets/icons/Logo_dark.png`;
    document.querySelector(
      ".profile-img-container > img"
    ).src = `./assets/profile_pic_dark.png`;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    moonBtn.classList.remove("visible");
    sunBtn.classList.add("visible");
  }

  if (savedTheme === "light") {
    moonBtn.classList.remove("visible");
    sunBtn.classList.add("visible");
  } else if (savedTheme === "dark") {
    moonBtn.classList.add("visible");
    sunBtn.classList.remove("visible");
  }
})();

sunBtn.addEventListener("click", () => setTheme("light"));
moonBtn.addEventListener("click", () => setTheme("dark"));
