'use strict';

/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

/**
 * HEADER ANIMATION
 * When scrolled down to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;
  currentSlidePos = slideEnd ? 0 : currentSlidePos + 1;
  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  currentSlidePos = currentSlidePos <= 0 ? totalSlidableItems : currentSlidePos - 1;
  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
  moveSliderItem();
});
/**
 * Subscribe functionality
 */

// // Get elements
// const subscribeBtn = document.getElementById('subscribe-btn');
// const emailInput = document.getElementById('email-input');
// const subscribeMsg = document.getElementById('subscribe-msg');

// // Add click event listener to the Subscribe button
// subscribeBtn.addEventListener('click', async (event) => {
//   // Prevent form submission if it's inside a form
//   event.preventDefault();

//   const email = emailInput.value.trim();

//   // Validate the email input
//   if (email === '') {
//     subscribeMsg.textContent = 'Please enter your email address.';
//     subscribeMsg.style.color = 'red';
//     subscribeMsg.classList.remove('hidden');
//     return;
//   }

//   // Simple email format validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//     subscribeMsg.textContent = 'Please enter a valid email address.';
//     subscribeMsg.style.color = 'red';
//     subscribeMsg.classList.remove('hidden');
//     return;
//   }

//   // Send the subscription request to the backend
//   try {
//     const response = await fetch('http://localhost:5005/api/subscribe', { // Make sure to match the backend endpoint
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });

//     if (response.ok) {
//       const result = await response.json();
//       subscribeMsg.textContent = result.message || "Subscribed successfully!";
//       subscribeMsg.style.color = 'green';
//     } else {
//       const errorResult = await response.json();
//       subscribeMsg.textContent = errorResult.message || "Failed to subscribe. Please try again.";
//       subscribeMsg.style.color = 'red';
//     }

//     subscribeMsg.classList.remove('hidden');
//     emailInput.value = ''; // Clear the input field after subscribing

//     // Optional: Hide the message after a few seconds
//     setTimeout(() => {
//       subscribeMsg.classList.add('hidden');
//     }, 3000);
//   } catch (error) {
//     console.error("Error:", error);
//     subscribeMsg.textContent = "An error occurred. Please try again later.";
//     subscribeMsg.style.color = 'red';
//     subscribeMsg.classList.remove('hidden');
//   }
// });

/**
 * Subscribe functionality for both buttons (including anchor tag)
 */

// Get elements for both buttons
const subscribeBtn = document.getElementById('subscribe-btn');
const subscribeButton = document.getElementById('subscribe-button');
const emailInput = document.getElementById('email-input');
const subscribeMsg = document.getElementById('subscribe-msg');

// Function to handle subscription
async function handleSubscription(event) {
  event.preventDefault(); // Prevent form submission or navigation (in the case of anchor tag)

  const email = emailInput.value.trim();

  // Validate the email input
  if (email === '') {
    subscribeMsg.textContent = 'Please enter your email address.';
    subscribeMsg.style.color = 'red';
    subscribeMsg.classList.remove('hidden');
    return;
  }

  // Simple email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    subscribeMsg.textContent = 'Please enter a valid email address.';
    subscribeMsg.style.color = 'red';
    subscribeMsg.classList.remove('hidden');
    return;
  }

  // Send the subscription request to the backend
  try {
    const response = await fetch('https://backendblog6.onrender.com/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const result = await response.json();
      subscribeMsg.textContent = result.message || "Subscribed successfully!";
      subscribeMsg.style.color = 'green';
    } else {
      const errorResult = await response.json();
      subscribeMsg.textContent = errorResult.message || "Failed to subscribe. Please try again.";
      subscribeMsg.style.color = 'red';
    }

    subscribeMsg.classList.remove('hidden');
    emailInput.value = ''; // Clear the input field after subscribing

    // Optional: Hide the message after a few seconds
    setTimeout(() => {
      subscribeMsg.classList.add('hidden');
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
    subscribeMsg.textContent = "An error occurred. Please try again later.";
    subscribeMsg.style.color = 'red';
    subscribeMsg.classList.remove('hidden');
  }
}

// Add event listeners for both the button and the anchor tag
subscribeBtn.addEventListener('click', handleSubscription);
subscribeButton.addEventListener('click', handleSubscription);




/**
 * Handle Sign In
 */
const signinBtn = document.getElementById('signin-btn');
const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinMsg = document.getElementById('signin-msg');

signinBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = signinEmail.value;
  const password = signinPassword.value;

  const response = await fetch('https://backendblog6.onrender.com/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    signinMsg.textContent = data.message;
    signinMsg.style.color = 'green';
    localStorage.setItem('token', data.token);
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('signout-btn').classList.remove('hidden');
  } else {
    signinMsg.textContent = data.message;
    signinMsg.style.color = 'red';
  }
});

/**
 * Handle Sign Up
 */
const signupBtn = document.getElementById('signup-btn');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupMsg = document.getElementById('signup-msg');

signupBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = signupEmail.value;
  const password = signupPassword.value;

  const response = await fetch('https://backendblog6.onrender.com/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    signupMsg.textContent = data.message;
    signupMsg.style.color = 'green';
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('signin-form').classList.remove('hidden');
  } else {
    signupMsg.textContent = data.message;
    signupMsg.style.color = 'red';
  }
});

/**
 * Handle Sign Out
 */
const signoutBtn = document.getElementById('signout-btn');
signoutBtn.addEventListener('click', async () => {
  const response = await fetch('https://backendblog6.onrender.com/api/auth/signout', {
    method: 'POST',
  });

  if (response.ok) {
    localStorage.removeItem('token');
    document.getElementById('signin-form').classList.remove('hidden');
    signoutBtn.classList.add('hidden');
  }
});

const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login'; // Redirect to login if not authenticated
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirect to login after logout
}

function logout() {
  // Clear any stored session or authentication tokens
  localStorage.removeItem('authToken'); // Example if you're using localStorage
  sessionStorage.clear();

  // Redirect to the login page
  window.location.href = 'index.html'; // Assuming 'index.html' is the login page
}

