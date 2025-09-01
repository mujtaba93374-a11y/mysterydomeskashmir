// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

// Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ================= COUNTERS =================
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  counter.innerText = "0+";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    let current = +counter.innerText.replace("+", "");
    const increment = Math.ceil(target / 200); // smoother & slower

    if (current < target) {
      current += increment;
      counter.innerText = current + "+";
      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = target + "+";
    }
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      updateCounter();
      observer.unobserve(counter);
    }
  }, { threshold: 0.5 });

  observer.observe(counter);
});

// ================= SLIDER FUNCTION =================
function createSlider(trackId, prevBtnClass, nextBtnClass) {
  const track = document.getElementById(trackId);
  const prevBtn = document.querySelector(prevBtnClass);
  const nextBtn = document.querySelector(nextBtnClass);
  let index = 0;

  const showSlides = () => {
    let itemsToShow = window.innerWidth > 768 ? 3 : 1; // 3 for desktop, 1 for mobile
    const width = track.children[0].offsetWidth + 16; // include margin/gap
    track.style.transform = `translateX(${-index * width}px)`;
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let itemsToShow = window.innerWidth > 768 ? 3 : 1;
      if (index < track.children.length - itemsToShow) index++;
      else index = 0;
      showSlides();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let itemsToShow = window.innerWidth > 768 ? 3 : 1;
      if (index > 0) index--;
      else index = track.children.length - itemsToShow;
      showSlides();
    });
  }

  // Auto-slide every 4s
  setInterval(() => {
    let itemsToShow = window.innerWidth > 768 ? 3 : 1;
    if (index < track.children.length - itemsToShow) index++;
    else index = 0;
    showSlides();
  }, 4000);

  window.addEventListener("resize", showSlides);
  showSlides();
}

// Apply slider to Our Team
createSlider("teamTrack", ".team-btn.prev", ".team-btn.next");

// Apply slider to Gallery
createSlider("galleryTrack", ".gallery-btn.prev", ".gallery-btn.next");

// ================= SMOOTH SCROLL =================
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    if (nav.classList.contains("open")) nav.classList.remove("open");
  });
});
// Testimonials Slider
const track = document.getElementById("testimonialsTrack");
const nextBtn = document.querySelector(".t-btn.next");
const prevBtn = document.querySelector(".t-btn.prev");
let tIndex = 0;

const showTestimonials = () => {
  const cardWidth = track.children[0].offsetWidth + 16; // include gap
  track.style.transform = `translateX(${-tIndex * cardWidth}px)`;
};

// Next button
nextBtn.addEventListener("click", () => {
  if (tIndex < track.children.length - 1) {
    tIndex++;
  } else {
    tIndex = 0;
  }
  showTestimonials();
});

// Prev button
prevBtn.addEventListener("click", () => {
  if (tIndex > 0) {
    tIndex--;
  } else {
    tIndex = track.children.length - 1;
  }
  showTestimonials();
});

// Auto slide every 4s
setInterval(() => {
  if (tIndex < track.children.length - 1) {
    tIndex++;
  } else {
    tIndex = 0;
  }
  showTestimonials();
}, 4000);
