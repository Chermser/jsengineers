// Mobile menu
const navToggle = document.querySelector(".navToggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when a link is clicked
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Active nav link on scroll
const sections = ["services","work","process","about","testimonials","contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".nav__link"))
  .filter(a => a.getAttribute("href")?.startsWith("#"));

const setActive = () => {
  const y = window.scrollY + 120;
  let currentId = null;

  for (const sec of sections) {
    if (sec.offsetTop <= y) currentId = sec.id;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute("href").slice(1);
    a.classList.toggle("is-active", href === currentId);
  });
};

window.addEventListener("scroll", setActive);
setActive();

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Portfolio filtering
const chips = document.querySelectorAll(".chip");
const projects = document.querySelectorAll(".project");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    projects.forEach(p => {
      const cat = p.dataset.category;
      const show = filter === "all" || cat === filter;
      p.style.display = show ? "" : "none";
    });
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lbImg = document.querySelector(".lightbox__img");
const lbCap = document.querySelector(".lightbox__cap");
const lbClose = document.querySelector(".lightbox__close");

const openLightbox = (src, cap) => {
  lbImg.src = src;
  lbImg.alt = cap || "Project image";
  lbCap.textContent = cap || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
};

projects.forEach(p => {
  p.addEventListener("click", () => {
    const img = p.querySelector("img");
    const title = p.querySelector("strong")?.textContent || "Project";
    const meta = p.querySelector("span")?.textContent || "";
    openLightbox(img.src, `${title} — ${meta}`);
  });
});

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Contact form (front-end only)
const form = document.getElementById("quoteForm");
const formNote = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // You can connect this to a backend later.
    // For now, we show a confirmation message.
    formNote.textContent = "✅ Request received. We’ll contact you shortly (or message us on WhatsApp for a faster reply).";
    form.reset();
  });
}
