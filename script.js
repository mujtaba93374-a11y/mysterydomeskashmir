// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if(loader) loader.style.display = "none";
});

// Navbar Toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Counters
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  counter.innerText = "0+";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    let current = +counter.innerText.replace("+","");
    const increment = target / 200; // slower speed

    if(current < target){
      current += increment;
      counter.innerText = Math.ceil(current) + "+";
      setTimeout(updateCounter, 60);
    } else {
      counter.innerText = target + "+";
    }
  };

  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      updateCounter();
      observer.unobserve(counter);
    }
  }, { threshold: 0.5 });
  observer.observe(counter);
});

// Gallery Zoom
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.9)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.cursor = "zoom-out";
    overlay.style.zIndex = 9999;

    const img = document.createElement("img");
    img.src = item.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "12px";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  });
});

// Testimonials Slider
const track = document.getElementById("testimonialsTrack");
const nextBtn = document.querySelector(".t-btn.next");
const prevBtn = document.querySelector(".t-btn.prev");
let index = 0;

const showTestimonials = () => {
  const width = track.children[0].offsetWidth + 12; // include gap
  track.style.transform = `translateX(${-index * width}px)`;
}

nextBtn.addEventListener("click", () => {
  if(index < track.children.length - 3) index++;
  else index = 0;
  showTestimonials();
});

prevBtn.addEventListener("click", () => {
  if(index > 0) index--;
  else index = track.children.length - 3;
  showTestimonials();
});

// Auto Slide every 4s
setInterval(() => {
  if(index < track.children.length - 3) index++;
  else index = 0;
  showTestimonials();
}, 4000);

// Smooth scrolling for nav links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    if(nav.classList.contains("open")) nav.classList.remove("open");
  });
});
