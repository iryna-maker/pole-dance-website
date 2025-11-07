console.log("script.js se učitao ✅");

/* ========= MOBILE NAV ========= */

const burgerBtn = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");

if (burgerBtn && mainNav) {
  burgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    burgerBtn.classList.toggle("open");
  });
}

/* ========= TESTIMONIALS SLIDER + PAGINATION ========= */

const testiRow = document.getElementById("testiRow");
const testiCards = testiRow ? Array.from(testiRow.querySelectorAll(".testi-card")) : [];
const dots = Array.from(document.querySelectorAll(".testi-pagination .dot"));

if (testiRow && testiCards.length && dots.length) {
  // počinjemo s TREĆOM karticom (index 2)
  let activeIndex = 2;

  // helper – postavi aktivnu karticu + dot
  function setActive(index) {
    activeIndex = index;

    testiCards.forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // klik na dot → scroll na odgovarajuću karticu
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const card = testiCards[index];
      if (!card) return;

      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      setActive(index);
    });
  });

  // scroll/swipe → pronađi karticu najbližu centru
  let scrollTimeout;
  testiRow.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      const rowRect = testiRow.getBoundingClientRect();
      const rowCenter = rowRect.left + rowRect.width / 2;

      let closestIndex = 0;
      let smallestDistance = Infinity;

      testiCards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - rowCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = i;
        }
      });

      setActive(closestIndex);
    }, 80);
  });

  // inicijalno stanje – treća kartica aktivna i centrirana
  setActive(activeIndex);
  const initialCard = testiCards[activeIndex];
  if (initialCard) {
    initialCard.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest",
    });
  }
}

