// Menu
(function () {
    const btn = document.getElementById("menuToggle");
    const menu = document.getElementById("mainMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        menu.hidden = expanded; // show when it was closed
    });

    // close when clicking outside
    document.addEventListener("click", function (e) {
        if (!menu.hidden && !btn.contains(e.target) && !menu.contains(e.target)) {
            btn.setAttribute("aria-expanded", "false");
            menu.hidden = true;
        }
    });
})();

// Simple carousel for .gallery.carousel
(function () {
    const slider = document.querySelector(".gallery.carousel");
    if (!slider) return;
    const track = slider.querySelector(".carouselTrack");
    const slides = Array.from(track.querySelectorAll(".carouselSlide"));
    // arrows were moved outside .gallery; look for them on the slider's parent container
    const container = slider.parentElement || document;
    const prevBtn = container.querySelector(".carouselArrow.prev") || slider.querySelector(".carouselArrow.prev");
    const nextBtn = container.querySelector(".carouselArrow.next") || slider.querySelector(".carouselArrow.next");
    const dotsContainer = slider.querySelector(".carouselDots");
    let current = 0;

    // build dots
    slides.forEach((s, i) => {
        const btn = document.createElement("button");
        btn.setAttribute("aria-label", `Slide ${i + 1}`);
        btn.dataset.index = i;
        if (i === 0) btn.classList.add("active");
        dotsContainer.appendChild(btn);
        btn.addEventListener("click", () => {
            goTo(i);
        });
    });

    const dots = Array.from(dotsContainer.children);

    function update() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function goTo(i) {
        current = (i + slides.length) % slides.length;
        update();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    // keyboard support
    slider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goTo(current - 1);
        if (e.key === "ArrowRight") goTo(current + 1);
    });

    // make focusable
    slider.tabIndex = 0;
})();
