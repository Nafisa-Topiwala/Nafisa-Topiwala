/*========================================================
                GLASS NAVIGATION
========================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/*========================================================
                MASONRY GALLERY
========================================================*/

const grid = document.querySelector(".gallery");

function resizeGalleryItem(item) {
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"),
  );

  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("gap"),
  );

  const img = item.querySelector("img");

  const rowSpan = Math.ceil(
    (img.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap),
  );

  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGalleryItems() {
  const allItems = document.querySelectorAll(".gallery-item");

  allItems.forEach((item) => {
    resizeGalleryItem(item);
  });
}

/*========================================================
            WAIT FOR ALL IMAGES TO LOAD
========================================================*/

window.addEventListener("load", () => {
  resizeAllGalleryItems();
});

window.addEventListener("resize", () => {
  resizeAllGalleryItems();
});

/*========================================================
            IMAGE LOAD LISTENER
========================================================*/

document.querySelectorAll(".gallery img").forEach((img) => {
  if (img.complete) {
    resizeAllGalleryItems();
  } else {
    img.addEventListener("load", () => {
      resizeAllGalleryItems();
    });
  }
});
/*========================================================
                SCROLL REVEAL
========================================================*/

const reveals = document.querySelectorAll(
  ".gallery-item,.portrait-image,.portrait-content,.about-image,.about-content,.cta,.section-title",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },

  {
    threshold: 0.15,
  },
);

reveals.forEach((element) => {
  element.classList.add("reveal");

  revealObserver.observe(element);
});

/*========================================================
                LIGHTBOX
========================================================*/

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

const title = document.querySelector(".art-title");

const medium = document.querySelector(".art-medium");

const description = document.querySelector(".art-description");

let currentImage = 0;

/*========================================================
        OPEN IMAGE
========================================================*/

function openLightbox(index) {
  currentImage = index;

  lightbox.classList.add("active");

  updateLightbox();

  document.body.style.overflow = "hidden";
}

/*========================================================
        UPDATE IMAGE
========================================================*/

function updateLightbox() {
  const item = galleryItems[currentImage];

  const img = item.querySelector("img");

  lightboxImage.src = img.src;

  lightboxImage.alt = img.alt;

  title.textContent = item.dataset.title;

  medium.textContent = item.dataset.medium;

  description.textContent = item.dataset.description;
}
/*========================================================
        CLICK IMAGE
========================================================*/

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

/*========================================================
            CLOSE
========================================================*/

function closeLightbox() {
  lightbox.classList.remove("active");

  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/*========================================================
            NEXT
========================================================*/

nextBtn.addEventListener("click", () => {
  currentImage++;

  if (currentImage >= galleryItems.length) {
    currentImage = 0;
  }

  updateLightbox();
});

/*========================================================
            PREVIOUS
========================================================*/

prevBtn.addEventListener("click", () => {
  currentImage--;

  if (currentImage < 0) {
    currentImage = galleryItems.length - 1;
  }

  updateLightbox();
});

/*========================================================
            KEYBOARD
========================================================*/

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    nextBtn.click();
  }

  if (e.key === "ArrowLeft") {
    prevBtn.click();
  }
});
